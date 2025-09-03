import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const menuItems = [
        {
            name: 'Dashboard',
            path: '/admin',
            icon: 'fas fa-tachometer-alt',
            exact: true
        },
        {
            name: 'Registrations',
            path: '/admin/registrations',
            icon: 'fas fa-user-plus'
        },
        {
            name: 'Abstracts',
            path: '/admin/abstracts',
            icon: 'fas fa-file-alt'
        },
        {
            name: 'Payments',
            path: '/admin/payments',
            icon: 'fas fa-credit-card'
        }
    ];

    const isActiveRoute = (path, exact = false) => {
        if (exact) {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <div className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-brand">
                        <i className="fas fa-cogs"></i>
                        <span>Admin Panel</span>
                    </div>
                    <button 
                        className="sidebar-toggle d-md-none"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <ul className="nav-list">
                        {menuItems.map((item) => (
                            <li key={item.path} className="nav-item">
                                <Link
                                    to={item.path}
                                    className={`nav-link ${isActiveRoute(item.path, item.exact) ? 'active' : ''}`}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <i className={item.icon}></i>
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    <div className="user-info">
                        <div className="user-avatar">
                            <i className="fas fa-user"></i>
                        </div>
                        <div className="user-details">
                            <div className="user-name">Admin User</div>
                            <div className="user-role">Administrator</div>
                        </div>
                    </div>
                    <button className="logout-btn">
                        <i className="fas fa-sign-out-alt"></i>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="admin-main">
                {/* Top Header */}
                <header className="admin-header">
                    <div className="header-left">
                        <button 
                            className="sidebar-toggle d-md-none"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <i className="fas fa-bars"></i>
                        </button>
                        <h1 className="page-title">
                            {menuItems.find(item => isActiveRoute(item.path, item.exact))?.name || 'Admin'}
                        </h1>
                    </div>
                    <div className="header-right">
                        <div className="header-actions">
                            <button className="action-btn" title="Notifications">
                                <i className="fas fa-bell"></i>
                                <span className="badge">3</span>
                            </button>
                            <button className="action-btn" title="Settings">
                                <i className="fas fa-cog"></i>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="admin-content">
                    {children}
                </main>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div 
                    className="sidebar-overlay d-md-none"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            <style jsx>{`
                .admin-layout {
                    display: flex;
                    min-height: 100vh;
                    background-color: #f8f9fa;
                }

                .admin-sidebar {
                    width: 250px;
                    background: #f8f9fa;
                    color: #495057;
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 100vh;
                    z-index: 1000;
                    transition: transform 0.3s ease;
                    overflow-y: auto;
                    border-right: 1px solid #e9ecef;
                }

                .sidebar-header {
                    padding: 1rem 1rem;
                    border-bottom: 1px solid #e9ecef;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .sidebar-brand {
                    display: flex;
                    align-items: center;
                    font-size: 1rem;
                    font-weight: 600;
                    color: #2c3e50;
                }

                .sidebar-brand i {
                    margin-right: 0.5rem;
                    color: #6c757d;
                }

                .sidebar-toggle {
                    background: none;
                    border: none;
                    color: #6c757d;
                    font-size: 1rem;
                    cursor: pointer;
                    padding: 0.5rem;
                }

                .sidebar-nav {
                    padding: 0.5rem 0;
                }

                .nav-list {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }

                .nav-item {
                    margin: 0.1rem 0;
                }

                .nav-link {
                    display: flex;
                    align-items: center;
                    padding: 0.5rem 1rem;
                    color: #6c757d;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    border-left: 3px solid transparent;
                    font-size: 0.875rem;
                }

                .nav-link:hover {
                    background: #e9ecef;
                    color: #495057;
                    border-left-color: #007bff;
                }

                .nav-link.active {
                    background: #e3f2fd;
                    color: #1976d2;
                    border-left-color: #1976d2;
                    font-weight: 500;
                }

                .nav-link i {
                    margin-right: 0.5rem;
                    width: 16px;
                    text-align: center;
                    font-size: 0.875rem;
                }

                .sidebar-footer {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    padding: 0.75rem;
                    border-top: 1px solid #e9ecef;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .user-info {
                    display: flex;
                    align-items: center;
                }

                .user-avatar {
                    width: 32px;
                    height: 32px;
                    background: #e9ecef;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 0.5rem;
                }

                .user-details {
                    flex: 1;
                }

                .user-name {
                    font-weight: 500;
                    font-size: 0.8rem;
                    color: #495057;
                }

                .user-role {
                    font-size: 0.7rem;
                    color: #6c757d;
                }

                .logout-btn {
                    background: none;
                    border: none;
                    color: #6c757d;
                    cursor: pointer;
                    padding: 0.25rem;
                    border-radius: 4px;
                    transition: all 0.3s ease;
                    font-size: 0.875rem;
                }

                .logout-btn:hover {
                    background: #f8d7da;
                    color: #dc3545;
                }

                .admin-main {
                    flex: 1;
                    margin-left: 250px;
                    display: flex;
                    flex-direction: column;
                }

                .admin-header {
                    background: white;
                    padding: 0.75rem 1.5rem;
                    border-bottom: 1px solid #e9ecef;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                }

                .header-left {
                    display: flex;
                    align-items: center;
                }

                .page-title {
                    margin: 0;
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #2c3e50;
                }

                .header-right {
                    display: flex;
                    align-items: center;
                }

                .header-actions {
                    display: flex;
                    gap: 0.5rem;
                }

                .action-btn {
                    position: relative;
                    background: none;
                    border: none;
                    padding: 0.5rem;
                    border-radius: 50%;
                    color: #6c757d;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .action-btn:hover {
                    background: #f8f9fa;
                    color: #2c3e50;
                }

                .action-btn .badge {
                    position: absolute;
                    top: 0;
                    right: 0;
                    background: #e74c3c;
                    color: white;
                    border-radius: 50%;
                    width: 18px;
                    height: 18px;
                    font-size: 0.7rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .admin-content {
                    flex: 1;
                    padding: 1rem 1.5rem;
                }

                .sidebar-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 999;
                }

                /* Mobile Responsive */
                @media (max-width: 768px) {
                    .admin-sidebar {
                        transform: translateX(-100%);
                    }

                    .admin-sidebar.sidebar-open {
                        transform: translateX(0);
                    }

                    .admin-main {
                        margin-left: 0;
                    }

                    .admin-header {
                        padding: 0.75rem 1rem;
                    }

                    .admin-content {
                        padding: 0.75rem 1rem;
                    }
                }

                /* Tablet Responsive */
                @media (max-width: 992px) {
                    .admin-sidebar {
                        width: 220px;
                    }

                    .admin-main {
                        margin-left: 220px;
                    }
                }
            `}</style>
        </div>
    );
};

export default AdminLayout;
