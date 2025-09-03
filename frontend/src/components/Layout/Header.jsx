import React from 'react'
import logo from './logo.png';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-custom fixed-top">
            <div className="container">
                <a className="navbar-brand d-flex align-items-center" href="#home">
                    <img src={logo} width={50} alt="Uganda Coat of Arms" className="uganda-logo" />
                    NACNDC & JASH 2025
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className={`nav-link ${isActive('/') ? 'active' : ''}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
                        <li className="nav-item"><a className="nav-link" href="#speakers">Speakers</a></li>
                        <li className="nav-item"><a className="nav-link" href="#agenda">Agenda</a></li>
                        <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
                    </ul>
                    <div className="d-flex ms-3">
                        <a href="#contact" className="btn btn-outline-primary btn-sm me-2">Submit Abstract</a>
                        <Link to="/registration" className="btn btn-primary-custom btn-sm me-2">Register Now</Link>
                        <Link to="/admin" className="btn btn-outline-secondary btn-sm">
                            <i className="fas fa-cogs"></i> Admin
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header