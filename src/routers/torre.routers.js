const express = require('express');
const { HttpStatusCode } = require('../helpers/statuscodes.helper');
const torreAPI = require('../APIs/torre.apis')
const labels = require('../helpers/errorMsgs.helper');
const response = require('../helpers/response.helper');
const dotenv = require('dotenv');

const router = express.Router();

router.get('/bios/:username', function(req, res){
  try {
      const username = req.params.username || undefined;
        if (typeof (username) !== 'undefined') {
          torreAPI.getInfoByUsername(username)
            .then((result) => {
                if ((typeof (result) !== 'undefined' && result.length > 0) || (typeof (result) === 'object')) {
                  if (result.status === HttpStatusCode.OK){
                    res.status(HttpStatusCode.OK).send(result.data);
                  }else{
                    res.status(result.status).send(result.data);
                  }
                } else {
                  response.error(req, res);
                }
              })
              .catch((e) => {
                console.error(error.name + ': ' + e.message)
              });
        }
        else{
            throw new Error('¡Invalid Username!')
        }   
    } catch (error) {
        console.error(error.name + ': ' + e.message)
    }
});

router.get('/opportunities/:id', function(req, res){
  try {
    const opporId = req.params.id || undefined;
      if (typeof (opporId) !== 'undefined') {
        torreAPI.getInfoOpportunity(opporId)
          .then((result) => {
              if ((typeof (result) !== 'undefined' && result.length > 0) || (typeof (result) === 'object')) {
                if (result.status === HttpStatusCode.OK){
                  res.status(HttpStatusCode.OK).send(result.data);
                }else{
                  res.status(result.status).send(result.data);
                }
              } else {
                response.error(req, res);
              }
            })
            .catch((e) => {
              console.error(error.name + ': ' + e.message)
            });
      }
      else{
          throw new Error('¡Invalid opportinity ID!')
      }   
  } catch (error) {
      console.error(error.name + ': ' + e.message)
  }
})

router.post('/opportunities/', function (req, res) {
  try {
    let opts = {
      size: process.env.DEFAULT_SIZE,
      offset: process.env.DEFAULT_OFFSET
    }
    torreAPI.postSearchJobsAndGigs(opts)
      .then((result) => {
        if ((typeof (result) !== 'undefined' && result.length > 0) || (typeof (result) === 'object')) {
          if (result.status === HttpStatusCode.OK){
            res.status(HttpStatusCode.OK).send(result.data);
          }else{
            res.status(result.status).send(result.data);
          }
        } else {
          response.error(req, res, labels.LABEL_EMPTY_DATA, HttpStatusCode.UNAUTHORIZED);
        }
      })
      .catch((error) => {
        response.error(req, res, labels.LABEL_ERROR_SERVER, HttpStatusCode.INTERNAL_SERVER_ERROR, error);
      });
  } catch (error) {
    response.error(req, res, labels.LABEL_ERROR_SERVER, HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error!!');
  }
  
});


router.post('/people/', function (req, res) {
  try {
    let opts = {
      size: process.env.DEFAULT_SIZE,
      offset: process.env.DEFAULT_OFFSET
    }
    torreAPI.postSearchPeople(opts)
      .then((result) => {
        if ((typeof (result) !== 'undefined' && result.length > 0) || (typeof (result) === 'object')) {
          if (result.status === HttpStatusCode.OK){
            res.status(HttpStatusCode.OK).send(result.data);
          }else{
            res.status(result.status).send(result.data);
          }
        } else {
          response.error(req, res, labels.LABEL_EMPTY_DATA, HttpStatusCode.UNAUTHORIZED);
        }
      })
      .catch((error) => {
        response.error(req, res, labels.LABEL_ERROR_SERVER, HttpStatusCode.INTERNAL_SERVER_ERROR, error);
      });
  } catch (error) {
    response.error(req, res, labels.LABEL_ERROR_SERVER, HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error!!');
  }
  
});

module.exports = router;