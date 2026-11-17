import React, { useEffect } from 'react';

import "../shared/css/stylePrivacy.css";

const Privacy = () => {
    useEffect(() => {
        window.scrollTo(0, 0),
        []
    })

    return (
        <>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta
                name="description"
                content="Научете как „Осведоменост за шумовото замърсяване“ събира, използва и защитава лични данни."
            />
            <title>
                Политика за поверителност | Осведоменост за шумовото замърсяване
            </title>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
                rel="stylesheet"
            />
            <header className="policy-hero text-center">
                <div className="container">
                    <h1>Политика за поверителност</h1>
                    <p className="lead mb-1">
                        Как обработваме и защитаваме вашата лична информация
                    </p>
                    <p className="mb-0">
                        <strong>Последна актуализация:</strong> 10 ноември 2026 г.
                    </p>
                </div>
            </header>
            <main className="container policy-wrap">
                <div className="row g-4 align-items-start">
                    <aside
                        className="col-12 col-lg-4 col-xl-3"
                        aria-label="Съдържание на политиката"
                    >
                        <nav className="toc" aria-label="На тази страница">
                            <h2>На тази страница</h2>
                            <ol>
                                <li>
                                    <a href="#introduction">Въведение</a>
                                </li>
                                <li>
                                    <a href="#information-we-collect">Каква информация събираме</a>
                                </li>
                                <li>
                                    <a href="#how-we-use-information">
                                        Как използваме вашата информация
                                    </a>
                                </li>
                                <li>
                                    <a href="#legal-basis">Правно основание за обработване</a>
                                </li>
                                <li>
                                    <a href="#cookies">Бисквитки и локално съхранение</a>
                                </li>
                                <li>
                                    <a href="#childrens-privacy">Поверителност на децата</a>
                                </li>
                                <li>
                                    <a href="#security">Съхранение и сигурност на данните</a>
                                </li>
                                <li>
                                    <a href="#sharing">Споделяне на информация</a>
                                </li>
                                <li>
                                    <a href="#your-rights">Вашите права</a>
                                </li>
                                <li>
                                    <a href="#external-services">Външни услуги</a>
                                </li>
                                <li>
                                    <a href="#changes">Промени в тази политика</a>
                                </li>
                                <li>
                                    <a href="#contact">Свържете се с нас</a>
                                </li>
                            </ol>
                        </nav>
                    </aside>
                    <div className="col-12 col-lg-8 col-xl-9">
                        <article className="policy-card">
                            <section
                                className="policy-section"
                                id="introduction"
                                aria-labelledby="heading-introduction"
                            >
                                <h2 id="heading-introduction">1. Въведение</h2>
                                <p>
                                    Добре дошли в{" "}
                                    <strong>Осведоменост за шумовото замърсяване</strong>!
                                </p>
                                <p>
                                    Нашата мисия е да обучаваме хората за шумовото замърсяване,
                                    неговото въздействие върху околната среда и начините да създадем
                                    по-тих и по-здравословен свят.
                                </p>
                                <p>
                                    Уважаваме вашата поверителност и сме ангажирани със защитата на
                                    вашата лична информация в съответствие с Общия регламент относно
                                    защитата на данните (GDPR).
                                </p>
                                <p>
                                    Настоящата Политика за поверителност обяснява как събираме,
                                    използваме, съхраняваме и защитаваме информация, когато използвате
                                    нашия уебсайт.
                                </p>
                            </section>
                            <section
                                className="policy-section"
                                id="information-we-collect"
                                aria-labelledby="heading-information-we-collect"
                            >
                                <h2 id="heading-information-we-collect">
                                    2. Каква информация събираме
                                </h2>
                                <p>
                                    В зависимост от функциите, които използвате, можем да събираме
                                    следната информация:
                                </p>
                                <ul>
                                    <li>
                                        <strong>Информация за акаунта:</strong> Потребителско име, имейл
                                        адрес и сигурно съхранявани хешове на паролите, ако се
                                        регистрирате.
                                    </li>
                                    <li>
                                        <strong>Качено съдържание:</strong> Изображения или друга
                                        информация, която доброволно подавате.
                                    </li>
                                    <li>
                                        <strong>Техническа информация:</strong> IP адреси, информация за
                                        браузъра и основни сървърни логове, когато е необходимо.
                                    </li>
                                    <li>
                                        <strong>Информация за игрите:</strong> Резултати и напредък, ако
                                        тези функции се запазват във вашия акаунт.
                                    </li>
                                </ul>
                                <p>
                                    Можете да разглеждате нашето образователно съдържание, без да
                                    предоставяте информация за акаунт, когато е наличен достъп като
                                    гост.
                                </p>
                            </section>
                            <section
                                className="policy-section"
                                id="how-we-use-information"
                                aria-labelledby="heading-how-we-use-information"
                            >
                                <h2 id="heading-how-we-use-information">
                                    3. Как използваме вашата информация
                                </h2>
                                <p>
                                    Използваме вашата информация само за законосъобразни цели,
                                    включително:
                                </p>
                                <ul>
                                    <li>Създаване и управление на потребителски акаунти.</li>
                                    <li>Предоставяне на интерактивни и образователни функции.</li>
                                    <li>
                                        Показване на съдържание, доброволно подадено от потребители.
                                    </li>
                                    <li>Поддържане на сигурността и функционалността на уебсайта.</li>
                                    <li>Отговаряне на заявки, свързани с поверителността.</li>
                                </ul>
                                <p>Не продаваме вашата лична информация на рекламодатели.</p>
                            </section>
                            <section
                                className="policy-section"
                                id="legal-basis"
                                aria-labelledby="heading-legal-basis"
                            >
                                <h2 id="heading-legal-basis">4. Правно основание за обработване</h2>
                                <p>Когато е приложимо, обработваме лични данни въз основа на:</p>
                                <ul>
                                    <li>
                                        Вашето съгласие за допълнителни дейности, изискващи съгласие.
                                    </li>
                                    <li>
                                        Необходимостта да предоставяме услуги, свързани с акаунта, които
                                        сте поискали.
                                    </li>
                                    <li>
                                        Нашите законни интереси за поддържане на сигурността и
                                        надеждността на уебсайта, когато тези интереси не преобладават
                                        над вашите права.
                                    </li>
                                </ul>
                            </section>
                            <section
                                className="policy-section"
                                id="cookies"
                                aria-labelledby="heading-cookies"
                            >
                                <h2 id="heading-cookies">5. Бисквитки и локално съхранение</h2>
                                <p>
                                    Нашият уебсайт може да използва необходими бисквитки или
                                    съхранение в браузъра, за да поддържа сесиите за вход и основната
                                    функционалност.
                                </p>
                                <p>
                                    Ако въведем допълнителни технологии за анализ, реклама или
                                    проследяване, които изискват съгласие, ще поискаме това съгласие,
                                    преди да ги активираме.
                                </p>
                            </section>
                            <section
                                className="policy-section"
                                id="childrens-privacy"
                                aria-labelledby="heading-childrens-privacy"
                            >
                                <h2 id="heading-childrens-privacy">6. Поверителност на децата</h2>
                                <p>
                                    Нашият образователен уебсайт е създаден така, че да бъде достъпен
                                    за по-млада аудитория.
                                </p>
                                <p>
                                    Стремим се да събираме възможно най-малко лична информация от
                                    деца.
                                </p>
                                <p>
                                    Когато по закон се изисква съгласие от родител или настойник, ще
                                    го получим, преди да събираме или обработваме информацията на
                                    детето на основание съгласие.
                                </p>
                                <p>
                                    Насърчаваме децата да питат родител или настойник, преди да
                                    създадат акаунт или да качат съдържание.
                                </p>
                            </section>
                            <section
                                className="policy-section"
                                id="security"
                                aria-labelledby="heading-security"
                            >
                                <h2 id="heading-security">7. Съхранение и сигурност на данните</h2>
                                <p>
                                    Предприемаме разумни технически и организационни мерки за защита
                                    на личната информация, включително защитени връзки, ограничен
                                    достъп и подходящи практики за сигурност на акаунтите.
                                </p>
                                <p>
                                    Личната информация се съхранява само толкова дълго, колкото е
                                    необходимо за целите, описани в тази политика, при спазване на
                                    приложимите законови изисквания.
                                </p>
                            </section>
                            <section
                                className="policy-section"
                                id="sharing"
                                aria-labelledby="heading-sharing"
                            >
                                <h2 id="heading-sharing">8. Споделяне на информация</h2>
                                <p>Не продаваме лични данни.</p>
                                <p>
                                    Информацията може да бъде обработвана от доставчици на хостинг,
                                    бази данни, съхранение или други услуги, необходими за
                                    функционирането на уебсайта.
                                </p>
                                <p>
                                    Качено съдържание се публикува публично само когато съответната
                                    функция ясно показва, че то ще бъде публикувано.
                                </p>
                            </section>
                            <section
                                className="policy-section"
                                id="your-rights"
                                aria-labelledby="heading-your-rights"
                            >
                                <h2 id="heading-your-rights">9. Вашите права</h2>
                                <p>Съгласно GDPR може да имате право да:</p>
                                <ul>
                                    <li>Получите достъп до вашите лични данни.</li>
                                    <li>Поискате корекция на неточна информация.</li>
                                    <li>Поискате изтриване на вашите лични данни.</li>
                                    <li>
                                        Ограничите или възразите срещу определени дейности по
                                        обработване.
                                    </li>
                                    <li>Поискате преносимост на данните, когато е приложимо.</li>
                                    <li>Оттеглите съгласието си по всяко време.</li>
                                    <li>Подадете жалба до съответния орган за защита на данните.</li>
                                </ul>
                                <p>Можете да се свържете с нас, за да упражните тези права.</p>
                            </section>
                            <section
                                className="policy-section"
                                id="external-services"
                                aria-labelledby="heading-external-services"
                            >
                                <h2 id="heading-external-services">10. Външни услуги</h2>
                                <p>
                                    Нашият уебсайт може да използва услуги на трети страни, като
                                    доставчици на интерактивни карти, хостинг платформи или вградени
                                    образователни ресурси.
                                </p>
                                <p>
                                    Тези услуги може да обработват информация съгласно собствените си
                                    политики за поверителност. Ще посочим съответните доставчици и ще
                                    обясним ролята им, когато това се изисква.
                                </p>
                            </section>
                            <section
                                className="policy-section"
                                id="changes"
                                aria-labelledby="heading-changes"
                            >
                                <h2 id="heading-changes">11. Промени в тази политика</h2>
                                <p>
                                    Можем да актуализираме тази Политика за поверителност, когато се
                                    променят нашият уебсайт, функциите му или правните ни задължения.
                                </p>
                                <p>Най-новата версия ще бъде достъпна на тази страница.</p>
                            </section>
                            <section
                                className="policy-section"
                                id="contact"
                                aria-labelledby="heading-contact"
                            >
                                <h2 id="heading-contact">12. Свържете се с нас</h2>
                                <p>
                                    Ако имате въпроси относно тази Политика за поверителност или
                                    обработването на вашите лични данни, моля, свържете се с:
                                </p>
                                <div className="contact-details">
                                    <p className="mb-2">
                                        <strong>Проект:</strong> Осведоменост за шумовото замърсяване
                                    </p>
                                    <p className="mb-2">
                                        <strong>Администратор на данни:</strong> Цветомир Смилов
                                    </p>
                                    <p className="mb-2">
                                        <strong>Имейл:</strong> jp0429199@gmail.com
                                    </p>
                                    <p className="mb-0">
                                        <strong>Местоположение:</strong> България
                                    </p>
                                </div>
                            </section>
                        </article>
                    </div>
                </div>
            </main>
            <footer>
                <p>
                    🌿 Осведоменост за шумовото замърсяване — Заедно за по-тих и
                    по-здравословен свят.
                </p>
            </footer>
        </>

    );
};

export default Privacy;