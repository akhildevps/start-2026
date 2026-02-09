const express = require('express');
const router = express.Router();
const amenityController = require('../controllers/amenityController');

router.get('/', amenityController.getAmenities);
router.post('/', amenityController.createAmenity);
router.get('/:id', amenityController.getAmenity);
router.put('/:id', amenityController.updateAmenity);
router.delete('/:id', amenityController.deleteAmenity);
router.patch('/:id/toggle', amenityController.toggleAmenityVisibility);

module.exports = router;
