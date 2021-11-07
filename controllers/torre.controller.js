const { HttpStatusCode } = require('../helpers/statuscodes.helper');
const axios = require('axios');

function getInfoByUsername (username) {
  return new Promise((resolve, reject) => {
    if (typeof (username) != 'undefined') {
        axios.get('https://torre.bio/api/bios/' + username)
            .then((response) => {
            const responseAPI = {
                status: response.status,
                data: response.data
            };
            console.log(`${JSON.stringify(responseAPI.status)}`);
            resolve({
                status: responseAPI.status,
                data: responseAPI.data
                });
            })
            .catch((error) => {
            if (error.response) {
                const responseAPI = {
                status: error.response.status,
                error: error.response.data.error,
                message: error.response.data.message
                };
                resolve(responseAPI);
            } else if (error.request) {
                reject(error.request);
            } else {
                reject(error.message);
            }
            });
    } else {
        reject(new Error('Parameter not defined or empty'));
    }
  });
}

function getInfoOpportunity(opportunityId) {
    return new Promise((resolve, reject) => {
        if (typeof (opportunityId) != 'undefined') {
            axios.get('https://torre.co/api/suite/opportunities/' + opportunityId)
                .then((response) => {
                const responseAPI = {
                    status: response.status,
                    data: response.data
                };
                resolve({
                    status: responseAPI.status,
                    data: responseAPI.data
                    });
                })
                .catch((error) => {
                if (error.response) {
                    const responseAPI = {
                    status: error.response.status,
                    error: error.response.data.error,
                    message: error.response.data.message
                    };
                    resolve(responseAPI);
                } else if (error.request) {
                    reject(error.request);
                } else {
                    reject(error.message);
                }
                });
        } else {
            reject(new Error('Parameter not defined or empty'));
        }
      });
}

module.exports = {
    getInfoByUsername,
    getInfoOpportunity
};