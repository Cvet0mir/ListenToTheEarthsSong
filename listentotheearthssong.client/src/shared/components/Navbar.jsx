
import { Link } from "react-router-dom";

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
                                <Link className="nav-link text-dark" to="/">
                                    Home
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/gallery">
                                    Gallery
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/solutions">
                                    Solutions
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/game">
                                    Game
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/register">
                                    Register
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/login">
                                    Log in
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/logout">
                                    Log out
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
