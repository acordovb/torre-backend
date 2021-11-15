const torreAPI = require('../APIs/torre.apis')
const { HttpStatusCode } = require('../helpers/statuscodes.helper')
const labels = require('../helpers/errorMsgs.helper')
const response = require('../helpers/response.helper')

function genomeInfo (req, res) {
  try {
    const username = req.params.username || undefined
    if (typeof (username) !== 'undefined') {
      torreAPI.getInfoByUsername(username)
        .then((result) => {
          if ((typeof (result) !== 'undefined' && result.length > 0) || (typeof (result) === 'object')) {
            if (result.status === HttpStatusCode.OK) {
              res.status(HttpStatusCode.OK).send(result.data)
            } else {
              res.status(result.status).send(result.data)
            }
          } else {
            response.error(req, res)
          }
        })
        .catch((e) => {
          console.error(e.name + ': ' + e.message)
        })
    } else {
      throw new Error('¡Invalid Username!')
    }
  } catch (error) {
    console.error(error.name + ': ' + error.message)
  }
}

function jobInfo (req, res) {
  try {
    const opporId = req.params.id || undefined
    if (typeof (opporId) !== 'undefined') {
      torreAPI.getInfoOpportunity(opporId)
        .then((result) => {
          if ((typeof (result) !== 'undefined' && result.length > 0) || (typeof (result) === 'object')) {
            if (result.status === HttpStatusCode.OK) {
              res.status(HttpStatusCode.OK).send(result.data)
            } else {
              res.status(result.status).send(result.data)
            }
          } else {
            response.error(req, res)
          }
        })
        .catch((e) => {
          console.error(e.name + ': ' + e.message)
        })
    } else {
      throw new Error('¡Invalid opportinity ID!')
    }
  } catch (error) {
    console.error(error.name + ': ' + error.message)
  }
}

function opportunitiesInfo (req, res) {
  try {
    console.log(req.query)
    const opts = {
      next: req.query.next || "",
      previous: req.query.previous || "",
      size: process.env.DEFAULT_SIZE,
      offset: process.env.DEFAULT_OFFSET
    }
    torreAPI.postSearchJobsAndGigs(opts)
      .then((result) => {
        if ((typeof (result) !== 'undefined' && result.length > 0) || (typeof (result) === 'object')) {
          if (result.status === HttpStatusCode.OK) {
            res.status(HttpStatusCode.OK).send(result.data)
          } else {
            res.status(result.status).send(result.data)
          }
        } else {
          response.error(req, res, labels.LABEL_EMPTY_DATA, HttpStatusCode.UNAUTHORIZED)
        }
      })
      .catch((error) => {
        response.error(req, res, labels.LABEL_ERROR_SERVER, HttpStatusCode.INTERNAL_SERVER_ERROR, error)
      })
  } catch (error) {
    response.error(req, res, labels.LABEL_ERROR_SERVER, HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error!!')
  }
}

function allPeopleInfo (req, res) {
  try {
    torreAPI.postSearchPeople( )
      .then((result) => {
        if ((typeof (result) !== 'undefined' && result.length > 0) || (typeof (result) === 'object')) {
          if (result.status === HttpStatusCode.OK) {
            res.status(HttpStatusCode.OK).send(result.data)
          } else {
            res.status(result.status).send(result.data)
          }
        } else {
          response.error(req, res, labels.LABEL_EMPTY_DATA, HttpStatusCode.UNAUTHORIZED)
        }
      })
      .catch((error) => {
        response.error(req, res, labels.LABEL_ERROR_SERVER, HttpStatusCode.INTERNAL_SERVER_ERROR, error)
      })
  } catch (error) {
    response.error(req, res, labels.LABEL_ERROR_SERVER, HttpStatusCode.INTERNAL_SERVER_ERROR, 'Error!!')
  }
}

module.exports = {
  genomeInfo,
  jobInfo,
  opportunitiesInfo,
  allPeopleInfo
}
