
import NoiseChart from "../visualizations/pages/NoiseChart";
import NoisePollution from "../visualizations/pages/NoisePollution";

import ".././shared/css/styleHome.css";

function Home() {
    return (
        <>
            {/* Hero */}
            <header className="hero">
                <div className="container">
                    <h1>
                        Запази тишина,<br />
                        послушай песента на Земята!
                    </h1>

                    <p>
                        Открий как шумовото замърсяване влияе
                        на хората, животните и природата,
                        и как заедно можем да го намалим.
                    </p>

                    <a href="#information" className="hero-btn">
                        Научи повече
                    </a>
                </div>
            </header>

            <main>

                {/* Introduction */}
                <section className="section">
                    <div className="container">

                        <article id="introduction">
                            <h2 className="section-title">
                                Защо тишината е важна?
                            </h2>

                            <p>
                                Шумовото замърсяване е невидим
                                проблем, който засяга здравето ни,
                                природата и качеството ни на живот.
                            </p>

                            <p>
                                Целта на нашия уебсайт е да покажем
                                какво представлява шумовото
                                замърсяване, откъде идва,
                                какви са последствията от него
                                и най-важното — как можем
                                да го намалим.
                            </p>

                            <p>
                                Информацията е представена
                                на достъпен език, подходящ
                                както за ученици,
                                така и за възрастни.
                            </p>
                        </article>

                    </div>
                </section>

                {/* Problem and History */}
                <section
                    className="section pt-0"
                    id="information"
                >
                    <div className="container">

                        <h2 className="section-title">
                            Информация за проблема
                        </h2>

                        <div className="row g-4">

                            {/* Problem */}
                            <div className="col-12 col-lg-6">
                                <article
                                    className="info-card"
                                    id="problems"
                                >
                                    <h3>
                                        Какво е шумово замърсяване?
                                    </h3>

                                    <p>
                                        Шумовото замърсяване представлява
                                        наличието на нежелани, прекомерни
                                        или вредни звуци в околната среда,
                                        които нарушават спокойствието
                                        на хората и могат да повлияят
                                        отрицателно върху здравето
                                        и природата.
                                    </p>

                                    <p>
                                        За разлика от замърсяването
                                        на въздуха и водата, шумовото
                                        замърсяване не може да бъде
                                        видяно. Въпреки това то е част
                                        от ежедневието ни — по улиците,
                                        в училище, на работното място
                                        и дори у дома.
                                    </p>

                                    <div className="fact">
                                        <strong>Знаете ли, че?</strong>

                                        <p className="mb-0 mt-2">
                                            Дори шумът, който не ни се
                                            струва особено силен,
                                            може да бъде вреден,
                                            когато продължава дълго
                                            време или нарушава съня ни.
                                        </p>
                                    </div>
                                </article>
                            </div>

                            {/* History */}
                            <div className="col-12 col-lg-6">
                                <article
                                    className="info-card"
                                    id="history"
                                >
                                    <h3>
                                        История на проблема
                                    </h3>

                                    <p>
                                        Шумовото замърсяване не е
                                        проблем само на съвременния
                                        свят. Още в Древен Рим хората
                                        се оплаквали от шума на
                                        каруците, животните и
                                        оживените улици.
                                    </p>

                                    <p>
                                        С настъпването на
                                        Индустриалната революция
                                        през XVIII и XIX век проблемът
                                        се задълбочил заради появата
                                        на фабриките, парните машини
                                        и железопътния транспорт.
                                    </p>

                                    <p>
                                        През XX век развитието на
                                        автомобилния и въздушния
                                        транспорт превърнало шума
                                        в сериозен проблем за
                                        големите градове.
                                    </p>

                                    <p>
                                        Днес шумовото замърсяване
                                        е признато за значим
                                        екологичен проблем.
                                        Европейският съюз и
                                        Световната здравна организация
                                        разработват политики и
                                        препоръки за ограничаването му.
                                    </p>
                                </article>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Noise Statistics */}
                <section className="section" id="charts">
                    <div className="container">

                        <h2 className="section-title">
                            Шумът в числа
                        </h2>

                        <p className="text-center mb-5">
                            Разгледай диаграмата и научи повече
                            за развитието на наблюдението
                            на шумовото замърсяване в България.
                        </p>

                        <div className="row g-4 justify-content-center">

                            <div className="col-12 col-lg-10">
                                <div className="chart-card">

                                    <h3>
                                        Брой пунктове за мониторинг
                                        на шума в България
                                    </h3>

                                    <p>
                                        Проследи как се е променял
                                        броят на пунктовете за
                                        мониторинг през годините
                                        от 2000 до 2024.
                                    </p>

                                    <div
                                        className="chart-container"
                                        role="img"
                                        aria-label="Линейна диаграма за броя на пунктовете за мониторинг на шума в България"
                                    >
                                        <NoiseChart />
                                    </div>

                                    <small className="text-muted">
                                        Източник: Национален
                                        статистически институт.
                                        Данните представят броя
                                        на мониторинговите пунктове,
                                        а не измерените нива в dB.
                                    </small>

                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Interactive Noise Map */}
                <section
                    className="section map-section"
                    id="noise-map"
                >
                    <div className="container">

                        <h2 className="section-title">
                            Интерактивна карта на шума
                        </h2>

                        <div className="row g-4 align-items-stretch">

                            {/* Map information */}
                            <div className="col-12 col-lg-4">
                                <div className="map-info">

                                    <h3>
                                        Какво показва картата?
                                    </h3>

                                    <p>
                                        Картата представя информация
                                        за нивата на шум в различни
                                        райони на София.
                                    </p>

                                    <p>
                                        Чрез нея можеш да разгледаш
                                        къде шумовото замърсяване
                                        е по-силно и кои места
                                        са по-тихи.
                                    </p>

                                    <div id="what-you-see">
                                        <h4 className="h6">
                                            Как да използваш картата?
                                        </h4>

                                        <p>
                                            Избери година от менюто,
                                            след което приближавай
                                            и премествай картата,
                                            за да разглеждаш различни
                                            райони.
                                        </p>
                                    </div>

                                </div>
                            </div>

                            {/* Leaflet Map */}
                            <div className="col-12 col-lg-8">
                                <div
                                    className="map-container"
                                    aria-label="Интерактивна карта на шумовото замърсяване в София"
                                >
                                    <NoisePollution />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section" id="solutions">
                    <div className="container">

                        <h2 className="section-title">
                            Как можем да намалим шума?
                        </h2>

                        <div className="row g-4">

                            <div className="col-12 col-md-4">
                                <div className="solution-card">
                                    <h3>🌳 Повече зелени площи</h3>

                                    <p>
                                        Дърветата и зелените площи
                                        могат да допринесат за
                                        по-приятна и тиха
                                        градска среда.
                                    </p>
                                </div>
                            </div>

                            <div className="col-12 col-md-4">
                                <div className="solution-card">
                                    <h3>🚲 По-тих транспорт</h3>

                                    <p>
                                        Използването на велосипеди,
                                        обществения транспорт
                                        и ходенето пеша могат
                                        да намалят шума от трафика.
                                    </p>
                                </div>
                            </div>

                            <div className="col-12 col-md-4">
                                <div className="solution-card">
                                    <h3>🔇 Отговорно поведение</h3>

                                    <p>
                                        Намаляването на силната музика
                                        и ненужния шум помага
                                        да създадем по-спокойна среда.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

            </main>
        </>
    );
}

export default Home;
