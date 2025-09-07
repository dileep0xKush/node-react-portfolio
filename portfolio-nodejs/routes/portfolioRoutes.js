const express = require('express');
const router = express.Router();

const {
    getPortfolios,
    createPortfolio,
    getPortfolio,
    updatePortfolio,
    deletePortfolio,
} = require('../controllers/portfolioController');

router.get('/', getPortfolios);
router.post('/', createPortfolio);
router.get('/:id', getPortfolio);
router.put('/:id', updatePortfolio);
router.delete('/:id', deletePortfolio);

module.exports = router;
