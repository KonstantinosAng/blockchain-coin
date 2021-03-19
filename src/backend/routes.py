from flask import Flask, render_template, request
from blockchain import Blockchain, Transaction, Block, TIME
import json


app = Flask(__name__)

bchain = Blockchain()
block = Block([Transaction("me", "admin", 100)], TIME(), 1)
bchain.addBlock(block)

@app.route("/")
@app.route("/home")
def home():
  bchain.conflicts()
  return str(bchain)


@app.route("/balance", methods=['POST'])
def getBalance():
  person = request.json['data']
  balance = bchain.get_balance(person)
  return balance

@app.route("/transact", methods=['POST'])
def transact():
  sender = request.json['sender']
  receiver = request.json['receiver']
  bchain.addTransaction()
  pass

@app.route("/generate_keys")
def generateKeys():
  return bchain.generate_keys()

if __name__ == "__main__":
  app.run(port=3000, debug=True)
