
import { useState } from "react";
import { Link } from "react-router-dom";

import useAuth from "../../app/useAuth";

import "../css/styleHome.css";
import "../css/styleLogoutModal.css";

function Navbar() {
    const { user, loading } = useAuth();

    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [logoutError, setLogoutError] = useState("");

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            setLogoutError("");

            const response = await fetch("/User/Logout", {
                method: "POST",
                credentials: "same-origin"
            });

            if (!response.ok) {
                throw new Error("Възникна грешка при излизането.");
            }

            setShowLogoutModal(false);

            window.dispatchEvent(new Event("auth-changed"));

        } catch (error) {
            console.error("Logout error:", error);
            setLogoutError(error.message);
        } finally {
            setIsLoggingOut(false);
        }
    };

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
                                    Начало
                                </Link>
                            </li>

                            {!loading && user && (
                                <li className="nav-item">
                                    <Link className="nav-link text-dark" to="/game">
                                        Игра
                                    </Link>
                                </li>
                            )}

                            {!loading && user && (
                                <li className="nav-item">
                                    <Link className="nav-link text-dark" to="/gallery">
                                        Галерия
                                    </Link>
                                </li>
                            )}

                            {!loading && !user && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link text-dark" to="/register">
                                            Регистрация
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link text-dark" to="/login">
                                            Влез
                                        </Link>
                                    </li>
                                </>
                            )}

                            {!loading && user && (
                                <li className="nav-item"
                                    style={{backgroundColor: 'red'}}
                                >
                                    <button
                                        type="button"
                                        className="nav-link text-dark logout-nav-btn"
                                        onClick={() => {
                                            setLogoutError("");
                                            setShowLogoutModal(true);
                                        }}
                                    >
                                        Излез
                                    </button>
                                </li>
                            )}

                        </ul>
                    </div>
                </div>
            </nav>

            {showLogoutModal && (
                <div
                    className="logout-modal-overlay"
                    onClick={() => {
                        if (!isLoggingOut) {
                            setShowLogoutModal(false);
                        }
                    }}
                >
                    <div
                        className="logout-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="logout-modal-title"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="logout-modal-icon">
                            <span>🌿</span>
                        </div>

                        <h2 id="logout-modal-title">
                            Изход от профила
                        </h2>

                        <p>
                            Сигурни ли сте, че искате да излезете
                            от своя профил?
                        </p>

                        {logoutError && (
                            <div className="logout-error" role="alert">
                                {logoutError}
                            </div>
                        )}

                        <div className="logout-modal-actions">
                            <button
                                type="button"
                                className="logout-cancel-btn"
                                onClick={() => setShowLogoutModal(false)}
                                disabled={isLoggingOut}
                            >
                                Отказ
                            </button>

                            <button
                                type="button"
                                className="logout-confirm-btn"
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                            >
                                {isLoggingOut ? "Излизане..." : "Изход"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </header>
    );
}

export default Navbar;
