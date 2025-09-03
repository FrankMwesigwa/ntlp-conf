import React from 'react';

const RegistrationSuccess = ({ registration, onClose }) => {
    const formatCurrency = (amount, currency) => {
        if (currency === 'USD') {
            return `$${amount}`;
        }
        return `UGX ${amount.toLocaleString()}`;
    };

    return (
        <div className="registration-success">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="success-card">
                            <div className="success-header">
                                <div className="success-icon">
                                    <i className="fas fa-check-circle"></i>
                                </div>
                                <h2 className="success-title">Registration Successful!</h2>
                                <p className="success-subtitle">
                                    Thank you for registering for the NACNDC & JASH Conference 2025
                                </p>
                            </div>

                            <div className="success-content">
                                <div className="registration-details">
                                    <h4>Registration Details</h4>
                                    <div className="detail-grid">
                                        <div className="detail-item">
                                            <span className="label">Registration ID:</span>
                                            <span className="value">#{registration.id}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="label">Name:</span>
                                            <span className="value">{registration.firstName} {registration.lastName}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="label">Email:</span>
                                            <span className="value">{registration.email}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="label">Registration Type:</span>
                                            <span className="value">{registration.registrationType.charAt(0).toUpperCase() + registration.registrationType.slice(1)}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="label">Registration Fee:</span>
                                            <span className="value fee-amount">
                                                {formatCurrency(registration.registrationFee, registration.currency)}
                                            </span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="label">Payment Reference:</span>
                                            <span className="value reference-code">{registration.paymentReference}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="payment-info">
                                    <h4><i className="fas fa-credit-card me-2"></i>Payment Instructions</h4>
                                    <div className="payment-steps">
                                        <div className="step">
                                            <div className="step-number">1</div>
                                            <div className="step-content">
                                                <h6>Payment Amount</h6>
                                                <p className="amount">{formatCurrency(registration.registrationFee, registration.currency)}</p>
                                            </div>
                                        </div>
                                        <div className="step">
                                            <div className="step-number">2</div>
                                            <div className="step-content">
                                                <h6>Payment Methods</h6>
                                                <ul>
                                                    <li>Bank Transfer</li>
                                                    <li>Mobile Money (Uganda)</li>
                                                    <li>Credit Card</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="step">
                                            <div className="step-number">3</div>
                                            <div className="step-content">
                                                <h6>Reference Code</h6>
                                                <p className="reference">{registration.paymentReference}</p>
                                                <small>Use this reference when making payment</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="next-steps">
                                    <h4><i className="fas fa-info-circle me-2"></i>What's Next?</h4>
                                    <ul>
                                        <li>You will receive detailed payment instructions via email within 24 hours</li>
                                        <li>Complete your payment using the reference code above</li>
                                        <li>Your registration will be confirmed once payment is received</li>
                                        <li>You'll receive a confirmation email with conference details</li>
                                    </ul>
                                </div>

                                <div className="contact-info">
                                    <h4><i className="fas fa-phone me-2"></i>Need Help?</h4>
                                    <p>If you have any questions about your registration or payment, please contact us:</p>
                                    <div className="contact-details">
                                        <div className="contact-item">
                                            <i className="fas fa-envelope"></i>
                                            <span>conference@nacndc.org</span>
                                        </div>
                                        <div className="contact-item">
                                            <i className="fas fa-phone"></i>
                                            <span>+256 700 123 456</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="success-actions">
                                <button 
                                    className="btn btn-primary-custom"
                                    onClick={() => window.print()}
                                >
                                    <i className="fas fa-print me-2"></i>
                                    Print Confirmation
                                </button>
                                <button 
                                    className="btn btn-outline-secondary"
                                    onClick={onClose}
                                >
                                    <i className="fas fa-home me-2"></i>
                                    Return to Home
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .registration-success {
                    padding: 2rem 0;
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                    min-height: 100vh;
                }

                .success-card {
                    background: white;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    overflow: hidden;
                }

                .success-header {
                    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                    color: white;
                    padding: 3rem 2rem;
                    text-align: center;
                }

                .success-icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                    animation: bounce 2s infinite;
                }

                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% {
                        transform: translateY(0);
                    }
                    40% {
                        transform: translateY(-10px);
                    }
                    60% {
                        transform: translateY(-5px);
                    }
                }

                .success-title {
                    font-size: 2.5rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                }

                .success-subtitle {
                    font-size: 1.2rem;
                    opacity: 0.9;
                    margin-bottom: 0;
                }

                .success-content {
                    padding: 2rem;
                }

                .registration-details h4,
                .payment-info h4,
                .next-steps h4,
                .contact-info h4 {
                    color: #2c3e50;
                    margin-bottom: 1.5rem;
                    font-weight: 600;
                }

                .detail-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1rem;
                    margin-bottom: 2rem;
                }

                .detail-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.75rem;
                    background: #f8f9fa;
                    border-radius: 8px;
                    border-left: 4px solid #28a745;
                }

                .detail-item .label {
                    font-weight: 600;
                    color: #495057;
                }

                .detail-item .value {
                    color: #2c3e50;
                    font-weight: 500;
                }

                .fee-amount {
                    color: #28a745 !important;
                    font-weight: 700 !important;
                    font-size: 1.1rem;
                }

                .reference-code {
                    font-family: 'Courier New', monospace;
                    background: #e9ecef;
                    padding: 0.25rem 0.5rem;
                    border-radius: 4px;
                    font-weight: 600;
                }

                .payment-steps {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }

                .step {
                    display: flex;
                    align-items: flex-start;
                    gap: 1rem;
                }

                .step-number {
                    background: #28a745;
                    color: white;
                    width: 2rem;
                    height: 2rem;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    flex-shrink: 0;
                }

                .step-content h6 {
                    color: #2c3e50;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                }

                .step-content .amount {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #28a745;
                    margin: 0;
                }

                .step-content .reference {
                    font-family: 'Courier New', monospace;
                    background: #e9ecef;
                    padding: 0.5rem;
                    border-radius: 4px;
                    font-weight: 600;
                    margin: 0.5rem 0;
                }

                .step-content ul {
                    margin: 0.5rem 0;
                    padding-left: 1.2rem;
                }

                .step-content li {
                    margin-bottom: 0.25rem;
                }

                .next-steps ul,
                .contact-info ul {
                    margin: 0;
                    padding-left: 1.2rem;
                }

                .next-steps li,
                .contact-info li {
                    margin-bottom: 0.5rem;
                    color: #495057;
                }

                .contact-details {
                    display: flex;
                    gap: 2rem;
                    margin-top: 1rem;
                }

                .contact-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #495057;
                }

                .contact-item i {
                    color: #28a745;
                }

                .success-actions {
                    padding: 2rem;
                    background: #f8f9fa;
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .btn-primary-custom {
                    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
                    border: none;
                    color: white;
                    padding: 0.75rem 2rem;
                    border-radius: 8px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .btn-primary-custom:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0,123,255,0.3);
                }

                .btn-outline-secondary {
                    border: 2px solid #6c757d;
                    color: #6c757d;
                    background: transparent;
                    padding: 0.75rem 2rem;
                    border-radius: 8px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .btn-outline-secondary:hover {
                    background: #6c757d;
                    color: white;
                    transform: translateY(-2px);
                }

                @media (max-width: 768px) {
                    .success-header {
                        padding: 2rem 1rem;
                    }

                    .success-title {
                        font-size: 2rem;
                    }

                    .success-content {
                        padding: 1.5rem;
                    }

                    .detail-grid {
                        grid-template-columns: 1fr;
                    }

                    .payment-steps {
                        grid-template-columns: 1fr;
                    }

                    .contact-details {
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .success-actions {
                        flex-direction: column;
                        align-items: center;
                    }
                }
            `}</style>
        </div>
    );
};

export default RegistrationSuccess;
