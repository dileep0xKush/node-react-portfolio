const express = require('express');
const router = express.Router();

const {
    getSkills,
    createSkill,
    getSkill,
    updateSkill,
    deleteSkill
} = require('../controllers/skillController');

router.get('/', getSkills);
router.post('/', createSkill);
router.get('/:id', getSkill);
router.put('/:id', updateSkill);
router.delete('/:id', deleteSkill);


module.exports = router;
