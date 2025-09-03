import React, { Fragment, useEffect } from 'react'

const HomePage = () => {
  useEffect(() => {
    // Set the conference date (November 3, 2025)
    const conferenceDate = new Date('November 3, 2025 08:00:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = conferenceDate - now;
      
      // Calculate time units
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      // Update the DOM elements
      const daysElement = document.getElementById('days');
      const hoursElement = document.getElementById('hours');
      const minutesElement = document.getElementById('minutes');
      const secondsElement = document.getElementById('seconds');
      
      if (daysElement) daysElement.textContent = days;
      if (hoursElement) hoursElement.textContent = hours;
      if (minutesElement) minutesElement.textContent = minutes;
      if (secondsElement) secondsElement.textContent = seconds;
      
      // If countdown is finished
      if (distance < 0) {
        if (daysElement) daysElement.textContent = '0';
        if (hoursElement) hoursElement.textContent = '0';
        if (minutesElement) minutesElement.textContent = '0';
        if (secondsElement) secondsElement.textContent = '0';
      }
    };
    
    // Update countdown immediately
    updateCountdown();
    
    // Update countdown every second
    const interval = setInterval(updateCountdown, 1000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);
  return (
    <Fragment>
      <section id="home" className="hero-section">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-12 hero-content">
              <h1 className="conference-title">NATIONAL ANNUAL COMMUNICABLE AND NON COMMUNICABLE DISEASES (NACNDC) AND 19TH JOINT SCIENTIFIC HEALTH (JASH) CONFERENCE 2025</h1>
              <p className="conference-subtitle">UNIFIED ACTION AGAINST COMMUNICABLE AND NON COMMUNICABLE DISEASES</p>
              <div className="mb-4">
                <span className="badge bg-light text-dark me-3"><i className="fas fa-calendar me-2"></i>3rd - 7th November, 2025</span>
                <span className="badge bg-light text-dark"><i className="fas fa-map-marker-alt me-2"></i>Speke Resort Munyonyo, Uganda</span>
              </div>
              <div className="d-flex flex-wrap justify-content-center gap-2">
                <a href="#contact" className="btn btn-primary-custom">Register Now</a>
                <a href="#contact" className="btn btn-outline-light">Submit Abstract</a>
                <a href="#contact" className="btn btn-warning">Payment Instructions</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="countdown-section">
        <div className="container countdown-container">
          <h3 className="countdown-title">Conference Starts In</h3>
          <div className="countdown-timer">
            <div className="countdown-item">
              <span className="countdown-number" id="days">68</span>
              <span className="countdown-label">Days</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number" id="hours">17</span>
              <span className="countdown-label">Hours</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number" id="minutes">52</span>
              <span className="countdown-label">Minutes</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-number" id="seconds">46</span>
              <span className="countdown-label">Seconds</span>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-5">
        <div className="container">
          <h2 className="section-title">About the Conference</h2>
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto">
              <p className="lead text-center">Join the Ministry of Health Uganda and leading healthcare professionals for five days of groundbreaking discussions on unified action against communicable and non-communicable diseases.</p>
              <div className="row mt-4">
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i>Research presentations & abstracts</li>
                    <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i>Policy implementation workshops</li>
                    <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i>International partnerships</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i>Networking opportunities</li>
                    <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i>Continuing education credits</li>
                    <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i>Exhibition & sponsors</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="speakers" className="py-5 bg-light">
        <div className="container">
          <h2 className="section-title">Featured Speakers</h2>
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-3">
              <div className="card card-custom speaker-card">
                <div className="speaker-avatar">
                  <i className="fas fa-user-md"></i>
                </div>
                <h6>Dr. Jane Aceng</h6>
                <p className="text-muted small mb-1">Minister of Health</p>
                <p className="small mb-0">Ministry of Health Uganda</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-3">
              <div className="card card-custom speaker-card">
                <div className="speaker-avatar">
                  <i className="fas fa-user-md"></i>
                </div>
                <h6>Prof. Henry Mwebesa</h6>
                <p className="text-muted small mb-1">Director General</p>
                <p className="small mb-0">Health Services Uganda</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-3">
              <div className="card card-custom speaker-card">
                <div className="speaker-avatar">
                  <i className="fas fa-user-md"></i>
                </div>
                <h6>Dr. Monica Musenero</h6>
                <p className="text-muted small mb-1">Senior Presidential Advisor</p>
                <p className="small mb-0">Epidemics & Public Health</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-3">
              <div className="card card-custom speaker-card">
                <div className="speaker-avatar">
                  <i className="fas fa-user-md"></i>
                </div>
                <h6>Dr. Daniel Kyabayinze</h6>
                <p className="text-muted small mb-1">Director</p>
                <p className="small mb-0">Public Health Emergency Operations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="agenda" className="py-5">
        <div className="container">
          <h2 className="section-title">Conference Agenda</h2>
          <div className="row">
            <div className="col-lg-4 mb-3">
              <h5 className="text-center mb-3">Day 1-2: Nov 3-4</h5>
              <div className="schedule-item">
                <span className="time-badge">Opening</span>
                <h6 className="mb-1">Conference Launch</h6>
                <p className="small text-muted mb-0">Keynote addresses & policy frameworks</p>
              </div>
              <div className="schedule-item">
                <span className="time-badge">Sessions</span>
                <h6 className="mb-1">Communicable Diseases</h6>
                <p className="small text-muted mb-0">HIV/AIDS, TB, Malaria prevention</p>
              </div>
            </div>
            <div className="col-lg-4 mb-3">
              <h5 className="text-center mb-3">Day 3-4: Nov 5-6</h5>
              <div className="schedule-item">
                <span className="time-badge">Focus</span>
                <h6 className="mb-1">Non-Communicable Diseases</h6>
                <p className="small text-muted mb-0">Diabetes, hypertension, cancer care</p>
              </div>
              <div className="schedule-item">
                <span className="time-badge">Workshops</span>
                <h6 className="mb-1">Implementation Strategies</h6>
                <p className="small text-muted mb-0">Community health & digital solutions</p>
              </div>
            </div>
            <div className="col-lg-4 mb-3">
              <h5 className="text-center mb-3">Day 5: Nov 7</h5>
              <div className="schedule-item">
                <span className="time-badge">Research</span>
                <h6 className="mb-1">Abstract Presentations</h6>
                <p className="small text-muted mb-0">Scientific research & innovations</p>
              </div>
              <div className="schedule-item">
                <span className="time-badge">Closing</span>
                <h6 className="mb-1">Action Plans & Awards</h6>
                <p className="small text-muted mb-0">Future directions & recognition</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-5 bg-light">
        <div className="container">
          <h2 className="section-title">Registration & Information</h2>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="contact-info">
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <h6><i className="fas fa-ticket-alt text-primary me-2"></i>Registration Fees</h6>
                    <p className="mb-1 small"><strong>International:</strong> $400</p>
                    <p className="mb-1 small"><strong>Regional:</strong> $200</p>
                    <p className="mb-2 small"><strong>Local/Student:</strong> UGX 150,000</p>
                    <a href="#" className="btn btn-primary-custom btn-sm">Register Now</a>
                  </div>
                  <div className="col-md-4 mb-3">
                    <h6><i className="fas fa-file-alt text-primary me-2"></i>Abstract Submission</h6>
                    <p className="mb-1 small"><strong>Deadline:</strong> October 15, 2025</p>
                    <p className="mb-2 small"><strong>Categories:</strong> Research, Case Studies, Innovations</p>
                    <a href="#" className="btn btn-outline-primary btn-sm">Submit Abstract</a>
                  </div>
                  <div className="col-md-4 mb-3">
                    <h6><i className="fas fa-envelope text-primary me-2"></i>Contact</h6>
                    <p className="mb-1 small"><i className="fas fa-phone me-1"></i>+256 414 340 874</p>
                    <p className="mb-1 small"><i className="fas fa-envelope me-1"></i>info@health.go.ug</p>
                    <p className="mb-2 small"><i className="fas fa-map-marker-alt me-1"></i>Ministry of Health Uganda</p>
                    <a href="#" className="btn btn-warning btn-sm text-dark">Payment Info</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default HomePage