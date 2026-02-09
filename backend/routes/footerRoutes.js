const express = require('express');
const router = express.Router();
const footerController = require('../controllers/footerController');

router.get('/', footerController.getFooters);
router.post('/', footerController.createFooter);
router.get('/:id', footerController.getFooter);
router.put('/:id', footerController.updateFooter);
router.delete('/:id', footerController.deleteFooter);
router.patch('/:id/toggle', footerController.toggleFooterVisibility);

module.exports = router;
