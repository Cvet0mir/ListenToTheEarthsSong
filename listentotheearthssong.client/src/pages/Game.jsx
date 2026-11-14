import { useCallback, useEffect, useRef, useState } from "react";
import "../shared/css/styleGame.css";

// Coordinates below are percentages of the illustrated game board.
const START = { x: 49, y: 53.5 };
const SPEED = 17; // percentage points per second on the illustrated board
const ROAD_RADIUS = 3.1; // playable corridor half-width (percentage units)
const PROBLEMS = [
    { id: "school", x: 25, y: 53.5, icon: "🚌", title: "Шумен трафик до училището", text: "Отивай пеша, с колело или с обществен транспорт, когато е възможно.", fixed: "🚲" },
    { id: "park", x: 54, y: 53.5, icon: "🎵", title: "Силна музика в парка", text: "Намали музиката, за да могат всички да се наслаждават на парка.", fixed: "🌼" },
    { id: "hospital", x: 81, y: 53.5, icon: "🚑", title: "Шум близо до болницата", text: "Не натискай клаксона без нужда и пази тишина край болниците.", fixed: "💚" },
    { id: "construction", x: 23, y: 87, icon: "🚧", title: "Шум от строителство", text: "Извършвай шумните строителни дейности в разрешените дневни часове.", fixed: "🌱" },
    { id: "neighborhood", x: 75, y: 87, icon: "🚗", title: "Шум в квартала", text: "Карай спокойно, избягвай излишното форсиране и натискане на клаксона.", fixed: "🌳" },
];


function Character({ moving }) {
    return <svg viewBox="0 0 76 104" className={`eco-game__character ${moving ? "eco-game__character--walking" : ""}`} role="img" aria-label="Дете с раница">
        <ellipse cx="39" cy="99" rx="24" ry="4" fill="#243a4b" opacity=".2" />
        <g className="eco-game__character-legs" stroke="#314c73" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
            <path d="M27 72 L24 90 L13 94 L15 99 L32 99 L37 78" fill="#2d79c6" />
            <path d="M43 72 L49 88 L57 91 L55 98 L42 98 L35 79" fill="#2366b4" />
            <path d="M13 93 l15 1 1 5 H14Z M44 93 l13 -1 3 6 H45Z" fill="#fff" stroke="#344356" strokeWidth="2" />
        </g>
        <rect x="11" y="43" width="25" height="37" rx="11" fill="#f4bd26" stroke="#a76a19" strokeWidth="3" />
        <path d="M27 41 Q39 34 52 42 L56 70 Q41 81 25 71 Z" fill="#38a85a" stroke="#226a50" strokeWidth="3" />
        <path d="M35 44 L37 66 M47 44 L47 65" stroke="#c4f16c" strokeWidth="3" />
        <path d="M52 48 Q62 58 57 68 L64 72" fill="none" stroke="#f7bc8f" strokeWidth="9" strokeLinecap="round" />
        <path d="M62 72 l5 -1" stroke="#bc7049" strokeWidth="2" strokeLinecap="round" />
        <path d="M31 46 Q19 55 25 67" stroke="#f7bc8f" strokeWidth="8" strokeLinecap="round" fill="none" />
        <rect x="20" y="25" width="36" height="32" rx="16" fill="#f9c99e" stroke="#a96d4f" strokeWidth="2.5" />
        <path d="M20 36 Q12 15 30 13 Q49 4 57 23 L54 37 Q48 26 40 24 Q32 35 20 36" fill="#7a482d" stroke="#59331f" strokeWidth="2.5" />
        <path d="M23 20 Q18 10 32 11 Q41 5 47 14" fill="none" stroke="#9b6036" strokeWidth="6" strokeLinecap="round" />
        <circle cx="47" cy="38" r="2.5" fill="#3c342e" /><circle cx="55" cy="37" r="2" fill="#3c342e" />
        <circle cx="46" cy="46" r="3" fill="#f58e85" opacity=".55" />
        <path d="M48 48 q4 4 7 -1" fill="none" stroke="#8c473d" strokeWidth="2" strokeLinecap="round" />
        <path d="M36 45 Q31 48 34 53" stroke="#d99876" strokeWidth="2" fill="none" />
    </svg>;
}

