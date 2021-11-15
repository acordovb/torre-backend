const express = require('express')
const torreControllers = require('../controllers/torre.controller')

const router = express.Router()

router.get('/bios/:username', function (req, res) { torreControllers.genomeInfo(req, res) })

router.get('/opportunities/:id', function (req, res) { torreControllers.jobInfo(req, res) })

router.post('/opportunities/', function (req, res) { torreControllers.opportunitiesInfo(req, res) })

router.post('/people/', function (req, res) { torreControllers.allPeopleInfo(req, res) })

module.exports = router
