from flask import Flask, render_template, request
from blockchain import Blockchain, Transaction, Block, TIME
import json
from Crypto.PublicKey import RSA
import os
import re


app = Flask(__name__)

bchain = Blockchain()
block = Block([Transaction("me", "admin", 10000)], TIME(), 1)
bchain.addBlock(block)
block = Block([Transaction("admin", "Kwstantinos Angelopoulos", 10000)], TIME(), 2)
bchain.addBlock(block)

@app.route("/")
@app.route("/home")
def home():
  bchain.conflicts()
  return str(bchain)


@app.route("/balance", methods=['POST'])
def getBalance():
  try:
    person = request.json['data']
    balance = bchain.get_balance(person)
    return balance
  except Exception as e:
    return e

@app.route("/transact", methods=['POST'])
def transact():
  try:
    sender = request.json['sender']
    receiver = request.json['receiver']
    amount = request.json['amount']
    key = request.json['key'][1:-1].strip().replace(r"\n", "\n")  
    bchain.addTransaction(sender, receiver, amount, key, key)
    return 'OK'
  except Exception:
    return 'Error 400!'

@app.route("/generate_keys")
def generateKeys():
  return bchain.generate_keys()

@app.route("/pendingTransactions")
def pending():
  return str(bchain.getPendingTransactions())

@app.route("/mining", methods=['POST'])
def mining():
  _hash = request.json['hash']
  miner = request.json['miner']
  ret = bchain.mineBlock(_hash, miner)
  return str(ret)


if __name__ == "__main__":
  app.run(port=3000, debug=True)
