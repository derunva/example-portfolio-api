var express = require('express');
var router = express.Router();
const controller = require('../controllers/works')
// routes for CRUD api
//C - create
router.post('/', controller.create);
// R - read
/* GET all. */
router.get('/', controller.list);
// R - read
// GET one
router.get('/:id', controller.show);
// U - update
router.put('/:id', controller.update);
// D - delete
router.delete('/:id', controller.delete);

module.exports = router;
