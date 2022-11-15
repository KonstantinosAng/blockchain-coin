from flask import Flask, request
from flask_cors import CORS
from blockchain import Blockchain
from Crypto.PublicKey import RSA

BASE_PATH = "/craycoinAPI"

app = Flask(__name__)
CORS(app)
bchain = Blockchain()

@app.route("{}".format(BASE_PATH))
@app.route("{}/home".format(BASE_PATH))
def home():
  bchain.conflicts()
  return str(bchain)


@app.route("{}/balance".format(BASE_PATH), methods=['POST'])
def getBalance():
  try:
    person = request.json['data']
    balance = bchain.get_balance(person)
    return balance
  except Exception as e:
    return e

@app.route("{}/transact".format(BASE_PATH), methods=['POST'])
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

@app.route("{}/generate_keys".format(BASE_PATH))
def generateKeys():
  return bchain.generate_keys()

@app.route("{}/pendingTransactions".format(BASE_PATH))
def pending():
  return str(bchain.getPendingTransactions())

@app.route("{}/mining".format(BASE_PATH), methods=['POST'])
def mining():
  _hash = request.json['hash']
  miner = request.json['miner']
  ret = bchain.mineBlock(_hash, miner)
  return str(ret)


if __name__ == "__main__":
  app.run(host="localhost", port=5000, debug=True)
