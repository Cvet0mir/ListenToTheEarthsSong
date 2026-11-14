
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

import "../shared/css/styleSoundwaves.css";

const recordings = [
    {
        id: 1,
        title: "Песента на птиците",
        description: "Чуй красивите звуци на птиците, които изпълват гората.",
        category: "nature",
        categoryLabel: "Природа",
        location: "Гора",
        duration: "Примерен запис",
        audio: "/audio/birds.mp3",
    },
    {
        id: 2,
        title: "Шумът на големия град",
        description: "Звуците на автомобилите и забързаното ежедневие.",
        category: "noise",
        categoryLabel: "Шумна среда",
        location: "Градска улица",
        duration: "Примерен запис",
        audio: "/audio/city.mp3",
    },
    {
        id: 3,
        title: "Спокойствието на гората",
        description: "Естествената звукова среда на една спокойна гора.",
        category: "nature",
        categoryLabel: "Природа",
        location: "Гора",
        duration: "Примерен запис",
        audio: "/audio/forest.mp3",
    },
    {
        id: 4,
        title: "Течението на реката",
        description: "Отпусни се с приятния звук на течащата вода.",
        category: "quiet",
        categoryLabel: "Тиха среда",
        location: "Река",
        duration: "Примерен запис",
        audio: "/audio/river.mp3",
    },
];

const categories = [
    { value: "all", label: "Всички" },
    { value: "nature", label: "🌳 Природа" },
    { value: "noise", label: "🏙️ Шумни места" },
    { value: "quiet", label: "🍃 Тихи места" },
];

function WaveformPlayer({ audio, title }) {
    const containerRef = useRef(null);
    const waveSurferRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState("0:00");
    const [duration, setDuration] = useState("0:00");
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        if (!containerRef.current) return;

        const waveSurfer = WaveSurfer.create({
            container: containerRef.current,
            waveColor: "#b8d9c1",
            progressColor: "#23836b",
            cursorColor: "#164b3c",
            barWidth: 3,
            barGap: 2,
            barRadius: 3,
            height: 75,
            normalize: true,
            backend: "MediaElement",
        });

        waveSurferRef.current = waveSurfer;

        waveSurfer.load(audio);

        waveSurfer.on("ready", () => {
            setDuration(formatTime(waveSurfer.getDuration()));
            setLoadError(false);
        });

        waveSurfer.on("timeupdate", (time) => {
            setCurrentTime(formatTime(time));
        });

        waveSurfer.on("play", () => setIsPlaying(true));
        waveSurfer.on("pause", () => setIsPlaying(false));
        waveSurfer.on("finish", () => setIsPlaying(false));

        waveSurfer.on("error", () => {
            setLoadError(true);
        });

        return () => {
            waveSurfer.destroy();
            waveSurferRef.current = null;
        };
    }, [audio]);

    function formatTime(seconds) {
        if (!Number.isFinite(seconds)) return "0:00";

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
    }

    function togglePlayback() {
        waveSurferRef.current?.playPause();
    }

    return (
        <div className="waveform-player">
            <div className="waveform-container" ref={containerRef} />

            {loadError ? (
                <p className="audio-error">
                    Записът не може да бъде зареден.
                </p>
            ) : (
                <div className="waveform-controls">
                    <button
                        type="button"
                        className="wave-play-button"
                        onClick={togglePlayback}
                        aria-label={isPlaying ? `Пауза: ${title}` : `Пусни: ${title}`}
                    >
                        {isPlaying ? "Ⅱ" : "▶"}
                    </button>

                    <div className="wave-time">
                        <span>{currentTime}</span>
                        <span>{duration}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

function RecordingCard({ recording }) {
    return (
        <div className="col-12 col-md-6 col-lg-4 recording-item">
            <article className="recording-card">
                <div className="recording-card-body">
                    <span className={`category-badge ${recording.category}`}>
                        {recording.categoryLabel}
                    </span>

                    <h3 className="card-title mt-3">
                        {recording.title}
                    </h3>

                    <p className="card-description">
                        {recording.description}
                    </p>

                    <WaveformPlayer
                        audio={recording.audio}
                        title={recording.title}
                    />

                    <div className="recording-meta">
                        <span>📍 {recording.location}</span>
                        <span>🎧 MP3</span>
                    </div>
                </div>
            </article>
        </div>
    );
}

export default function Soundwaves() {
    const [activeFilter, setActiveFilter] = useState("all");

    const visibleRecordings = recordings.filter(
        (recording) =>
            activeFilter === "all" ||
            recording.category === activeFilter
    );

    return (
        <>
            <header className="hero text-center">
                <div
                    className="container position-relative"
                    style={{ zIndex: 1 }}
                >
                    <div className="mb-3" aria-hidden="true"
                        style={{ fontSize: "2rem" }}>
                        🎧 🌳
                    </div>

                    <h1 className="mb-3">
                        Звуците на природата
                    </h1>

                    <p>
                        Затвори очи и се заслушай в света около теб.
                        Открий разликата между спокойствието на природата
                        и шума на градската среда.
                    </p>
                </div>
            </header>

            <main>
                <section
                    className="soundwaves-section"
                    id="recordings"
                    aria-labelledby="recordingsHeading"
                >
                    <div className="container">

                        <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-4">
                            <div>
                                <h2
                                    className="section-heading mb-1"
                                    id="recordingsHeading"
                                >
                                    Нашите записи
                                </h2>

                                <p className="text-secondary mb-0">
                                    Разгледай и прослушай различни звукови
                                    среди.
                                </p>
                            </div>

                            <span className="text-secondary small">
                                {visibleRecordings.length} записа
                            </span>
                        </div>

                        <div
                            className="d-flex gap-2 flex-wrap mb-4"
                            role="group"
                            aria-label="Филтър по категория"
                        >
                            {categories.map((category) => (
                                <button
                                    key={category.value}
                                    type="button"
                                    className={`category-filter ${activeFilter === category.value
                                            ? "active"
                                            : ""
                                        }`}
                                    aria-pressed={
                                        activeFilter === category.value
                                    }
                                    onClick={() =>
                                        setActiveFilter(category.value)
                                    }
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>

                        <div className="row g-4">
                            {visibleRecordings.map((recording) => (
                                <RecordingCard
                                    key={recording.id}
                                    recording={recording}
                                />
                            ))}
                        </div>

                        {visibleRecordings.length === 0 && (
                            <div className="empty-state mt-4">
                                Няма записи в тази категория.
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}
