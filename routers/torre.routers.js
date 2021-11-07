const express = require('express');
const { HttpStatusCode } = require('../helpers/statuscodes.helper');
const torreController = require('../controllers/torre.controller')

const router = express.Router();

router.get('/bios/:username', function(req, res){
  try {
      const username = req.params.username || undefined;
        if (typeof (username) !== 'undefined') {
          torreController.getInfoByUsername(username)
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
        torreController.getInfoOpportunity(opporId)
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

// router.post('/opportunities', function(req, res){
  
// })

// router.post('/people/', function(req, res){
//   let opts = {
//     size: 5,
//     offset: 0
//   }
  
//   try {
//       torreController.getAllPeople(opts)
//         .then((result) => {
//             if ((typeof (result) !== 'undefined' && result.length > 0) || (typeof (result) === 'object')) {
//               if (result.status === HttpStatusCode.OK){
//                 res.status(HttpStatusCode.OK).send(result.data);
//               }else{
//                 res.status(result.status).send(result.data);
//               }
//             } else {
//               response.error(req, res);
//             }
//           })
//           .catch((e) => {
//             console.error(error.name + ': ' + e.message)
//           });   
//   } catch (error) {
//       console.error(error.name + ': ' + e.message)
//   }
// })

module.exports = router;