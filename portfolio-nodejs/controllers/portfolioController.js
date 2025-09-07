const portfolioService = require('../services/portfolioService');

const getPortfolios = async (req, res) => {
    try {
        const { page, limit, search } = req.query;
        const result = await portfolioService.getAllPortfolios({ page, limit, search });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getPortfolio = async (req, res) => {
    try {
        const portfolio = await portfolioService.getPortfolioById(req.params.id);
        if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });
        res.json(portfolio);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createPortfolio = async (req, res) => {
    try {
        const newPortfolio = await portfolioService.createPortfolio(req.body);
        res.status(201).json(newPortfolio);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updatePortfolio = async (req, res) => {
    try {
        const updatedPortfolio = await portfolioService.updatePortfolio(req.params.id, req.body);
        if (!updatedPortfolio) return res.status(404).json({ message: 'Portfolio not found' });
        res.json(updatedPortfolio);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deletePortfolio = async (req, res) => {
    try {
        const deletedPortfolio = await portfolioService.deletePortfolio(req.params.id);
        if (!deletedPortfolio) return res.status(404).json({ message: 'Portfolio not found' });
        res.json({ message: 'Portfolio deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getPortfolios,
    getPortfolio,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
};
