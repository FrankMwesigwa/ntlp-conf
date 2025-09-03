import React, { useState, useEffect } from 'react';
import API from '../../helpers/api';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalRegistrations: 0,
        totalAbstracts: 0,
        totalPayments: 0,
        totalRevenue: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            setLoading(true);
            // Fetch registration stats
            const registrationResponse = await API.get('/registrations/stats/overview');
            const registrationStats = registrationResponse.data;

            // Mock data for other stats (replace with actual API calls when available)
            const mockStats = {
                totalRegistrations: registrationStats.totalRegistrations,
                totalAbstracts: 45, // Replace with actual API call
                totalPayments: registrationStats.byPayment.find(p => p.paymentStatus === 'paid')?.count || 0,
                totalRevenue: 125000 // Replace with actual calculation
            };

            setStats(mockStats);
        } catch (err) {
            console.error('Failed to fetch dashboard stats:', err);
            setError('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const StatCard = ({ title, value, icon, color, subtitle }) => (
        <div className="col-md-3 mb-3">
            <div className={`stat-card stat-card-${color}`}>
                <div className="stat-icon">
                    <i className={icon}></i>
                </div>
                <div className="stat-content">
                    <h4 className="stat-value">{value.toLocaleString()}</h4>
                    <p className="stat-title">{title}</p>
                    {subtitle && <p className="stat-subtitle">{subtitle}</p>}
                </div>
            </div>
        </div>
    );

    const QuickAction = ({ title, description, icon, color, onClick }) => (
        <div className="col-md-4 mb-3">
            <div className="quick-action-card" onClick={onClick}>
                <div className={`action-icon action-icon-${color}`}>
                    <i className={icon}></i>
                </div>
                <div className="action-content">
                    <h5>{title}</h5>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {/* Welcome Section */}
            <div className="welcome-section mb-3">
                <h3 className="mb-1">Welcome to Admin Dashboard</h3>
                <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>Manage your conference registrations, abstracts, and payments</p>
            </div>

            {/* Statistics Cards */}
            <div className="row mb-3">
                <StatCard
                    title="Total Registrations"
                    value={stats.totalRegistrations}
                    icon="fas fa-user-plus"
                    color="primary"
                    subtitle="Conference attendees"
                />
                <StatCard
                    title="Abstracts Submitted"
                    value={stats.totalAbstracts}
                    icon="fas fa-file-alt"
                    color="success"
                    subtitle="Research papers"
                />
                <StatCard
                    title="Payments Received"
                    value={stats.totalPayments}
                    icon="fas fa-credit-card"
                    color="warning"
                    subtitle="Confirmed payments"
                />
                <StatCard
                    title="Total Revenue"
                    value={stats.totalRevenue}
                    icon="fas fa-dollar-sign"
                    color="info"
                    subtitle="UGX"
                />
            </div>

            {/* Quick Actions */}
            <div className="row mb-3">
                <div className="col-12">
                    <h5 className="mb-2" style={{ fontSize: '1rem' }}>Quick Actions</h5>
                </div>
                <QuickAction
                    title="View Registrations"
                    description="Manage conference registrations"
                    icon="fas fa-users"
                    color="primary"
                    onClick={() => window.location.href = '/admin/registrations'}
                />
                <QuickAction
                    title="Review Abstracts"
                    description="Review submitted abstracts"
                    icon="fas fa-file-alt"
                    color="success"
                    onClick={() => window.location.href = '/admin/abstracts'}
                />
                <QuickAction
                    title="Payment Management"
                    description="Track and manage payments"
                    icon="fas fa-credit-card"
                    color="warning"
                    onClick={() => window.location.href = '/admin/payments'}
                />
            </div>

            {/* Recent Activity */}
            <div className="row">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title mb-0" style={{ fontSize: '0.9rem' }}>Recent Registrations</h6>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Type</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Dr. John Doe</td>
                                            <td>john@example.com</td>
                                            <td><span className="badge bg-primary">Local</span></td>
                                            <td><span className="badge bg-success">Confirmed</span></td>
                                            <td>2025-01-15</td>
                                        </tr>
                                        <tr>
                                            <td>Prof. Jane Smith</td>
                                            <td>jane@example.com</td>
                                            <td><span className="badge bg-info">International</span></td>
                                            <td><span className="badge bg-warning">Pending</span></td>
                                            <td>2025-01-14</td>
                                        </tr>
                                        <tr>
                                            <td>Dr. Mike Johnson</td>
                                            <td>mike@example.com</td>
                                            <td><span className="badge bg-secondary">Regional</span></td>
                                            <td><span className="badge bg-success">Confirmed</span></td>
                                            <td>2025-01-13</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title mb-0" style={{ fontSize: '0.9rem' }}>System Status</h6>
                        </div>
                        <div className="card-body">
                            <div className="status-item">
                                <div className="status-indicator status-online"></div>
                                <div className="status-content">
                                    <strong>Database</strong>
                                    <span className="text-success">Online</span>
                                </div>
                            </div>
                            <div className="status-item">
                                <div className="status-indicator status-online"></div>
                                <div className="status-content">
                                    <strong>API Server</strong>
                                    <span className="text-success">Online</span>
                                </div>
                            </div>
                            <div className="status-item">
                                <div className="status-indicator status-online"></div>
                                <div className="status-content">
                                    <strong>Email Service</strong>
                                    <span className="text-success">Online</span>
                                </div>
                            </div>
                            <div className="status-item">
                                <div className="status-indicator status-warning"></div>
                                <div className="status-content">
                                    <strong>Payment Gateway</strong>
                                    <span className="text-warning">Maintenance</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .admin-dashboard {
                    padding: 0;
                }

                .welcome-section h3 {
                    color: #2c3e50;
                    margin-bottom: 0.25rem;
                    font-size: 1.25rem;
                }

                .stat-card {
                    background: white;
                    border-radius: 8px;
                    padding: 1rem;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    display: flex;
                    align-items: center;
                    transition: transform 0.3s ease;
                }

                .stat-card:hover {
                    transform: translateY(-2px);
                }

                .stat-card-primary {
                    border-left: 4px solid #007bff;
                }

                .stat-card-success {
                    border-left: 4px solid #28a745;
                }

                .stat-card-warning {
                    border-left: 4px solid #ffc107;
                }

                .stat-card-info {
                    border-left: 4px solid #17a2b8;
                }

                .stat-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 0.75rem;
                    font-size: 1.25rem;
                }

                .stat-card-primary .stat-icon {
                    background: rgba(0, 123, 255, 0.1);
                    color: #007bff;
                }

                .stat-card-success .stat-icon {
                    background: rgba(40, 167, 69, 0.1);
                    color: #28a745;
                }

                .stat-card-warning .stat-icon {
                    background: rgba(255, 193, 7, 0.1);
                    color: #ffc107;
                }

                .stat-card-info .stat-icon {
                    background: rgba(23, 162, 184, 0.1);
                    color: #17a2b8;
                }

                .stat-value {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin: 0;
                    color: #2c3e50;
                }

                .stat-title {
                    font-size: 0.8rem;
                    color: #6c757d;
                    margin: 0;
                }

                .stat-subtitle {
                    font-size: 0.7rem;
                    color: #adb5bd;
                    margin: 0;
                }

                .quick-action-card {
                    background: white;
                    border-radius: 6px;
                    padding: 1rem;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                }

                .quick-action-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
                }

                .action-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 0.75rem;
                    font-size: 1rem;
                }

                .action-icon-primary {
                    background: rgba(0, 123, 255, 0.1);
                    color: #007bff;
                }

                .action-icon-success {
                    background: rgba(40, 167, 69, 0.1);
                    color: #28a745;
                }

                .action-icon-warning {
                    background: rgba(255, 193, 7, 0.1);
                    color: #ffc107;
                }

                .action-content h5 {
                    margin: 0 0 0.25rem 0;
                    color: #2c3e50;
                    font-size: 0.9rem;
                }

                .action-content p {
                    margin: 0;
                    color: #6c757d;
                    font-size: 0.8rem;
                }

                .card {
                    border: none;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .card-header {
                    background: #f8f9fa;
                    border-bottom: 1px solid #e9ecef;
                }

                .status-item {
                    display: flex;
                    align-items: center;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid #e9ecef;
                }

                .status-item:last-child {
                    border-bottom: none;
                }

                .status-indicator {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    margin-right: 0.5rem;
                }

                .status-online {
                    background: #28a745;
                }

                .status-warning {
                    background: #ffc107;
                }

                .status-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex: 1;
                }

                .table th {
                    border-top: none;
                    font-weight: 600;
                    color: #495057;
                    font-size: 0.8rem;
                }

                .table td {
                    font-size: 0.8rem;
                }

                .badge {
                    font-size: 0.7rem;
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
