import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../../css/admin/list.css';
import { fetchPortfolios } from '../../../modules/admin/portfolio';
import useDebounce from '../../../hooks/useDebounce';
import BaseTable from '../../../components/common/BaseTable';

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const debouncedSearchTerm = useDebounce(inputValue, 500);
  const portfoliosPerPage = 10;

  const inputRef = useRef(null);

  useEffect(() => {
    const loadPortfolios = async () => {
      try {
        const data = await fetchPortfolios({ page: currentPage, limit: portfoliosPerPage, search: debouncedSearchTerm });
        setPortfolios(data.portfolios);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Failed to fetch portfolios:', error);
      }
    };

    loadPortfolios();
  }, [currentPage, debouncedSearchTerm]);

  useEffect(() => {
    setCurrentPage(1);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [debouncedSearchTerm]);

  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
  };

  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div className="card">
      <h3 className="portfolio-header">Portfolio Management</h3>

      <div className="top-bar">
        <Link to="/admin/portfolios/create" className="add-portfolio-button">
          Add Portfolio
        </Link>

        <input
          ref={inputRef}
          type="text"
          placeholder="Search portfolios..."
          value={inputValue}
          onChange={handleSearchChange}
          className="search-input"
          autoComplete="off"
        />
      </div>

      <BaseTable
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'category', label: 'Category' },
          { key: 'created_at', label: 'Created At', render: (row) => new Date(row.created_at).toLocaleDateString() },
        ]}
        data={portfolios}
        getRowId={(portfolio) => portfolio.id || portfolio._id}
        actions={[
          {
            type: 'link',
            label: 'View',
            className: 'view',
            path: id => `/admin/portfolios/view/${id}`
          },
          {
            type: 'link',
            label: 'Edit',
            className: 'edit',
            path: id => `/admin/portfolios/edit/${id}`
          },
          {
            type: 'button',
            label: 'Delete',
            className: 'delete',
            onClick: (id) => console.log('Delete portfolio with id:', id), // Implement delete handler
          },
        ]}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
    </div>
  );
};

export default Portfolio;
