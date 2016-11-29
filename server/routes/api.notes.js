const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/api.notes')

// ROUTING
router.get('/notes', controller.getDatas)
router.post('/notes', controller.postData)
router.get('/notes/:id', controller.getData)
router.delete('/notes/:id', controller.deleteData)
router.put('/notes/:id', controller.updateData)

module.exports = router
