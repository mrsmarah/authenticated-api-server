'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET || 'mysecret';
const userschema = require('./users-schema.js');
const Model = require('./mongo.js');
const capabilities ={
  user : ['read'],
  writer : ['read','create'],
  editor : ['read','create','update'],
  admin : ['read','create','update','delete'],
};
  
class Users extends Model {
  constructor() {
    super(userschema);
  }
  
  async save(record) {
    console.log('record befor hash',record);

    let myUser = await this.get({ username: record.username } );

    if(myUser.length === 0){
      record.password = await bcrypt.hash(record.password, 5);
      console.log('record after hash',record);
      return await this.create(record);
    }
    return Promise.reject(); // ==>.catch
  }

  async authenticateBasic(user,pass) {
    const myUser = await this.get({username : user});
    const valid = await bcrypt.compare(pass, myUser[0].password);
    console.log('PASS',myUser[0].password,pass);
    return valid ? myUser : Promise.reject('wrong password');
  }


  generateToken(user) {
    const token =  jwt.sign({ 
      username: user.username,
      exp: Math.floor(Date.now() / 1000) + (15 * 60),
      algorithm: 'HS256',
      id : user._id,
      role : user.role,
      capabilities : capabilities[user.role],// capabilities[user.role]
    }, SECRET);
    return token;
  }

  // to verify the token that the user used from the client that was generated by jwt
  async authenticateToken(token) {
    try {
      const tokenObject = await jwt.verify(token, SECRET);
      if (tokenObject.id) {
        console.log('User ID exists:', tokenObject);
        return Promise.resolve(tokenObject);
      } else {
        console.log('User id not found');
        return Promise.reject('User is not found!');
      }
    } catch (e) {
      return Promise.reject(e.message);
    }
  }


  can(permision){
    if(permision){
      return Promise.resolve(true);
    }
    else{
      return Promise.resolve(false);
    }
  }

  
}

module.exports = new Users();