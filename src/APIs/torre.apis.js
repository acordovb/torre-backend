const axios = require('axios')

function getInfoByUsername (username) {
  return new Promise((resolve, reject) => {
    if (typeof (username) !== 'undefined') {
      axios.get(process.env.TORRE_API_BIOS + username)
        .then((response) => {
          const responseAPI = {
            status: response.status,
            data: response.data
          }
          resolve({
            status: responseAPI.status,
            data: responseAPI.data
          })
        })
        .catch((error) => {
          if (error.response) {
            const responseAPI = {
              status: error.response.status,
              error: error.response.data.error,
              message: error.response.data.message
            }
            resolve(responseAPI)
          } else if (error.request) {
            reject(error.request)
          } else {
            reject(error.message)
          }
        })
    } else {
      reject(new Error('Parameter not defined or empty'))
    }
  })
}

function getInfoOpportunity (opportunityId) {
  return new Promise((resolve, reject) => {
    if (typeof (opportunityId) !== 'undefined') {
      axios.get(process.env.TORRE_API_OPPORTUNITY_ID + opportunityId)
        .then((response) => {
          const responseAPI = {
            status: response.status,
            data: response.data
          }
          resolve({
            status: responseAPI.status,
            data: responseAPI.data
          })
        })
        .catch((error) => {
          if (error.response) {
            const responseAPI = {
              status: error.response.status,
              error: error.response.data.error,
              message: error.response.data.message
            }
            resolve(responseAPI)
          } else if (error.request) {
            reject(error.request)
          } else {
            reject(error.message)
          }
        })
    } else {
      reject(new Error('Parameter not defined or empty'))
    }
  })
}

function postSearchJobsAndGigs (opts) {
  return new Promise((resolve, reject) => {
    const {next, previous, size, offset } = opts
    const data = { }
    let url = process.env.TORRE_API_ALL_OPPORTUNITIES

    if (next) {
      url = process.env.TORRE_API_ALL_OPPORTUNITIES + "after=" + next
    }else if(previous){
      url = process.env.TORRE_API_ALL_OPPORTUNITIES + "before=" + previous
    }else {
      url = process.env.TORRE_API_ALL_OPPORTUNITIES
    }
    
    axios
      .post(url, { todo: data })
      .then(res => {
        const responseData = {
          status: res.status,
          data: res.data
        }
        resolve(responseData)
      })
      .catch(error => {
        console.error(error)
        if (error.response) {
          const responseData = {
            status: error.response.status,
            error: error.response.data.error,
            message: error.response.data.message
          }
          resolve(responseData)
        } else if (error.request) {
          reject(error.request)
        } else {
          reject(error.message)
        }
      })
  })
}

function postSearchPeople ( ) {
  return new Promise((resolve, reject) => {
    const data = { }
    const url = process.env.TORRE_API_PEOPLE

    axios
      .post(url, { todo: data })
      .then(res => {
        const responseData = {
          status: res.status,
          data: res.data
        }
        resolve(responseData)
      })
      .catch(error => {
        console.error(error)
        if (error.response) {
          const responseData = {
            status: error.response.status,
            error: error.response.data.error,
            message: error.response.data.message
          }
          resolve(responseData)
        } else if (error.request) {
          reject(error.request)
        } else {
          reject(error.message)
        }
      })
  })
}

module.exports = {
  getInfoByUsername,
  getInfoOpportunity,
  postSearchJobsAndGigs,
  postSearchPeople
}
