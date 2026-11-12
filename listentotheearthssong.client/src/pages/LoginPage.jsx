
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../shared/css/styleLogin.css";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [serverMessage, setServerMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerMessage("");

        const email = formData.email.trim();

        if (!email || !formData.password) {
            setServerMessage("Моля, попълни всички полета.");
            return;
        }

        try {
            setIsLoading(true);

            const params = new URLSearchParams();
            params.append("email", email);
            params.append("password", formData.password);

            const response = await fetch("/User/AuthenticateUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: params.toString()
            });

            const result = await response.text();

            console.log("Login status:", response.status);
            console.log("Login response:", result);

            if (!response.ok) {
                throw new Error(
                    response.status === 401
                        ? "Невалиден имейл адрес или парола."
                        : result || "Възникна грешка при влизането."
                );
            }

            alert("Успешно влизане! Добре дошъл отново в ЕкоТишина!");
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            setServerMessage(
                error.message || "Възникна грешка при влизането."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="login-layout">
            <section className="story-panel" aria-labelledby="story-title">
                <div className="eyebrow">
                    <span></span>
                    Природата има глас
                </div>

                <h2 className="story-title" id="story-title">
                    Добре дошъл <em>отново.</em>
                </h2>

                <p className="story-copy">
                    Твоята общност те очаква. Разгледай снимките,
                    открий по-тихи места и продължи да споделяш
                    песента на Земята.
                </p>

                <svg
                    className="waves"
                    viewBox="0 0 540 130"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="M0 65 C22 65 22 15 45 15 S68 115 90 115 113 45 135 45 158 90 180 90 203 30 225 30 248 110 270 110 293 54 315 54 338 80 360 80 383 22 405 22 428 105 450 105 473 65 495 65 518 65 540 65"
                        stroke="#bce5c7"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />

                    <path
                        d="M0 65 C22 65 22 44 45 44 S68 86 90 86 113 56 135 56 158 72 180 72 203 48 225 48 248 82 270 82 293 59 315 59 338 70 360 70 383 45 405 45 428 86 450 86 473 65 495 65 518 65 540 65"
                        stroke="#70caa0"
                        strokeOpacity=".45"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>

                <div className="story-foot">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                    >
                        <path
                            d="m4 12 5 5L20 6"
                            stroke="#bce5c7"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    Заедно създаваме по-тих и зелен свят.
                </div>
            </section>

            <section className="form-panel" aria-labelledby="login-title">
                <div className="form-wrap">
                    <Link className="mobile-brand" to="/">
                        🌿 ЕкоТишина
                    </Link>

                    <div className="overline">
                        Радваме се да те видим
                    </div>

                    <h1 id="login-title">Влез в профила си</h1>

                    <p className="lead-copy">
                        Продължи пътешествието си към един по-тих свят.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="field-label" htmlFor="email">
                                Имейл адрес
                            </label>

                            <div className="field">
                                <svg
                                    className="field-icon"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    aria-hidden="true"
                                >
                                    <rect
                                        x="3"
                                        y="5"
                                        width="18"
                                        height="14"
                                        rx="2"
                                    />
                                    <path d="m3 7 9 6 9-6" />
                                </svg>

                                <input
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    maxLength="254"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-2">
                            <label className="field-label" htmlFor="password">
                                Парола
                            </label>

                            <div className="field field-password">
                                <svg
                                    className="field-icon"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    aria-hidden="true"
                                >
                                    <rect
                                        x="5"
                                        y="10"
                                        width="14"
                                        height="11"
                                        rx="2"
                                    />
                                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                                </svg>

                                <input
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    placeholder="Въведи паролата си"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />

                                <button
                                    className="toggle-password"
                                    type="button"
                                    onClick={() =>
                                        setShowPassword((previous) => !previous)
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Скрий паролата"
                                            : "Покажи паролата"
                                    }
                                    aria-pressed={showPassword}
                                >
                                    <svg
                                        width="21"
                                        height="21"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {serverMessage && (
                            <div className="login-error" role="alert">
                                {serverMessage}
                            </div>
                        )}

                        <button
                            className="submit-btn"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Влизане..." : "Влез в профила си"}
                            <span aria-hidden="true">→</span>
                        </button>

                        <p className="register-copy">
                            Все още нямаш профил?{" "}
                            <Link to="/register">Регистрирай се</Link>
                        </p>

                        <p className="privacy-copy">
                            Научи повече за защитата на данните в нашата{" "}
                            <Link to="/privacy">
                                Политика за поверителност
                            </Link>
                            .
                        </p>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default Login;
