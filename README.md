# Cray coin

A full fledged blockchain coin named cray with [Flask](https://flask.palletsprojects.com/en/1.1.x/) for backend, [ReactJS](https://reactjs.org/) for frontend, [MongoDB](https://www.mongodb.com/) for storing and [Firebase](https://firebase.google.com) for authentication and Log in functionality.

<div align="center">
  <h1><a href="https://craycoin.constantine.dev"> DEMO </a></h1>
</div>

<!-- Backend deployed to -> https://craycoin.herokuapp.com/ -->

Backend deployed to -> https://craycoin.onrender.com/

## Requirements

Inside the frontend repo there is a [.env.example file](./src/frontend/.env.example). Rename it to .env and fill the values with your own api keys.

For the flask app replace with the URL the server runs on:

```javascript
REACT_APP_SERVER_URL=http://localhost:5000/craycoinAPI
```

For firebase you will need a firebase config file from your webapp with the following values.

```javascript
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_MEASUREMENT_ID=
```

Inside the backend repo there is a [.env.example file](./src/backend/.env.example). Rename it to .env and fill the values with your own keys.

```bash
MONGODB_URI=
```

## Installation

Start with a fresh installation of python, preferably using Anaconda, and then inside the blockchain-folder run the following line to install all python required dependencies.

```
pip install -r requirements.txt
```

You will also need a firebase account to enable the authentication. Create a new web project with the firebase console, enable the Google auth log in from the options and create a .env file in the [frontend folder](src/frontend) as the [.env.example file](src/frontend/.env.example) and put the firebase config file values in the REACT_APP variables.

## Usage

Inside the [backend folder](src/backend) run the following code to start the backend server where all the blockchain and the transactions are happening.

```
flask run -h localhost -p 9999
```

Assuming you have [npm](https://www.npmjs.com/) installed, inside the [frontend folder](src/frontend) run the following code to start the frontend page.

```
npm start
```

Finally for the storing you will need [MongoDB](https://www.mongodb.com/) installed. For windows open a terminal and type the following code to start the mongodb.

```
mongod
```

If it is installed you will see a big output. More info in [MongoDB/Installation](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/).

## Deploy backend to heroku

From the root of the repo

```bash
heroku create -a craycoin
heroku git:remote -a craycoin
git subtree push --prefix src/backend heroku master
```

Set up environmental configs

```bash
heroku config:set MONGODB_URI=joesmith
heroku config:set PORT=9999
```

## ATLAS MongoDB

See instructions [`here`](https://gist.github.com/ross-u/b59ea6a1febefb80bffc15ecf31ea827) on how to setup a free atlas mongodb.

## Example

The frontend page provides a UI for making transactions, monitoring the public ladger, mine blocks and watch your profile and amount.

<p align="center">
  <img src="img/img1.png" /> 
  <img src="img/img2.png" /> 
  <img src="img/img3.png" /> 
</p>
