import React from 'react'
import './styles.css'

const Registration = () => {
    return (
        <div>
            <section className="page-header">
                <div className="container">
                    <h1 className="page-title">Conference Registration</h1>
                    <p className="lead">Join us for the NACNDC & JASH Conference 2025</p>
                    <p className="mb-0">November 3-7, 2025 • Speke Resort Munyonyo, Uganda</p>
                </div>
            </section>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <form className="registration-form" id="registrationForm">
                            <div className="form-section">
                                <h3 className="section-title">
                                    <i className="fas fa-user"></i>
                                    Personal Information
                                </h3>
                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Title *</label>
                                        <select className="form-select" required>
                                            <option value="">Select Title</option>
                                            <option value="Dr">Dr.</option>
                                            <option value="Prof">Prof.</option>
                                            <option value="Mr">Mr.</option>
                                            <option value="Ms">Ms.</option>
                                            <option value="Mrs">Mrs.</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">First Name *</label>
                                        <input type="text" className="form-control" required />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Last Name *</label>
                                        <input type="text" className="form-control" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Email Address *</label>
                                        <input type="email" className="form-control" required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Phone Number *</label>
                                        <input type="tel" className="form-control" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Country *</label>
                                        <select className="form-select" required>
                                            <option value="">Select Country</option>
                                            <option value="Uganda">Uganda</option>
                                            <option value="Kenya">Kenya</option>
                                            <option value="Tanzania">Tanzania</option>
                                            <option value="Rwanda">Rwanda</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">City</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h3 className="section-title">
                                    <i className="fas fa-briefcase"></i>
                                    Professional Information
                                </h3>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Organization/Institution *</label>
                                        <input type="text" className="form-control" required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Job Title/Position *</label>
                                        <input type="text" className="form-control" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Professional Category *</label>
                                        <select className="form-select" required>
                                            <option value="">Select Category</option>
                                            <option value="Medical Doctor">Medical Doctor</option>
                                            <option value="Nurse">Nurse/Midwife</option>
                                            <option value="Public Health">Public Health Professional</option>
                                            <option value="Researcher">Researcher/Academic</option>
                                            <option value="Student">Student</option>
                                            <option value="Policy Maker">Policy Maker</option>
                                            <option value="NGO">NGO/Development Partner</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Years of Experience</label>
                                        <select className="form-select">
                                            <option value="">Select Experience</option>
                                            <option value="0-2">0-2 years</option>
                                            <option value="3-5">3-5 years</option>
                                            <option value="6-10">6-10 years</option>
                                            <option value="11-15">11-15 years</option>
                                            <option value="16+">16+ years</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h3 className="section-title">
                                    <i className="fas fa-ticket-alt"></i>
                                    Registration Category
                                </h3>
                                <div className="registration-type" onclick="selectRegistrationType(this, 'international')">
                                    <label className="d-flex justify-content-between align-items-center mb-0">
                                        <div>
                                            <input type="radio" name="registrationType" value="international" required />
                                            <strong>International Delegate</strong>
                                            <div className="text-muted small">Non-African countries</div>
                                        </div>
                                        <span className="price-tag">$400</span>
                                    </label>
                                </div>
                                <div className="registration-type" onclick="selectRegistrationType(this, 'regional')">
                                    <label className="d-flex justify-content-between align-items-center mb-0">
                                        <div>
                                            <input type="radio" name="registrationType" value="regional" required />
                                            <strong>Regional Delegate</strong>
                                            <div className="text-muted small">African countries (excluding Uganda)</div>
                                        </div>
                                        <span className="price-tag">$200</span>
                                    </label>
                                </div>
                                <div className="registration-type" onclick="selectRegistrationType(this, 'local')">
                                    <label className="d-flex justify-content-between align-items-center mb-0">
                                        <div>
                                            <input type="radio" name="registrationType" value="local" required />
                                            <strong>Local Delegate</strong>
                                            <div className="text-muted small">Uganda residents</div>
                                        </div>
                                        <span className="price-tag">UGX 150,000</span>
                                    </label>
                                </div>
                                <div className="registration-type" onclick="selectRegistrationType(this, 'student')">
                                    <label className="d-flex justify-content-between align-items-center mb-0">
                                        <div>
                                            <input type="radio" name="registrationType" value="student" required />
                                            <strong>Student</strong>
                                            <div className="text-muted small">Valid student ID required</div>
                                        </div>
                                        <span className="price-tag">UGX 75,000</span>
                                    </label>
                                </div>
                            </div>

                            <div className="form-section">
                                <h3 className="section-title">
                                    <i className="fas fa-cog"></i>
                                    Additional Information
                                </h3>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Dietary Requirements</label>
                                        <select className="form-select">
                                            <option value="">No special requirements</option>
                                            <option value="vegetarian">Vegetarian</option>
                                            <option value="vegan">Vegan</option>
                                            <option value="halal">Halal</option>
                                            <option value="gluten-free">Gluten-free</option>
                                            <option value="other">Other (specify in comments)</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Accommodation Needed</label>
                                        <select className="form-select">
                                            <option value="no">No, I have my own accommodation</option>
                                            <option value="yes">Yes, please assist with booking</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Special Needs/Comments</label>
                                    <textarea className="form-control" rows="3" placeholder="Any accessibility requirements, special assistance needed, or additional comments..."></textarea>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="newsletter" checked />
                                    <label className="form-check-label" for="newsletter">
                                        I would like to receive updates about future conferences and health initiatives
                                    </label>
                                </div>
                            </div>

                            <div className="form-section">
                                <h3 className="section-title">
                                    <i className="fas fa-file-contract"></i>
                                    Terms & Conditions
                                </h3>
                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox" id="terms" required />
                                    <label className="form-check-label" for="terms">
                                        I agree to the <a href="#" className="text-decoration-none">Terms and Conditions</a> and <a href="#" className="text-decoration-none">Privacy Policy</a> *
                                    </label>
                                </div>
                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox" id="photography" />
                                    <label className="form-check-label" for="photography">
                                        I consent to photography and videography during the conference for promotional purposes
                                    </label>
                                </div>

                                <div className="payment-info">
                                    <h6><i className="fas fa-info-circle me-2"></i>Payment Information</h6>
                                    <p className="mb-2 small">After submitting this form, you will receive payment instructions via email within 24 hours. Registration is confirmed upon payment receipt.</p>
                                    <p className="mb-0 small"><strong>Payment Methods:</strong> Bank transfer, Mobile money (Uganda), Credit card</p>
                                </div>
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-primary-custom btn-lg">
                                    <i className="fas fa-paper-plane me-2"></i>
                                    Submit Registration
                                </button>
                                <p className="text-muted small mt-2">You will receive a confirmation email with payment details</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration