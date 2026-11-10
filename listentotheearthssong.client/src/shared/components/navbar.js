
import React from "react";

function Navbar() {
    return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-light bg-white border-bottom shadow-sm mb-3">
                <div className="container-fluid">

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav flex-grow-1">

                            <li className="nav-item">
                                <a className="nav-link text-dark" href="/">
                                    Home
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link text-dark" href="/gallery">
                                    Gallery
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link text-dark" href="/register">
                                    Register
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link text-dark" href="/solutions">
                                    Solutions
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link text-dark" href="/game">
                                    Game
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link text-dark" href="/login">
                                    Log in
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link text-dark" href="/logout">
                                    Log out
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
