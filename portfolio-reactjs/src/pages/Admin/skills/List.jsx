import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../../css/admin/list.css';
import { fetchSkills } from '../../../modules/admin/skills'; // Your skills module
import useDebounce from '../../../hooks/useDebounce';
import BaseTable from '../../../components/common/BaseTable';

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const debouncedSearchTerm = useDebounce(inputValue, 500);
    const skillsPerPage = 10;

    const inputRef = useRef(null);

    useEffect(() => {
        const loadSkills = async () => {
            try {
                const data = await fetchSkills({ page: currentPage, limit: skillsPerPage, search: debouncedSearchTerm });
                setSkills(data.skills);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Failed to fetch skills:', error);
            }
        };

        loadSkills();
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
        <div className='card'>
            <h3 className="skills-header">Skills Management</h3>

            <div className="top-bar">
                <Link to="/admin/skills/create" className="add-skill-button">
                    Add Skill
                </Link>

                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search skills..."
                    value={inputValue}
                    onChange={handleSearchChange}
                    className="search-input"
                    autoComplete="off"
                />
            </div>

            <BaseTable
                columns={[
                    { key: 'name', label: 'Name' },
                    { key: 'status', label: 'Status' },
                    { key: 'created_at', label: 'Created At', render: (row) => new Date(row.created_at).toLocaleDateString() },
                ]}
                data={skills}
                getRowId={(skill) => skill.id || skill._id}
                actions={[
                    {
                        type: 'link',
                        label: 'View',
                        className: 'view',
                        path: id => `/admin/skills/view/${id}`
                    },
                    {
                        type: 'link',
                        label: 'Edit',
                        className: 'edit',
                        path: id => `/admin/skills/edit/${id}`
                    },
                    {
                        type: 'button',
                        label: 'Delete',
                        className: 'delete',
                        onClick: (id) => console.log('Delete skill with id:', id), // replace with actual delete handler
                    },
                ]}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
            />

        </div>
    );
};

export default Skills;
