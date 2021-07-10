# Cray coin

A full fledged blockchain coin named cray with [Flask](https://flask.palletsprojects.com/en/1.1.x/) for backend, [ReactJS](https://reactjs.org/) for frontend, [MongoDB](https://www.mongodb.com/) for storing and [Firebase](https://firebase.google.com) for authentication and Log in functionality.

<p align="center">
  <h1>↓</h1>
  <a href="http://kangelopoulos.ddns.net/craycoin"> See demo here </a>
</p>

## Requirements

Inside the frontend repo there is a [.env.example file](./src/frontend/.env.example). Rename it to .env and fill the values with your own api keys.

For the flask app replace with the URL the server runs on:

```javascript
REACT_APP_SERVER_URL=http://localhost:5000
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

## Example

The frontend page provides a UI for making transactions, monitoring the public ladger, mine blocks and watch your profile and amount.

<p align="center">
  <img src="img/img1.png" /> 
  <img src="img/img2.png" /> 
  <img src="img/img3.png" /> 
</p>
