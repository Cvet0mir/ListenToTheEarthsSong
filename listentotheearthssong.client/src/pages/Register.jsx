
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../shared/css/styleRegister.css";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [serverMessage, setServerMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (formData.username.trim().length < 3) {
            newErrors.username =
                "Потребителското име трябва да съдържа поне 3 символа.";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Въведи валиден имейл адрес.";
        }

        if (formData.password.length < 8) {
            newErrors.password =
                "Паролата трябва да съдържа поне 8 символа.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerMessage("");

        if (!validateForm()) return;
        setIsSubmitting(true);

        try {
            const params = new URLSearchParams();

            params.append("username", formData.username.trim());
            params.append("email", formData.email.trim());
            params.append("password", formData.password);

            const response = await fetch("/User/CreateUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: params.toString()
            });

            const result = await response.text();

            if (!response.ok) {
                throw new Error(
                    result || "Възникна грешка при регистрацията."
                );
            }

            alert("Регистрацията беше успешна! Добре дошъл в ЕкоТишина! Сега можеш да влезеш в новия си профил.");
            navigate("/login");

        } catch (error) {
            setServerMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="register-layout">
            <section className="story-panel" aria-labelledby="story-title">

                <div className="eyebrow">
                    <span></span>
                    Природата има глас
                </div>

                <h2 className="story-title" id="story-title">
                    Стани част от <em>по-тихия свят.</em>
                </h2>

                <p className="story-copy">
                    Присъедини се към общността на ЕкоТишина.
                    Споделяй снимки, откривай нови места и помогни
                    на повече хора да чуят песента на Земята.
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

                    Малките действия правят голяма промяна.

                </div>

            </section>


            <section className="form-panel" aria-labelledby="register-title">

                <div className="form-wrap">

                    <a className="mobile-brand" href="/">
                        🌿 ЕкоТишина
                    </a>

                    <div className="overline">
                        Добре дошъл при нас
                    </div>

                    <h1 id="register-title">
                        Създай своя профил
                    </h1>

                    <p className="lead-copy">
                        Само три полета те делят от нашата общност.
                    </p>


                    <form onSubmit={handleSubmit} noValidate>

                        <div className="mb-3">

                            <label className="field-label" htmlFor="username">
                                Потребителско име
                            </label>

                            <div className="field">

                                <input
                                    className={`form-control ${errors.username ? "is-invalid" : ""}`}
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    maxLength="50"
                                    minLength="3"
                                    placeholder="Например: ecoExplorer"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />

                                {errors.username && (
                                    <div className="invalid-feedback">
                                        {errors.username}
                                    </div>
                                )}

                            </div>

                        </div>


                        <div className="mb-3">

                            <label className="field-label" htmlFor="email">
                                Имейл адрес
                            </label>

                            <div className="field">


                                <input
                                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
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

                                {errors.email && (
                                    <div className="invalid-feedback">
                                        {errors.email}
                                    </div>
                                )}

                            </div>

                        </div>


                        <div className="mb-2">

                            <label className="field-label" htmlFor="password">
                                Парола
                            </label>

                            <div className="field field-password">

                                <input
                                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    minLength="8"
                                    placeholder="Създай сигурна парола"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />

                                <button
                                    className="toggle-password"
                                    type="button"
                                    onClick={() => setShowPassword(prev => !prev)}
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

                                {errors.password && (
                                    <div className="invalid-feedback">
                                        {errors.password}
                                    </div>
                                )}

                            </div>

                            <div className="helper">
                                Използвай поне 8 символа. Препоръчваме
                                дълга, уникална парола.
                            </div>

                        </div>

                        {serverMessage && (
                            <div
                                className="alert alert-danger"
                                role="alert"
                            >
                                {serverMessage}
                            </div>
                        )}


                        <button
                            className="submit-btn"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? "Регистрация..."
                                : "Създай профил"}

                            <span aria-hidden="true">→</span>
                        </button>


                        <p className="login-copy">
                            Вече имаш профил?{" "}
                            <a href="/login">Влез тук</a>
                        </p>


                        <p className="privacy-copy">
                            С регистрацията приемаш условията на сайта
                            и се запознаваш с нашата{" "}
                            <a href="/privacy">
                                Политика за поверителност
                            </a>.
                        </p>

                    </form>

                </div>

            </section>

        </main>
    );
};

export default Register;
