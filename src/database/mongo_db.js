const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const secret = process.env.SECRET;

let myDB;

let db_options = {
  db: {
    raw: false
  },
  server: {
    poolSize: 5
  }
};

function connect() {
  const filePath = './vault.json';
  const json = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const url = json.MongoDB.mongoURL;
  const dbName = json.MongoDB.dbname;

  if (myDB === undefined) {
    MongoClient.connect(url, db_options, (err, client) => {
      if (err) {
        console.log('Error while connecting to database' + err);
      }
      const db = client.db(dbName);
      myDB = db;
      console.log('Database connected successfully');
    });
  }
};

let insertDocuments = function (collectionName, document) {
  return new Promise((resolve, reject) => {
    const collection = myDB.collection(collectionName);
    collection.insertOne(document)
      .then(doc => resolve(doc))
      .catch(err => reject(err));
  });
};

let findDocuments = function (collectionName, payload) {
  return new Promise((resolve, reject) => {
    const collection = myDB.collection(collectionName);
    collection.find(payload).toArray()
      .then(doc => resolve(doc))
      .catch(err => reject(err));
  });
};

let authentication = function (collectionName, payload) {
  return new Promise((resolve, reject) => {
    const collection = myDB.collection(collectionName);
    const error = {
      message: 'invalid credentials'
    };
    collection.findOne({ mobile: payload.mobile })
      .then(doc => {
        if (!doc) reject(error);
        bcrypt.compare(payload.password, doc.password)
          .then(isMatch => {
            if (!isMatch) reject(error);
            jwt.sign({ data: doc.cpf }, secret, { expiresIn: 30 * 60 }, (err, token) => {
              if (!token) {
                const token_error = { message: 'unable to generate token' };
                reject(token_error);
              }
              if (err) reject(err);
              resolve(token);
            });
          });
      });
  });
};

let updateDocument = function (collectionName, filterConditon, updatePayload) {
  return new Promise((resolve, reject) => {
    const collection = myDB.collection(collectionName);
    collection.updateOne(filterConditon, { $set: updatePayload })
      .then(doc => resolve(doc))
      .catch(err => reject(err));
  });
};

let deleteDocument = function (collectionName, filterConditon) {
  return new Promise((resolve, reject) => {
    const collection = myDB.collection(collectionName);
    collection.deleteOne(filterConditon)
      .then(doc => resolve(doc))
      .catch(err => reject(err));
  });
};

let findDocumentsById = function (collectionName, filterConditon) {
  return new Promise((resolve, reject) => {
    const collection = myDB.collection(collectionName);
    collection.findOne(filterConditon)
      .then(doc => resolve(doc))
      .catch(err => reject(err));
  });
};

exports.connect = connect;
exports.insertDocuments = insertDocuments;
exports.findDocuments = findDocuments;
exports.findDocumentsById = findDocumentsById;
exports.updateDocument = updateDocument;
exports.deleteDocument = deleteDocument;
exports.authentication = authentication;
