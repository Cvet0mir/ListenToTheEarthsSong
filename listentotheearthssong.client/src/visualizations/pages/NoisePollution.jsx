
import { useState } from "react";
import NoiseMap from "../components/NoiseMap";
import noiseData from "../data/noise-data.geojson";

function NoisePollution() {
    const [selectedYear, setSelectedYear] = useState("2017");

    const years = [
        "2008", "2009", "2010", "2011", "2012",
        "2013", "2014", "2015", "2016", "2017"
    ];

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
                    onChange={(e) => setSelectedYear(e.target.value)}
                    style={{ maxWidth: "200px" }}
                >
                    {years.map(year => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            <NoiseMap
                noiseData={noiseData}
                year={selectedYear}
            />
        </div>
    );
}

export default NoisePollution;