function Car({ x, y, color = "#fa655c", scale = 1, flip = false }) {
    return <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`} strokeLinejoin="round">
        <ellipse cx="0" cy="23" rx="40" ry="8" fill="#33455c" opacity=".18" />
        <path d="M-38 2 L-27 -15 H18 L33 1 L39 7 V20 H-40 V9Z" fill={color} stroke="#40506c" strokeWidth="3" />
        <path d="M-23 -12 H15 L25 1 H-30Z" fill="#9bdfff" stroke="#f5fcff" strokeWidth="2" />
        <path d="M-3 -12 V1" stroke="#f5fcff" strokeWidth="2" />
        <circle cx="-24" cy="20" r="9" fill="#34445b" /><circle cx="25" cy="20" r="9" fill="#34445b" />
        <circle cx="-24" cy="20" r="4" fill="#a9becd" /><circle cx="25" cy="20" r="4" fill="#a9becd" />
        <rect x="32" y="7" width="7" height="6" rx="2" fill="#fff0a9" />
    </g>;
}

function NoiseDetail({ x, y, type }) {
    return <g transform={`translate(${x} ${y})`}>
        {type === "music" ? <g><rect x="-28" y="-25" width="56" height="42" rx="8" fill="#53657c" stroke="#2e4058" strokeWidth="4" /><circle cx="-14" cy="1" r="10" fill="#b9cfdf" stroke="#28374b" strokeWidth="3" /><circle cx="15" cy="1" r="10" fill="#b9cfdf" stroke="#28374b" strokeWidth="3" /><rect x="-12" y="-19" width="24" height="8" rx="3" fill="#d5e7f2" /><text x="35" y="-27" fontSize="30">♫</text></g> : null}
        {type === "ambulance" ? <g><rect x="-36" y="-19" width="71" height="36" rx="9" fill="#f8fcff" stroke="#526a8b" strokeWidth="3" /><path d="M0 -19 h24 l15 18 v18 H0Z" fill="#e5f5ff" stroke="#526a8b" strokeWidth="3" /><rect x="-16" y="-12" width="8" height="22" fill="#f05d61" /><rect x="-23" y="-5" width="22" height="8" fill="#f05d61" /><circle cx="-22" cy="18" r="8" fill="#34465d" /><circle cx="24" cy="18" r="8" fill="#34465d" /><rect x="-7" y="-25" width="17" height="7" rx="3" fill="#fc8d37" /></g> : null}
    </g>;
}

// Point-to-segment distance lets the player follow the actual road centerlines,
// including corners, instead of walking through rectangular grass areas.
const ROAD_SEGMENTS = [
    [[8, 54.1], [92, 54.1]], [[6.2, 56.5], [6.2, 82.8]], [[6.2, 82.8], [8.8, 87.9]],
    [[8.8, 87.9], [90.2, 87.9]], [[90.2, 87.9], [94.1, 83.0]], [[94.1, 83.0], [94.1, 58.8]],
    [[35.8, 54.1], [34.3, 48.9]], [[34.3, 48.9], [34.3, 30]],
    [[34.3, 30], [37.4, 24.1]], [[37.4, 24.1], [61.4, 24.1]],
    [[61.4, 24.1], [65.7, 30]], [[65.7, 30], [65.7, 48.7]], [[65.7, 48.7], [63.3, 54.1]],
];
function distanceToSegment(x, y, a, b) {
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (y - a[1]) * dy) / (dx * dx + dy * dy)));
    return Math.hypot(x - a[0] - t * dx, y - a[1] - t * dy);
}

function Tree({ x, y, s = 1 }) {
    return <g transform={`translate(${x} ${y}) scale(${s})`}>
        <ellipse cx="1" cy="41" rx="30" ry="9" fill="#65aa30" opacity=".35" />
        <path d="M-7 39 L-6 -2 L7 -2 L9 39" fill="#946025" stroke="#6a481b" strokeWidth="3" />
        <g fill="#4da62e" stroke="#287a25" strokeWidth="3">
            <circle cx="-23" cy="-14" r="24" /><circle cx="13" cy="-24" r="28" /><circle cx="34" cy="-5" r="20" /><circle cx="-2" cy="-37" r="29" />
        </g><circle cx="-17" cy="-32" r="13" fill="#8bd43b" opacity=".9" />
    </g>;
}
function House({ x, y, color = "#ffe2a1", roof = "#ef6059", scale = 1 }) {
    return <g transform={`translate(${x} ${y}) scale(${scale})`} strokeLinejoin="round" strokeLinecap="round">
        <ellipse cx="85" cy="115" rx="100" ry="13" fill="#68a935" opacity=".3" />
        <rect x="8" y="39" width="155" height="73" rx="6" fill={color} stroke="#825438" strokeWidth="4" />
        <path d="M-2 45 L80 -18 L172 45 Z" fill={roof} stroke="#89483e" strokeWidth="5" />
        <rect x="69" y="66" width="38" height="46" rx="3" fill="#399bd2" stroke="#fff4de" strokeWidth="5" />
        <rect x="21" y="59" width="32" height="30" rx="3" fill="#79d4ff" stroke="#fffdf5" strokeWidth="5" />
        <rect x="121" y="59" width="28" height="30" rx="3" fill="#79d4ff" stroke="#fffdf5" strokeWidth="5" />
    </g>;
}
function School() {
    return <g transform="translate(76 193)">
        <ellipse cx="105" cy="126" rx="118" ry="13" fill="#65a32b" opacity=".3" />
        <rect x="7" y="21" width="199" height="103" rx="6" fill="#ffd55e" stroke="#c58739" strokeWidth="4" />
        <path d="M-3 28 L105 -38 L215 28 L194 28 L105 -18 L18 28 Z" fill="#f05a4e" stroke="#a8443a" strokeWidth="5" />
        <rect x="76" y="58" width="58" height="66" rx="4" fill="#43a5ec" stroke="#f7f4e5" strokeWidth="6" />
        <path d="M105 59 V122" stroke="#fff" strokeWidth="3" />
        {[23, 158].map((x) => <g key={x}><rect x={x} y="48" width="27" height="33" rx="2" fill="#78d7ff" stroke="white" strokeWidth="5" /><path d={`M${x + 13} 49 v32`} stroke="white" strokeWidth="3" /></g>)}
        <rect x="52" y="22" width="110" height="29" rx="7" fill="#fffaf1" stroke="#b67b4b" strokeWidth="3" />
        <text x="107" y="42" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="17" fontWeight="900" fill="#203e69">УЧИЛИЩЕ</text>
    </g>;
}
function Hospital() {
    return <g transform="translate(760 188)">
        <ellipse cx="89" cy="139" rx="116" ry="13" fill="#65a32b" opacity=".3" />
        <rect x="0" y="36" width="184" height="101" rx="8" fill="#f4f7ff" stroke="#526d9e" strokeWidth="4" />
        <rect x="39" y="7" width="107" height="130" rx="7" fill="#fff" stroke="#526d9e" strokeWidth="4" />
        <path d="M83 -7 H103 V8 H118 V27 H103 V42 H83 V27 H68 V8 H83 Z" fill="#f2464e" />
        {[15, 154].map(x => <rect key={x} x={x} y="65" width="19" height="26" fill="#72c9ff" stroke="#dfeaff" strokeWidth="3" />)}
        <rect x="60" y="57" width="68" height="26" rx="5" fill="#fff" stroke="#859cc3" strokeWidth="2" />
        <text x="94" y="75" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="900" fill="#203d6f">БОЛНИЦА</text>
        <rect x="72" y="94" width="44" height="43" fill="#5ab2ed" stroke="#dfeaff" strokeWidth="4" />
    </g>;
}
function Playground() {
    return <g transform="translate(440 235)">
        <ellipse cx="75" cy="87" rx="124" ry="11" fill="#64a72e" opacity=".3" />
        <path d="M10 70 V-10 L52 -37 L96 -10 V70" fill="none" stroke="#296395" strokeWidth="8" strokeLinejoin="round" />
        <path d="M-1 -13 L51 -52 L105 -13 Z" fill="#3c9def" stroke="#27518d" strokeWidth="5" />
        <path d="M64 11 Q107 5 100 49 Q110 72 146 65 L159 84 Q90 102 76 53 Z" fill="#f34e5a" stroke="#c42d44" strokeWidth="4" />
        <path d="M20 15 H52 M22 48 H54" stroke="#f8cb50" strokeWidth="7" />
        <rect x="155" y="58" width="65" height="12" rx="6" fill="#e9a451" stroke="#9c6433" strokeWidth="3" />
        <path d="M166 71 v16 M209 71 v16" stroke="#91542b" strokeWidth="7" />
    </g>;
}
function Construction() {
    return <g transform="translate(163 442)">
        <rect x="-11" y="46" width="230" height="102" rx="16" fill="#eeb574" opacity=".86" />
        <path d="M10 129 L35 115 L64 131 M139 125 L162 100 L192 133" stroke="#ca8648" strokeWidth="9" fill="none" strokeLinecap="round" />
        <g transform="translate(19 4)">
            <rect x="38" y="60" width="93" height="39" rx="9" fill="#ffcb31" stroke="#a16b17" strokeWidth="4" />
            <rect x="68" y="45" width="47" height="29" rx="5" fill="#f8d93c" stroke="#a16b17" strokeWidth="4" />
            <path d="M68 52 L39 -4 L8 -23" fill="none" stroke="#f7bd25" strokeWidth="15" strokeLinecap="round" />
            <path d="M8 -23 L-13 34" fill="none" stroke="#eab522" strokeWidth="12" strokeLinecap="round" />
            <path d="M-33 34 L-4 35 L12 62 Q-28 83 -42 55 Z" fill="#6a788a" stroke="#425065" strokeWidth="4" />
            <rect x="31" y="94" width="108" height="17" rx="8" fill="#464b55" />
            <circle cx="52" cy="101" r="6" fill="#b3ac89" /><circle cx="118" cy="101" r="6" fill="#b3ac89" />
        </g>
        <g transform="translate(12 133)" stroke="#9c6138" strokeWidth="4"><rect width="56" height="30" fill="#fff" /><path d="M0 29 L22 0 M30 30 L53 0" stroke="#fc883d" strokeWidth="10" /></g>
        <g transform="translate(156 133)" stroke="#9c6138" strokeWidth="4"><rect width="56" height="30" fill="#fff" /><path d="M0 29 L22 0 M30 30 L53 0" stroke="#fc883d" strokeWidth="10" /></g>
    </g>;
}
function CityIllustration() {
    return <svg className="eco-game__scene" viewBox="0 0 1000 680" role="img" aria-label="Илюстриран град с училище, площадка, болница, строеж и къщи" preserveAspectRatio="xMidYMid meet">
        <defs>
            <linearGradient id="eco-sky" x2="0" y2="1"><stop stopColor="#66caff" /><stop offset="1" stopColor="#b3eaff" /></linearGradient>
            <linearGradient id="eco-grass" x2="0" y2="1"><stop stopColor="#bceb54" /><stop offset="1" stopColor="#8fd335" /></linearGradient>
            <pattern id="eco-road-dash" width="38" height="15" patternUnits="userSpaceOnUse"><path d="M6 7 H27" stroke="white" strokeWidth="3" strokeLinecap="round" opacity=".9" /></pattern>
        </defs>
        <rect width="1000" height="680" fill="url(#eco-grass)" />
        <rect width="1000" height="123" fill="url(#eco-sky)" />
        <path d="M0 122 Q180 91 350 125 Q580 100 760 125 Q900 95 1000 121 V153 H0Z" fill="#59b34e" />
        <g fill="#fff" opacity=".88"><ellipse cx="92" cy="54" rx="59" ry="17" /><ellipse cx="80" cy="42" rx="24" ry="25" /><ellipse cx="120" cy="43" rx="30" ry="22" /><ellipse cx="863" cy="50" rx="60" ry="17" /><ellipse cx="855" cy="37" rx="29" ry="25" /><ellipse cx="892" cy="40" rx="31" ry="23" /></g>
        <g fill="#74bc36" opacity=".6">{[[55, 164], [312, 139], [411, 404], [584, 138], [969, 289], [954, 447], [376, 627], [600, 626], [880, 643], [81, 628]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="14" ry="5" />)}</g>
        {/* The paths give the city the rounded racetrack-like roads from the reference. */}
        <path d="M80 368 H920 Q941 368 941 400 V562 Q941 598 902 598 H99 Q62 598 62 562 V404 Q62 368 80 368" fill="none" stroke="#fff5df" strokeWidth="94" strokeLinejoin="round" />
        <path d="M80 368 H920 Q941 368 941 400 V562 Q941 598 902 598 H99 Q62 598 62 562 V404 Q62 368 80 368" fill="none" stroke="#9294a8" strokeWidth="79" strokeLinejoin="round" />
        <path d="M358 367 Q343 367 343 336 V204 Q343 165 388 165 H614 Q657 165 657 205 V330 Q657 366 633 366" fill="none" stroke="#fff5df" strokeWidth="94" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M358 367 Q343 367 343 336 V204 Q343 165 388 165 H614 Q657 165 657 205 V330 Q657 366 633 366" fill="none" stroke="#9294a8" strokeWidth="79" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M80 368 H920 Q941 368 941 400 V562 Q941 598 902 598 H99 Q62 598 62 562 V404 Q62 368 80 368" fill="none" stroke="white" strokeDasharray="16 23" strokeWidth="3" strokeLinecap="round" opacity=".85" />
        <path d="M358 367 Q343 367 343 336 V204 Q343 165 388 165 H614 Q657 165 657 205 V330 Q657 366 633 366" fill="none" stroke="white" strokeDasharray="15 25" strokeWidth="3" strokeLinecap="round" opacity=".85" />
        {/* Decorative paths, trees, and buildings. */}
        <School /><Hospital /><Playground /><Construction />
        <Car x={190} y={367} color="#ffd43b" scale={.85} /><Car x={290} y={367} color="#f16759" scale={.7} />
        <Car x={747} y={582} color="#8eb9e9" scale={.78} /><Car x={836} y={582} color="#f16e55" scale={.82} />
        <NoiseDetail x={565} y={300} type="music" /><NoiseDetail x={842} y={366} type="ambulance" />
        <g opacity=".9" stroke="#fff" strokeWidth="5"><path d="M483 415 v30 M499 415 v30 M515 415 v30 M531 415 v30 M547 415 v30" /></g>
        <g fill="#fff" opacity=".35"><circle cx="112" cy="385" r="5" /><circle cx="120" cy="380" r="3" /><circle cx="862" cy="581" r="5" /></g>
        <House x={626} y={455} scale={.9} /><House x={793} y={454} color="#c6e6ff" roof="#317eee" scale={.9} />
        <Tree x={35} y={211} s={.72} /><Tree x={298} y={255} s={.7} /><Tree x={711} y={246} s={.72} /><Tree x={967} y={215} s={.78} />
        <Tree x={399} y={287} s={.7} /><Tree x={578} y={283} s={.67} /><Tree x={558} y={475} s={.6} /><Tree x={930} y={481} s={.55} />
        <g fontSize="24">{[[115, 453], [396, 490], [543, 130], [976, 315], [510, 649], [351, 645], [884, 163]].map(([x, y], i) => <text key={i} x={x} y={y}>{["🌻", "🌷", "🌼", "🌿", "🌸", "🌿", "🌼"][i]}</text>)}</g>
        <path d="M454 393 l13 -10 -13 -9 M480 393 l13 -10 -13 -9 M506 393 l13 -10 -13 -9" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity=".9" />
    </svg>;
}

function isOnRoad(x, y) {
    return x >= 2 && x <= 98 && y >= 18 && y <= 95 &&
        ROAD_SEGMENTS.some(([a, b]) => distanceToSegment(x, y, a, b) <= ROAD_RADIUS);
}

export default function Game() {
    const [player, setPlayer] = useState(START);
    const [solved, setSolved] = useState([]);
    const [facing, setFacing] = useState("right");
    const [walking, setWalking] = useState(false);
    const [notice, setNotice] = useState("Открий червените знаци за шум по улиците!");
    const heldKeys = useRef(new Set());
    const playerRef = useRef(START);
    const completed = solved.length === PROBLEMS.length;
    const remaining = PROBLEMS.length - solved.length;
    const nearby = PROBLEMS.find(p => !solved.includes(p.id) && Math.hypot(p.x - player.x, p.y - player.y) <= 6.3);

    const moveBy = useCallback((dx, dy, amount) => {
        const current = playerRef.current;
        const length = Math.hypot(dx, dy) || 1;
        const vx = dx / length * amount, vy = dy / length * amount;
        // Sliding along a road edge makes cornering noticeably more forgiving.
        let next = { x: current.x + vx, y: current.y + vy };
        if (!isOnRoad(next.x, next.y)) {
            if (isOnRoad(current.x + vx, current.y)) next = { x: current.x + vx, y: current.y };
            else if (isOnRoad(current.x, current.y + vy)) next = { x: current.x, y: current.y + vy };
            else return;
        }
        playerRef.current = next;
        setPlayer(next);
        if (dx !== 0) setFacing(dx < 0 ? "left" : "right");
    }, []);
    const nudge = useCallback((dx, dy) => { moveBy(dx, dy, 1.65); setWalking(true); }, [moveBy]);
    const solve = useCallback(() => {
        const at = playerRef.current;
        const found = PROBLEMS.find(p => !solved.includes(p.id) && Math.hypot(p.x - at.x, p.y - at.y) <= 6.3);
        if (!found) return;
        setSolved(before => before.includes(found.id) ? before : [...before, found.id]);
        setNotice(`✅ ${found.text}`);
    }, [solved]);
    const restart = () => { heldKeys.current.clear(); playerRef.current = START; setPlayer(START); setSolved([]); setFacing("right"); setWalking(false); setNotice("Открий червените знаци за шум по улиците!"); };

    useEffect(() => {
        const keys = heldKeys.current;
        const directions = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0], w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0] };
        function editable(target) { return target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)); }
        function down(event) {
            if (editable(event.target)) return;
            const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
            if (directions[key]) { event.preventDefault(); keys.add(key); }
            if (event.code === "Space" || event.key === "Enter") { if (event.target instanceof HTMLButtonElement) return; event.preventDefault(); solve(); }
        }
        function up(event) { const key = event.key.length === 1 ? event.key.toLowerCase() : event.key; keys.delete(key); }
        function blur() { keys.clear(); setWalking(false); }
        window.addEventListener("keydown", down);
        window.addEventListener("keyup", up);
        window.addEventListener("blur", blur);
        let animationId, lastTime;
        function frame(time) {
            if (lastTime !== undefined) {
                const dt = Math.min((time - lastTime) / 1000, .05);
                let dx = 0, dy = 0;
                for (const key of keys) { if (directions[key]) { dx += directions[key][0]; dy += directions[key][1]; } }
                const active = dx !== 0 || dy !== 0;
                if (active) moveBy(dx, dy, SPEED * dt);
                setWalking(previous => previous === active ? previous : active);
            }
            lastTime = time;
            animationId = requestAnimationFrame(frame);
        }
        animationId = requestAnimationFrame(frame);
        return () => { cancelAnimationFrame(animationId); keys.clear(); window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); window.removeEventListener("blur", blur); };
    }, [moveBy, solve]);

    return <section className="eco-game">
        <header className="eco-game__header">
            <div><div className="eco-game__brand">🍃 <span>Еко<span className="eco-game__brand-blue">Тишина</span></span></div><p>Помогни на града да стане по-тих!</p></div>
            <div className="eco-game__score" aria-live="polite">
                <div className="eco-game__score-top"><span>🌿 Остават за решаване</span><strong>{remaining} / 5</strong></div>
                <div className="eco-game__meter" role="progressbar" aria-label="Решени проблеми" aria-valuemin={0} aria-valuemax={5} aria-valuenow={solved.length}>
                    <div className="eco-game__meter-fill" style={{ width: `${solved.length / PROBLEMS.length * 100}%` }} />
                </div>
                <small>{solved.length} решени · {remaining} оставащи</small>
            </div>
        </header>
        <div className="eco-game__board">
            <CityIllustration />
            {PROBLEMS.map(p => {
                const fixed = solved.includes(p.id);
                return <div key={p.id} className={`eco-game__pin ${fixed ? "eco-game__pin--fixed" : ""}`} style={{ left: `${p.x}%`, top: `${p.y}%` }} title={`${p.title}${fixed ? " — решен" : ""}`}>
                    <span className="eco-game__pin-icon" aria-hidden="true">{fixed ? "✓" : "⌁"}</span>
                    <span className="eco-game__pin-emoji" aria-hidden="true">{fixed ? p.fixed : p.icon}</span>
                </div>;
            })}
            <div className="eco-game__player" style={{ left: `${player.x}%`, top: `${player.y}%` }}>
                <div className={`eco-game__player-facing ${facing === "left" ? "eco-game__player-facing--left" : ""}`}><Character moving={walking} /></div>
            </div>
            {completed && <div className="eco-game__win" role="status"><span>🏆</span><strong>Браво! Градът е по-тих!</strong><p>Реши всички пет проблема с шумовото замърсяване.</p><button type="button" onClick={restart}>Играй отново ↻</button></div>}
        </div>
        <div className="eco-game__toolbar">
            <div className="eco-game__message" role="status" aria-live="polite">{nearby && !completed ? <><strong>🔊 {nearby.title}</strong><span>Натисни Space или бутона, за да помогнеш!</span></> : <span>{notice}</span>}</div>
            <button className="eco-game__solve" type="button" onClick={solve} disabled={!nearby || completed}>✅ Реши проблема</button>
            <button className="eco-game__reset" type="button" onClick={restart}>↻ Отначало</button>
        </div>
        <div className="eco-game__controls"><p><strong>Движение:</strong> задръж стрелките или WASD · <strong>Решаване:</strong> Space · Приближи се до червен знак 🔴</p>
            <div className="eco-game__dpad" aria-label="Бутони за движение">
                <button className="up" type="button" onClick={() => nudge(0, -1)} aria-label="Нагоре">↑</button>
                <button className="left" type="button" onClick={() => nudge(-1, 0)} aria-label="Наляво">←</button>
                <button className="down" type="button" onClick={() => nudge(0, 1)} aria-label="Надолу">↓</button>
                <button className="right" type="button" onClick={() => nudge(1, 0)} aria-label="Надясно">→</button>
            </div>
        </div>
    </section>;
}
