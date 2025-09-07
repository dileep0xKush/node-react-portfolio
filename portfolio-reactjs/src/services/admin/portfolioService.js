import { axiosInstance } from '../../utils/api';

export const getPortfolios = async ({ page = 1, limit = 10, search = '' }) => {
  const params = new URLSearchParams({ page, limit, search });
  const response = await axiosInstance.get(`/portfolio?${params.toString()}`);
  return response.data;
};

export const createPortfolio = async (portfolioData) => {
  const response = await axiosInstance.post('/portfolio', portfolioData);
  return response.data;
};

// Add updatePortfolio, deletePortfolio etc. as needed
