import { getPortfolios, createPortfolio } from '../../services/admin/portfolioService';

export const fetchPortfolios = async ({ page = 1, limit = 10, search = '' } = {}) => {
  try {
    const data = await getPortfolios({ page, limit, search });
    return data;
  } catch (error) {
    console.error('Error fetching portfolios:', error);
    throw error;
  }
};

export const createPortfolioHandler = async (portfolioData) => {
  try {
    const data = await createPortfolio(portfolioData);
    return data;
  } catch (error) {
    console.error('Error creating portfolio:', error);
    throw error;
  }
};
