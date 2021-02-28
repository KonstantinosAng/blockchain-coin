from datetime import datetime
import json
import hashlib
from Crypto.PublicKey import RSA


TIME = lambda :datetime.now().strftime("%d/%m/%Y, %H:%M:%S")

class Blockchain(object):
  
  def __init__(self):
    self.chain = self.init__chain()
    self.pendingTransactions = []
    self.difficulty = 2
    self.minerRewards = 5
    self.blockSize = 10
    self.nodes = set()

  def __str__(self):
    return "\n"+"\n\n".join(str(block) for block in self.chain if self.chain != [])

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
    private_key = key.export_key()
    with open('private.pem', 'wb') as private_key_file:
      private_key_file.write(private_key)
    
    public_key = key.publickey().export_key()
    with open('public.pem', 'wb') as public_key_file:
      public_key_file.write(public_key)

class Block(object):
  
  def __init__(self, transactions, time, index):
    self.transactions = transactions
    self.previous_hash = ''
    self.time = time
    self.index = index
    self.hash = self.calculate_hash()

  def __str__(self):
    return f"Block {self.index}:\n hash -> {self.hash}\n prevHash -> {self.previous_hash}\n Time -> {self.time}\n"

  def calculate_hash(self):
    hashTransactions = ""
    for transaction in self.transactions:
      hashTransactions += transaction.hash
    
    hashString = str(self.time) + hashTransactions + self.previous_hash + str(self.index)
    hashEncoded = json.dumps(hashString, sort_keys=True).encode()
    return hashlib.sha256(hashEncoded).hexdigest()

class Transaction(object):
  
  def __init__(self, sender, receiver, ammount):
    self.sender = sender
    self.receiver = receiver
    self.ammount = ammount
    self.time = TIME()
    self.hash = self.calculate_hash()

  def calculate_hash(self):
    hashString = self.sender + self.receiver + str(self.ammount) + str(self.time)
    hashEncoded = json.dumps(hashString, sort_keys=True).encode()
    return hashlib.sha256(hashEncoded).hexdigest()


if __name__ == "__main__":
  bchain = Blockchain()
  transactions = []
  block = Block(transactions, TIME(), 1)
  bchain.addBlock(block)
  block = Block(transactions, TIME(), 2)
  bchain.addBlock(block)
  block = Block(transactions, TIME(), 3)
  bchain.addBlock(block)
  print(bchain)
  bchain.generate_keys()