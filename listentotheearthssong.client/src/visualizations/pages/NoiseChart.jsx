
import { useEffect, useState } from "react";
import Papa from "papaparse";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function NoiseChart() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        Papa.parse("/data/noise-BG-noise-monitored-total.csv", {
            download: true,
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,

            complete: (result) => {
                const formattedData = result.data.map(row => ({
                    year: row["Period"],
                    monitoringPoints: row["Monitoring points"]
                }));

                setData(formattedData);
                setLoading(false);
            },

            error: (err) => {
                setError(err.message);
                setLoading(false);
            }
        });
    }, []);

    if (loading) return <p>Loading chart...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={{ width: "100%", height: 400 }}>

            <h2>Noise Monitoring in Bulgaria</h2>

            <ResponsiveContainer width="100%" height="85%">
                <LineChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 10
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="year"
                        label={{
                            value: "Year",
                            position: "insideBottom",
                            offset: -5
                        }}
                    />

                    <YAxis
                        label={{
                            value: "Monitoring points",
                            angle: -90,
                            position: "insideLeft"
                        }}
                    />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="monitoringPoints"
                        stroke="#16a34a"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 7 }}
                    />

                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default NoiseChart;
