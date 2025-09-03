import React from 'react'
import logo from './logo.png';

const Header = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-custom fixed-top">
            <div class="container">
                <a class="navbar-brand d-flex align-items-center" href="#home">
                    <img src={logo} width={50} alt="Uganda Coat of Arms" class="uganda-logo"/>
                    NACNDC & JASH 2025
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item"><a class="nav-link" href="#home">Home</a></li>
                        <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
                        <li class="nav-item"><a class="nav-link" href="#speakers">Speakers</a></li>
                        <li class="nav-item"><a class="nav-link" href="#agenda">Agenda</a></li>
                        <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
                    </ul>
                    <div class="d-flex ms-3">
                        <a href="#contact" class="btn btn-outline-primary btn-sm me-2">Submit Abstract</a>
                        <a href="#contact" class="btn btn-primary-custom btn-sm">Register Now</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header