const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controllers/user.controller');


// a simple test url to check that all of our files are communicating correctly.
//test
router.get('/test', user_controller.test);
//add
router.post('/create', user_controller.user_create);
//id status
/*
router.get('/:id', user_controller.user_details);
//id:update
router.put('/:id/update', user_controller.user_update);
//id:delete
router.delete('/:id/delete', user_controller.user_delete);
 */

module.exports = router;


