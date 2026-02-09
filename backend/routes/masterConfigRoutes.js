const express = require('express');
const router = express.Router();
const masterConfigController = require('../controllers/masterConfigController');

router.get('/', masterConfigController.getConfig);
router.put('/', masterConfigController.updateConfig);
router.post('/', masterConfigController.updateConfig);
router.put('/sections/:sectionName', masterConfigController.updateSection);

module.exports = router;
