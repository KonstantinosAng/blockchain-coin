from datetime import datetime
import json
import hashlib
from Crypto.PublicKey import RSA
from Crypto.Signature import PKCS1_v1_5 as pkcs1_15
import requests
from urllib.parse import urlparse


TIME = lambda :datetime.now().strftime("%d/%m/%Y, %H:%M:%S")

class Blockchain(object):
  
  def __init__(self):
    self.chain = self.init__chain()
    self.pendingTransactions = []
    self.difficulty = 3
    self.minerRewards = 5
    self.blockSize = 20
    self.nodes = set()

  def __str__(self):
    return "#".join(str(block) for block in reversed(self.chain) if self.chain != [])[0:]

  def init__chain(self):
    first_block = Block([Transaction('admin', 'random_person', 10)], TIME(), 0)
    first_block.previous_hash = 'None'
    return [first_block]

  def getLastBlock(self):
    return self.chain[-1]

  def addBlock(self, block):
    if len(self.chain) > 0:
      block.previous_hash = self.getLastBlock().hash
    else:
      block.previous_hash = "none"
    self.chain.append(block)
  
  def generate_keys(self):
    key = RSA.generate(2048)
    # private_key = key.export_key()
    # with open('private.pem', 'wb') as private_key_file:
    #   private_key_file.write(private_key)
    
    # public_key = key.publickey().export_key()
    # with open('public.pem', 'wb') as public_key_file:
    #   public_key_file.write(public_key)
    
    return f"{key.publickey().export_key().decode('ASCII')}${key.export_key().decode('ASCII')}"
  
  def get_balance(self, person):
    balance = 0
    for i in range(1, len(self.chain)):
      block = self.chain[i]
      try:
        for j in range(len(block.transactions)):
          transaction = block.transactions[j]
          if transaction.sender == person:
            balance -= transaction.ammount
          if transaction.receiver == person:
            balance += transaction.ammount
      except Exception as e:
        return None
    
    return f'{person.title()} balance -> {balance}'

  def isValidChain(self):
    for i in range(1, len(self.chain)):
      prev_block = self.chain[i-1]
      next_block = self.chain[i]
      
      if not next_block.hasValidTransactions() or \
        next_block.hash != next_block.calculate_hash() or \
        next_block.previous_hash != prev_block.hash:
        return False
    
    return True

  def pendingTransaction(self, miner):
    nPending = len(self.pendingTransactions)
    if nPending <= 1: return False
    else:
      for i in range(0, nPending, self.blockSize):
        end = i + self.blockSize
        if i >= nPending: end = nPending
        blockSlice = self.pendingTransactions[i:end]
        newBlock = Block(blockSlice, TIME(), len(self.chain))
        newBlock.previous_hash = self.getLastBlock().hash
        newBlock.mine(self.difficulty)
        self.chain.append(newBlock)
        self.pendingTransactions = [Transaction("Miner Rewards", miner, self.minerRewards)]

  def addTransaction(self, sender, receiver, ammount, keyString, senderKey):
    keyByte = keyString.encode("ASCII")
    senderKeyByte = senderKey.encode("ASCII")

    key = RSA.import_key(keyByte)
    senderKey = RSA.import_key(senderKeyByte)

    if not sender or not receiver or not ammount:
      return False
    
    transaction = Transaction(sender, receiver, ammount)
    transaction.signTransaction(key, senderKey)

    if not transaction.isValidTransaction():
      return False
    
    self.pendingTransactions.append(transaction)
    return len(self.chain) + 1
  
  def register_node(self, address):
    parsedUrl = urlparse(address)
    self.nodes.add(parsedUrl.netloc)
  
  def conflicts(self):
    nodes = self.nodes
    newChain = None

    maxLength = len(self.chain)

    for node in nodes:
      response = requests.get(f"http://{node}/chain")

      if response.status_code == 200:
        length = response.json()['length']
        chain = response.json()['chain']

        if length > maxLength and self.isValidChain():
          maxLength = length
          newChain = chain
    
    if newChain: 
      self.chain = newChain
      return True
    
    return False

class Block(object):
  
  def __init__(self, transactions, time, index):
    self.transactions = transactions
    self.previous_hash = ''
    self.time = time
    self.index = index
    self.nonse = 0;
    self.hash = self.calculate_hash()

  def __str__(self):
    return f"{self.index}%{self.hash}%{self.previous_hash}%{self.time}"

  def calculate_hash(self):
    hashTransactions = ""
    for transaction in self.transactions:
      hashTransactions += transaction.hash
    
    hashString = str(self.time) + hashTransactions + self.previous_hash + str(self.nonse)
    hashEncoded = json.dumps(hashString, sort_keys=True).encode()
    return hashlib.sha256(hashEncoded).hexdigest()
  
  def hasValidTransactions(self):
    for transaction in self.transactions:
      if not transaction.isValidTransaction():
        return False
      return True

  def mine(self, difficulty):
    hashMatch = ''.join([str(i) for i in range(difficulty)])
    
    while self.hash[:difficulty] != hashMatch:
      self.nonse += 1
      self.hash = self.calculate_hash()
    return True


class Transaction(object):
  
  def __init__(self, sender, receiver, ammount):
    self.sender = sender
    self.receiver = receiver
    self.ammount = ammount
    self.time = TIME()
    self.hash = self.calculate_hash()
    self.signature = None

  def calculate_hash(self):
    hashString = self.sender + self.receiver + str(self.ammount) + str(self.time)
    hashEncoded = json.dumps(hashString, sort_keys=True).encode()
    return hashlib.sha256(hashEncoded).hexdigest()

  def isValidTransaction(self):
    if self.hash != self.calculate_hash() or self.sender == self.receiver or \
       not self.sender or len(self.signature) == 0:
          return False
    if self.sender == "Miner rewards": return True
    return True
  
  def signTransaction(self, key, senderKey):
    if (self.hash != self.calculate_hash()):
      return False
    if str(key.publickey().export_key()) != str(senderKey.publickey().export_key()):
      return False
    pkcs1_15.new(key)
    self.signature = "made"
    return True


if __name__ == "__main__":
  bchain = Blockchain()
  block = Block([Transaction("me", "admin", 100)], TIME(), 1)
  bchain.addBlock(block)
  block = Block([Transaction("me", "admin", 1000)], TIME(), 2)
  bchain.addBlock(block)
  block = Block([Transaction("admin", "me", 100)], TIME(), 3)
  bchain.addBlock(block)
  print(bchain)
  print(bchain.get_balance("admin"))
  print(bchain.chain[0].mine(4))
