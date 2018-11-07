const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/user.controller');


// a simple test url to check that all of our files are communicating correctly.
//test
router.get('/test', product_controller.test);
//add
router.post('/create', product_controller.user_create);
//id status
router.get('/:id', product_controller.product_details);
//id:update
router.put('/:id/update', product_controller.product_update);
//id:delete
router.delete('/:id/delete', product_controller.product_delete);
module.exports = router;


