import React, { useState, useEffect } from 'react'
import API from '../../helpers/api'
import RegistrationSuccess from '../../components/RegistrationSuccess'
import './styles.css'

const Registration = () => {
    const [formData, setFormData] = useState({
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        country: '',
        city: '',
        organization: '',
        jobTitle: '',
        professionalCategory: '',
        yearsOfExperience: '',
        registrationType: '',
        dietaryRequirements: '',
        accommodationNeeded: 'no',
        specialNeeds: '',
        newsletterSubscription: true,
        termsAccepted: false,
        photographyConsent: false
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [registrationResult, setRegistrationResult] = useState(null);
    const [selectedFee, setSelectedFee] = useState(null);

    // Helper function to get registration fee info
    const getRegistrationFeeInfo = (registrationType) => {
        const fees = {
            international: { amount: 400, currency: 'USD', display: '$400' },
            regional: { amount: 200, currency: 'USD', display: '$200' },
            local: { amount: 150000, currency: 'UGX', display: 'UGX 150,000' },
            student: { amount: 75000, currency: 'UGX', display: 'UGX 75,000' }
        };
        
        return fees[registrationType] || fees.local;
    };

    // Helper function to format registration data for API
    const formatRegistrationData = (formData) => {
        return {
            title: formData.title,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            country: formData.country,
            city: formData.city || '',
            organization: formData.organization,
            jobTitle: formData.jobTitle,
            professionalCategory: formData.professionalCategory,
            yearsOfExperience: formData.yearsOfExperience || '',
            registrationType: formData.registrationType,
            dietaryRequirements: formData.dietaryRequirements || '',
            accommodationNeeded: formData.accommodationNeeded || 'no',
            specialNeeds: formData.specialNeeds || '',
            newsletterSubscription: formData.newsletterSubscription !== false,
            termsAccepted: formData.termsAccepted,
            photographyConsent: formData.photographyConsent || false
        };
    };

    // Update fee when registration type changes
    useEffect(() => {
        if (formData.registrationType) {
            const feeInfo = getRegistrationFeeInfo(formData.registrationType);
            setSelectedFee(feeInfo);
        } else {
            setSelectedFee(null);
        }
    }, [formData.registrationType]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = [
            'title', 'firstName', 'lastName', 'email', 'phoneNumber',
            'country', 'organization', 'jobTitle', 'professionalCategory',
            'registrationType', 'termsAccepted'
        ];

        requiredFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
            }
        });

        // Email validation
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Phone validation
        if (formData.phoneNumber && formData.phoneNumber.length < 10) {
            newErrors.phoneNumber = 'Phone number must be at least 10 digits';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        try {
            const formattedData = formatRegistrationData(formData);
            const response = await API.post('/registrations', formattedData);
            
            // Success case
            setRegistrationResult(response.data.registration);
            setSubmitSuccess(true);
            
        } catch (error) {
            console.error('Registration error:', error);
            
            if (error.response?.data) {
                const errorData = error.response.data;
                
                if (errorData.details) {
                    // Handle validation errors from backend
                    const backendErrors = {};
                    errorData.details.forEach(error => {
                        backendErrors[error.field] = error.message;
                    });
                    setErrors(backendErrors);
                } else {
                    // Handle other API errors
                    setErrors({ submit: errorData.message || 'Registration failed. Please try again.' });
                }
            } else {
                // Handle network errors
                setErrors({ submit: 'Network error. Please check your connection and try again.' });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseSuccess = () => {
        setSubmitSuccess(false);
        setRegistrationResult(null);
        // Reset form
        setFormData({
            title: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            country: '',
            city: '',
            organization: '',
            jobTitle: '',
            professionalCategory: '',
            yearsOfExperience: '',
            registrationType: '',
            dietaryRequirements: '',
            accommodationNeeded: 'no',
            specialNeeds: '',
            newsletterSubscription: true,
            termsAccepted: false,
            photographyConsent: false
        });
    };

    if (submitSuccess && registrationResult) {
        return <RegistrationSuccess registration={registrationResult} onClose={handleCloseSuccess} />;
    }

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
                        {errors.submit && (
                            <div className="alert alert-danger" role="alert">
                                <i className="fas fa-exclamation-triangle me-2"></i>
                                {errors.submit}
                            </div>
                        )}
                        
                        <form className="registration-form" onSubmit={handleSubmit}>
                            <div className="form-section">
                                <h3 className="section-title">
                                    <i className="fas fa-user"></i>
                                    Personal Information
                                </h3>
                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Title *</label>
                                        <select 
                                            className={`form-select ${errors.title ? 'is-invalid' : ''}`}
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Title</option>
                                            <option value="Dr">Dr.</option>
                                            <option value="Prof">Prof.</option>
                                            <option value="Mr">Mr.</option>
                                            <option value="Ms">Ms.</option>
                                            <option value="Mrs">Mrs.</option>
                                        </select>
                                        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">First Name *</label>
                                        <input 
                                            type="text" 
                                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required 
                                        />
                                        {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Last Name *</label>
                                        <input 
                                            type="text" 
                                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required 
                                        />
                                        {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Email Address *</label>
                                        <input 
                                            type="email" 
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required 
                                        />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Phone Number *</label>
                                        <input 
                                            type="tel" 
                                            className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            required 
                                        />
                                        {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Country *</label>
                                        <select 
                                            className={`form-select ${errors.country ? 'is-invalid' : ''}`}
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Country</option>
                                            <option value="Uganda">Uganda</option>
                                            <option value="Kenya">Kenya</option>
                                            <option value="Tanzania">Tanzania</option>
                                            <option value="Rwanda">Rwanda</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {errors.country && <div className="invalid-feedback">{errors.country}</div>}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">City</label>
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                        />
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
                                        <input 
                                            type="text" 
                                            className={`form-control ${errors.organization ? 'is-invalid' : ''}`}
                                            name="organization"
                                            value={formData.organization}
                                            onChange={handleInputChange}
                                            required 
                                        />
                                        {errors.organization && <div className="invalid-feedback">{errors.organization}</div>}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Job Title/Position *</label>
                                        <input 
                                            type="text" 
                                            className={`form-control ${errors.jobTitle ? 'is-invalid' : ''}`}
                                            name="jobTitle"
                                            value={formData.jobTitle}
                                            onChange={handleInputChange}
                                            required 
                                        />
                                        {errors.jobTitle && <div className="invalid-feedback">{errors.jobTitle}</div>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Professional Category *</label>
                                        <select 
                                            className={`form-select ${errors.professionalCategory ? 'is-invalid' : ''}`}
                                            name="professionalCategory"
                                            value={formData.professionalCategory}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            <option value="Medical Doctor">Medical Doctor</option>
                                            <option value="Nurse/Midwife">Nurse/Midwife</option>
                                            <option value="Public Health Professional">Public Health Professional</option>
                                            <option value="Researcher/Academic">Researcher/Academic</option>
                                            <option value="Student">Student</option>
                                            <option value="Policy Maker">Policy Maker</option>
                                            <option value="NGO/Development Partner">NGO/Development Partner</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {errors.professionalCategory && <div className="invalid-feedback">{errors.professionalCategory}</div>}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Years of Experience</label>
                                        <select 
                                            className="form-select"
                                            name="yearsOfExperience"
                                            value={formData.yearsOfExperience}
                                            onChange={handleInputChange}
                                        >
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
                                {errors.registrationType && (
                                    <div className="alert alert-danger" role="alert">
                                        {errors.registrationType}
                                    </div>
                                )}
                                <div className="registration-type" onClick={() => setFormData(prev => ({ ...prev, registrationType: 'international' }))}>
                                    <label className="d-flex justify-content-between align-items-center mb-0">
                                        <div>
                                            <input 
                                                type="radio" 
                                                name="registrationType" 
                                                value="international" 
                                                checked={formData.registrationType === 'international'}
                                                onChange={handleInputChange}
                                                required 
                                            />
                                            <strong>International Delegate</strong>
                                            <div className="text-muted small">Non-African countries</div>
                                        </div>
                                        <span className="price-tag">$400</span>
                                    </label>
                                </div>
                                <div className="registration-type" onClick={() => setFormData(prev => ({ ...prev, registrationType: 'regional' }))}>
                                    <label className="d-flex justify-content-between align-items-center mb-0">
                                        <div>
                                            <input 
                                                type="radio" 
                                                name="registrationType" 
                                                value="regional" 
                                                checked={formData.registrationType === 'regional'}
                                                onChange={handleInputChange}
                                                required 
                                            />
                                            <strong>Regional Delegate</strong>
                                            <div className="text-muted small">African countries (excluding Uganda)</div>
                                        </div>
                                        <span className="price-tag">$200</span>
                                    </label>
                                </div>
                                <div className="registration-type" onClick={() => setFormData(prev => ({ ...prev, registrationType: 'local' }))}>
                                    <label className="d-flex justify-content-between align-items-center mb-0">
                                        <div>
                                            <input 
                                                type="radio" 
                                                name="registrationType" 
                                                value="local" 
                                                checked={formData.registrationType === 'local'}
                                                onChange={handleInputChange}
                                                required 
                                            />
                                            <strong>Local Delegate</strong>
                                            <div className="text-muted small">Uganda residents</div>
                                        </div>
                                        <span className="price-tag">UGX 150,000</span>
                                    </label>
                                </div>
                                <div className="registration-type" onClick={() => setFormData(prev => ({ ...prev, registrationType: 'student' }))}>
                                    <label className="d-flex justify-content-between align-items-center mb-0">
                                        <div>
                                            <input 
                                                type="radio" 
                                                name="registrationType" 
                                                value="student" 
                                                checked={formData.registrationType === 'student'}
                                                onChange={handleInputChange}
                                                required 
                                            />
                                            <strong>Student</strong>
                                            <div className="text-muted small">Valid student ID required</div>
                                        </div>
                                        <span className="price-tag">UGX 75,000</span>
                                    </label>
                                </div>
                                
                                {selectedFee && (
                                    <div className="selected-fee-info">
                                        <div className="alert alert-info">
                                            <i className="fas fa-info-circle me-2"></i>
                                            <strong>Selected Registration Fee:</strong> {selectedFee.display}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="form-section">
                                <h3 className="section-title">
                                    <i className="fas fa-cog"></i>
                                    Additional Information
                                </h3>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Dietary Requirements</label>
                                        <select 
                                            className="form-select"
                                            name="dietaryRequirements"
                                            value={formData.dietaryRequirements}
                                            onChange={handleInputChange}
                                        >
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
                                        <select 
                                            className="form-select"
                                            name="accommodationNeeded"
                                            value={formData.accommodationNeeded}
                                            onChange={handleInputChange}
                                        >
                                            <option value="no">No, I have my own accommodation</option>
                                            <option value="yes">Yes, please assist with booking</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Special Needs/Comments</label>
                                    <textarea 
                                        className="form-control" 
                                        rows="3" 
                                        name="specialNeeds"
                                        value={formData.specialNeeds}
                                        onChange={handleInputChange}
                                        placeholder="Any accessibility requirements, special assistance needed, or additional comments..."
                                    ></textarea>
                                </div>
                                <div className="form-check">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        id="newsletter"
                                        name="newsletterSubscription"
                                        checked={formData.newsletterSubscription}
                                        onChange={handleInputChange}
                                    />
                                    <label className="form-check-label" htmlFor="newsletter">
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
                                    <input 
                                        className={`form-check-input ${errors.termsAccepted ? 'is-invalid' : ''}`}
                                        type="checkbox" 
                                        id="terms"
                                        name="termsAccepted"
                                        checked={formData.termsAccepted}
                                        onChange={handleInputChange}
                                        required 
                                    />
                                    <label className="form-check-label" htmlFor="terms">
                                        I agree to the <a href="/terms" className="text-decoration-none">Terms and Conditions</a> and <a href="/privacy" className="text-decoration-none">Privacy Policy</a> *
                                    </label>
                                    {errors.termsAccepted && <div className="invalid-feedback">{errors.termsAccepted}</div>}
                                </div>
                                <div className="form-check mb-3">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        id="photography"
                                        name="photographyConsent"
                                        checked={formData.photographyConsent}
                                        onChange={handleInputChange}
                                    />
                                    <label className="form-check-label" htmlFor="photography">
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
                                <button 
                                    type="submit" 
                                    className="btn btn-primary-custom btn-lg"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-paper-plane me-2"></i>
                                            Submit Registration
                                        </>
                                    )}
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