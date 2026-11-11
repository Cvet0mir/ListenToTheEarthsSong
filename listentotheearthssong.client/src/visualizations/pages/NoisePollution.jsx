
import { useEffect, useState } from "react";
import NoiseMap from "../components/NoiseMap";

function NoisePollution() {
    const [selectedYear, setSelectedYear] = useState("2017");
    const [noiseData, setNoiseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const years = [
        "2008", "2009", "2010", "2011", "2012",
        "2013", "2014", "2015", "2016", "2017"
    ];

    useEffect(() => {
        fetch("/data/noise-data.geojson")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Could not load GeoJSON.");
                }

                return response.json();
            })
            .then(data => {
                setNoiseData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("GeoJSON loading error:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container mt-4">
            <h1>Noise Pollution in Sofia</h1>

            <p>
                Explore noise measurements across different
                locations in Sofia.
            </p>

            <div className="mb-3">
                <label htmlFor="year" className="form-label">
                    Select measurement year:
                </label>

                <select
                    id="year"
                    className="form-select"
                    value={selectedYear}
                    onChange={e => setSelectedYear(e.target.value)}
                    style={{ maxWidth: "200px" }}
                >
                    {years.map(year => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            {loading && <p>Loading map data...</p>}

            {error && (
                <p className="text-danger">
                    {error}
                </p>
            )}

            {noiseData && (
                <div className="noise-map-wrapper">
                    <NoiseMap
                        noiseData={noiseData}
                        year={selectedYear}
                    />
                </div>
            )}
        </div>
    );
}

export default NoisePollution;
