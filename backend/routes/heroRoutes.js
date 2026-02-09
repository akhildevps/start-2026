const express = require('express');
const router = express.Router();
const heroController = require('../controllers/heroController');

router.get('/', heroController.getHeroes);
router.post('/', heroController.createHero);
router.get('/:id', heroController.getHero);
router.put('/:id', heroController.updateHero);
router.delete('/:id', heroController.deleteHero);
router.patch('/:id/toggle', heroController.toggleHeroVisibility);

module.exports = router;
