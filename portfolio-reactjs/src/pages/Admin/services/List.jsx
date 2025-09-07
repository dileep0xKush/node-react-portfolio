import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../../css/admin/list.css';
import { fetchServices, deleteServiceHandler } from '../../../modules/admin/services';
import useDebounce from '../../../hooks/useDebounce';
import BaseTable from '../../../components/common/BaseTable';

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const debouncedSearchTerm = useDebounce(inputValue, 500);
  const servicesPerPage = 10;

  const inputRef = useRef(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices({
          page: currentPage,
          limit: servicesPerPage,
          search: debouncedSearchTerm,
        });
        setServices(data.services);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };

    loadServices();
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

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;

    try {
      await deleteServiceHandler(id);
      // Reload services after delete
      const data = await fetchServices({
        page: currentPage,
        limit: servicesPerPage,
        search: debouncedSearchTerm,
      });
      setServices(data.services);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Failed to delete service:', error);
    }
  };

  return (
    <div className="card">
      <h3 className="services-header">Services Management</h3>

      <div className="top-bar">
        <Link to="/admin/services/create" className="add-service-button">
          Add Service
        </Link>

        <input
          ref={inputRef}
          type="text"
          placeholder="Search by service name or description..."
          value={inputValue}
          onChange={handleSearchChange}
          className="search-input"
          autoComplete="off"
        />
      </div>

      <BaseTable
        columns={[
          { key: 'name', label: 'Service Name' },
          { key: 'description', label: 'Description' },
          { key: 'status', label: 'Status' },
          { key: 'created_at', label: 'Created At' },
        ]}
        data={services}
        getRowId={(service) => service.id || service._id}
        actions={[
          {
            type: 'link',
            label: 'View',
            className: 'view',
            path: (id) => `/admin/services/view/${id}`,
          },
          {
            type: 'link',
            label: 'Edit',
            className: 'edit',
            path: (id) => `/admin/services/edit/${id}`,
          },
          {
            type: 'button',
            label: 'Delete',
            className: 'delete',
            onClick: handleDelete,
          },
        ]}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
    </div>
  );
};

export default ServicesList;
