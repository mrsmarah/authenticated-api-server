'use strict';
const express = require('express');
const router = express.Router();
const users = require('../src/auth/models/users-model.js');
const getModel = require('../middleware/params.js');
const acl = require('../src/auth/middleware/acl.js');
const bearer = require('../src/auth/middleware/bearer.js');
const basic = require('../src/auth/middleware/basic.js');

router.post('/signup', signupHandler);
router.post('/signin', basic ,signinHandler);
router.get('/users', basic ,basicHandler);

router.param('model', getModel);

router.post('/api/v1/:model',bearer,acl('create'), postHandler);
router.get('/api/v1/:model',bearer,acl('read'), getAllHandler);
router.get('/api/v1/:model/:_id',bearer,acl('read'), getOneHandler);
router.put('/api/v1/:model/:_id',bearer,acl('update'), updateHandler);
router.delete('/api/v1/:model/:_id',bearer,acl('delete'), deleteHandler);



/**
 * Main router module which will get the models from the params to get,post,put,delete .
 * @module router
 */

/**
 * Get all function
 * @param   req
 * @param   res
 * @param   next
 * @function getAllhandler
 */

/** 
 *  * Get one by ID function
 * @param   req
 * @param   res
 * @param   next
 * @function getOneHandler
 */

/** 
 *  * Post function
 * @param   req
 * @param   res
 * @param   next
 * @function postHandler
 */

/** 
 *  * Update by ID function
 * @param   req
 * @param   res
 * @param   next
 * @function updateHandler
 */

/** 
 *  * Delete by ID function
 * @param   req
 * @param   res
 * @param   next
 * @function deleteHandler
 */




function postHandler(req, res, next) {
  req.model
    .create(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err.message));
}
  
function getAllHandler(req,res,next){
  req.model
    .read()
    .then((data) => {
      const count = data.length;
      const results = data;
      const allData = { count,results};
      res.json(allData);
    })
    .catch(next);
      
}
  
function getOneHandler(req,res,next){
  req.model
    .read(req.params._id)
    .then((data) =>res.json(data))
    .catch(next);
}
  
function updateHandler(req,res,next){
  req.model
    .update(req.params._id , req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(next);    
}
  
function deleteHandler(req,res,next){
  req.model
    .delete(req.params._id)
    .then((data) => res.send(`_id: ${req.params._id} deleted!`))
    .catch(next);  
}


function signupHandler(req, res) {
  users
    .save(req.body)
    .then((userData) =>{
      // console.log('USER DATA:' , userData);
      const token = users.generateToken(userData);
      return token;
    })
    .then((token) =>{
      // console.log('TOKEN:' , token);
      res.json({ token });
    })
    .catch((err) =>res.status(403).send('ERRORRRRR'));
}
  

function signinHandler(req,res){
  res.json({ token: req.token , user: req.user });
}


async function basicHandler(req, res) {
  return await users.get().then((result)=>{
    res.json(result);
  });
}

module.exports = router;

  
