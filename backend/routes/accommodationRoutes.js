const express = require('express');
const router = express.Router();
const accommodationController = require('../controllers/accommodationController');

router.get('/', accommodationController.getAccommodations);
router.post('/', accommodationController.createAccommodation);
router.get('/:id', accommodationController.getAccommodation);
router.put('/:id', accommodationController.updateAccommodation);
router.delete('/:id', accommodationController.deleteAccommodation);
router.patch('/:id/toggle', accommodationController.toggleAccommodationVisibility);

module.exports = router;
