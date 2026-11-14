import { useCallback, useEffect, useMemo, useState } from "react";
import "../shared/css/styleGame.css";

const WIDTH = 12;
const HEIGHT = 9;
const ROAD_COLUMNS = [2, 6, 9];
const ROAD_ROWS = [2, 5, 7];
const START = { x: 0, y: 2 };

const PROBLEMS = [
    { id: "traffic", x: 2, y: 2, icon: "🚗", name: "Шумен трафик", action: "Насърчи използването на велосипеди и обществен транспорт.", solution: "🚲" },
    { id: "building", x: 6, y: 2, icon: "🚧", name: "Строителен шум", action: "Ограничи шумните строителни дейности до дневните часове.", solution: "🏗️" },
    { id: "music", x: 9, y: 5, icon: "🔊", name: "Силна музика", action: "Намали звука, за да не пречиш на съседите.", solution: "🎵" },
    { id: "factory", x: 2, y: 7, icon: "🏭", name: "Шумна фабрика", action: "Постави шумоизолиращи прегради около машините.", solution: "🌳" },
    { id: "mower", x: 6, y: 7, icon: "🚜", name: "Шумна косачка", action: "Използвай по-тиха електрическа косачка.", solution: "🌱" },
];

const SCENERY = ["🏠", "🌳", "🏡", "🌲", "🏫", "🌼", "🏢", "🌳", "🏘️", "🌻", "🌲", "🏠", "🌳", "🌷", "🏡", "🌲"];
const isRoad = (x, y) => ROAD_COLUMNS.includes(x) || ROAD_ROWS.includes(y);

function Game() {
    const [player, setPlayer] = useState(START);
    const [solved, setSolved] = useState([]);
    const [message, setMessage] = useState("Намери всички 5 източника на шум!");

    const currentProblem = PROBLEMS.find(
        (problem) => problem.x === player.x && problem.y === player.y && !solved.includes(problem.id)
    );
    const completed = solved.length === PROBLEMS.length;

    const move = useCallback((dx, dy) => {
        setPlayer((previous) => {
            const x = previous.x + dx;
            const y = previous.y + dy;
            if (x < 0 || y < 0 || x >= WIDTH || y >= HEIGHT || !isRoad(x, y)) return previous;
            return { x, y };
        });
    }, []);

    const solve = useCallback(() => {
        const problem = PROBLEMS.find(
            (item) => item.x === player.x && item.y === player.y && !solved.includes(item.id)
        );
        if (!problem) return;
        setSolved((previous) => [...previous, problem.id]);
        setMessage(`✅ ${problem.action}`);
    }, [player, solved]);

    useEffect(() => {
        const onKeyDown = (event) => {
            const key = event.key.toLowerCase();
            const controls = {
                arrowup: [0, -1], w: [0, -1],
                arrowdown: [0, 1], s: [0, 1],
                arrowleft: [-1, 0], a: [-1, 0],
                arrowright: [1, 0], d: [1, 0],
            };
            if (controls[key]) {
                event.preventDefault();
                move(...controls[key]);
            } else if (event.code === "Space" || key === "enter") {
                if (event.target instanceof HTMLElement && ["BUTTON", "INPUT", "TEXTAREA"].includes(event.target.tagName)) return;
                event.preventDefault();
                solve();
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [move, solve]);

    const tiles = useMemo(() => Array.from({ length: WIDTH * HEIGHT }, (_, index) => {
        const x = index % WIDTH;
        const y = Math.floor(index / WIDTH);
        const road = isRoad(x, y);
        const problem = PROBLEMS.find((item) => item.x === x && item.y === y);
        return { x, y, road, problem, scenery: SCENERY[(x * 7 + y * 11) % SCENERY.length] };
    }), []);

    const restart = () => {
        setPlayer(START);
        setSolved([]);
        setMessage("Намери всички 5 източника на шум!");
    };

    return (
        <section className="eco-game">
            <div className="eco-game__intro">
                <div>
                    <h1>🌍 Спаси града от шума!</h1>
                    <p>Разходи се по улиците и помогни на града да стане по-тих.</p>
                </div>
                <div className="eco-game__score" aria-live="polite">🔇 Решени проблеми: <strong>{solved.length} / {PROBLEMS.length}</strong></div>
            </div>

            <div className="eco-game__board" role="img" aria-label="Градска карта с улици и пет източника на шум">
                {tiles.map((tile) => {
                    const active = tile.problem && !solved.includes(tile.problem.id);
                    const characterHere = player.x === tile.x && player.y === tile.y;
                    return (
                        <div key={`${tile.x}-${tile.y}`} className={`eco-game__tile ${tile.road ? "eco-game__tile--road" : "eco-game__tile--grass"}`}>
                            {!tile.road && <span className="eco-game__scenery" aria-hidden="true">{tile.scenery}</span>}
                            {tile.problem && <span className={`eco-game__problem ${active ? "eco-game__problem--active" : "eco-game__problem--solved"}`} title={tile.problem.name} aria-label={active ? tile.problem.name : `Решено: ${tile.problem.name}`}>{active ? tile.problem.icon : tile.problem.solution}</span>}
                            {characterHere && <span className="eco-game__player" aria-label="Твоят герой">🧑‍🌾</span>}
                        </div>
                    );
                })}
            </div>

            <div className="eco-game__bottom">
                <div className="eco-game__status" aria-live="polite">
                    {completed ? <><strong>🎉 Браво! Спаси града от шума!</strong><span>Вече знаеш как можем да намалим шумовото замърсяване.</span></> : currentProblem ? <><strong>{currentProblem.icon} {currentProblem.name}</strong><span>Натисни Space или „Реши проблема“.</span></> : <span>{message}</span>}
                </div>
                <button type="button" className="eco-game__action" disabled={!currentProblem} onClick={solve}>✅ Реши проблема</button>
                <button type="button" className="eco-game__restart" onClick={restart}>↻ Започни отначало</button>
            </div>

            <div className="eco-game__controls">
                <p>Управление: <strong>← ↑ ↓ →</strong> или <strong>W A S D</strong> за движение · <strong>Space</strong> за решаване</p>
                <div className="eco-game__dpad" aria-label="Бутони за движение">
                    <button type="button" className="up" onClick={() => move(0, -1)} aria-label="Нагоре">↑</button>
                    <button type="button" className="left" onClick={() => move(-1, 0)} aria-label="Наляво">←</button>
                    <button type="button" className="down" onClick={() => move(0, 1)} aria-label="Надолу">↓</button>
                    <button type="button" className="right" onClick={() => move(1, 0)} aria-label="Надясно">→</button>
                </div>
            </div>
        </section>
    );
}

export default Game;
