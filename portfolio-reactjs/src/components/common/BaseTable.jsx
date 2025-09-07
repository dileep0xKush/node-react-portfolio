import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../css/admin/list.css';

const BaseTable = ({
    columns,
    data,
    getRowId = item => item.id || item._id,
    actions = null,
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const renderPagination = () => {
        if (!currentPage || !totalPages || !onPageChange) return null;

        return (
            <div className="pagination">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>

                {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={currentPage === page ? 'active' : ''}
                        >
                            {page}
                        </button>
                    );
                })}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        );
    };

    return (
        <>
            <table className="users-table">
                <thead>
                    <tr>
                        <th>Sr No</th>
                        {columns.map(col => (
                            <th key={col.key}>{col.label}</th>
                        ))}
                        {actions && <th>Actions</th>}
                    </tr>
                </thead>

                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + (actions ? 1 : 0) + 1} className="no-users">
                                No data found.
                            </td>
                        </tr>
                    ) : (
                        data.map((item, index) => {
                            const id = getRowId(item);
                            const serial = (currentPage - 1) * data.length + index + 1;

                            return (
                                <tr key={id}>
                                    <td>{serial}</td>
                                    {columns.map(col => (
                                        <td key={col.key}>{item[col.key]}</td>
                                    ))}
                                    {actions && (
                                        <td>
                                            {actions.map(action => {
                                                if (action.type === 'link') {
                                                    return (
                                                        <Link
                                                            key={action.label}
                                                            to={action.path(id)}
                                                            className={`action-button ${action.className}`}
                                                        >
                                                            {action.label}
                                                        </Link>
                                                    );
                                                } else if (action.type === 'button') {
                                                    return (
                                                        <button
                                                            key={action.label}
                                                            onClick={() => action.onClick(id)}
                                                            className={`action-button ${action.className}`}
                                                        >
                                                            {action.label}
                                                        </button>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </td>
                                    )}
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>

            {renderPagination()}
        </>
    );
};

BaseTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    data: PropTypes.array.isRequired,
    getRowId: PropTypes.func,
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.oneOf(['link', 'button']).isRequired,
            label: PropTypes.string.isRequired,
            className: PropTypes.string,
            path: PropTypes.func,
            onClick: PropTypes.func,
        })
    ),
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    onPageChange: PropTypes.func,
};

export default BaseTable;
