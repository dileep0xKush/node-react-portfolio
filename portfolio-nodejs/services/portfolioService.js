const Portfolio = require('../models/Portfolio');

exports.getAllPortfolios = async ({ page = 1, limit = 10, search = '' }) => {
    const pageNumber = Math.max(1, parseInt(page, 10) || 1);
    const pageSize = Math.max(1, parseInt(limit, 10) || 10);

    const query = {};

    if (search.trim()) {
        query.name = { $regex: search.trim(), $options: 'i' };
    }

    const skip = (pageNumber - 1) * pageSize;
    const total = await Portfolio.countDocuments(query);

    const portfolios = await Portfolio.find(query)
        .skip(skip)
        .limit(pageSize)
        .sort({ created_at: -1 });

    return {
        portfolios,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize),
        totalResults: total,
    };
};

exports.getPortfolioById = async (id) => {
    return await Portfolio.findById(id);
};

exports.createPortfolio = async (portfolioData) => {
    const portfolio = new Portfolio(portfolioData);
    return await portfolio.save();
};

exports.updatePortfolio = async (id, portfolioData) => {
    return await Portfolio.findByIdAndUpdate(id, portfolioData, { new: true });
};

exports.deletePortfolio = async (id) => {
    return await Portfolio.findByIdAndDelete(id);
};
