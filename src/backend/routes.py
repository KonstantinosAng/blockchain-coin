from flask import Flask, render_template
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


if __name__ == "__main__":
  app.run(port=3000, debug=True)
