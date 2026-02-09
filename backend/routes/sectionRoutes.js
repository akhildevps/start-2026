const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/sectionController');

router.get('/', sectionController.getSections);
router.get('/name/:name', sectionController.getSectionByName);

// Section items (e.g., carousel slides)
router.post('/name/:name/items', sectionController.addSectionItem);
router.put('/name/:name/items/:itemId', sectionController.updateSectionItem);
router.delete('/name/:name/items/:itemId', sectionController.deleteSectionItem);

router.get('/:id', sectionController.getSection);
router.post('/', sectionController.setSectionVisibility);
router.put('/:id', sectionController.setSectionVisibility);

module.exports = router;
