// src/pages/Admin/testimonials/List.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../../css/admin/list.css';
import { fetchTestimonialsHandler } from '../../../modules/admin/testimonials';
import useDebounce from '../../../hooks/useDebounce';
import BaseTable from '../../../components/common/BaseTable';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const debouncedSearchTerm = useDebounce(inputValue, 500);
    const testimonialsPerPage = 10;

    const inputRef = useRef(null);

    useEffect(() => {
        const loadTestimonials = async () => {
            try {
                const data = await fetchTestimonialsHandler({
                    page: currentPage,
                    limit: testimonialsPerPage,
                    search: debouncedSearchTerm,
                });
                setTestimonials(data.testimonials);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Failed to fetch testimonials:', error);
            }
        };

        loadTestimonials();
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
            <h3 className="testimonials-header">Testimonials Management</h3>

            <div className="top-bar">
                <Link to="/admin/testimonials/create" className="add-testimonial-button">
                    Add Testimonial
                </Link>

                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search by name or message..."
                    value={inputValue}
                    onChange={handleSearchChange}
                    className="search-input"
                    autoComplete="off"
                />
            </div>

            <BaseTable
                columns={[
                    { key: 'name', label: 'Name' },
                    { key: 'message', label: 'Message' },
                    { key: 'role', label: 'Role' },
                    {
                        key: 'created_at',
                        label: 'Created At',
                        render: (row) => new Date(row.created_at).toLocaleDateString(),
                    },
                ]}
                data={testimonials}
                getRowId={(testimonial) => testimonial.id || testimonial._id}
                actions={[
                    {
                        type: 'link',
                        label: 'View',
                        className: 'view',
                        path: (id) => `/admin/testimonials/view/${id}`,
                    },
                    {
                        type: 'link',
                        label: 'Edit',
                        className: 'edit',
                        path: (id) => `/admin/testimonials/edit/${id}`,
                    },
                    {
                        type: 'button',
                        label: 'Delete',
                        className: 'delete',
                        onClick: (id) => console.log('Delete testimonial with id:', id), // replace with actual delete handler
                    },
                ]}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
            />
        </div>
    );
};

export default Testimonials;
