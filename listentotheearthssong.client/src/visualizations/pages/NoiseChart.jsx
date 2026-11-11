
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
            dynamicTyping: false,
            skipEmptyLines: true,

            transformHeader: (header) =>
                header.trim().replace(/^\uFEFF/, ""),

            complete: (result) => {
                console.log("CSV headers:", result.meta.fields);
                console.log("CSV raw data:", result.data);
                console.log("CSV parsing errors:", result.errors);

                const formattedData = result.data
                    .map(row => ({
                        year: String(row["Period"] ?? "").trim(),
                        monitoringPoints: Number(
                            String(row["Monitoring points"] ?? "")
                                .replace(",", ".")
                                .trim()
                        )
                    }))
                    .filter(row =>
                        row.year !== "" &&
                        Number.isFinite(row.monitoringPoints)
                    );

                console.log("Formatted chart data:", formattedData);

                setData(formattedData);
                setLoading(false);
            },

            error: (err) => {
                console.error("CSV loading error:", err);
                setError(err.message);
                setLoading(false);
            }
        });
    }, []);

    if (loading) return <p>Loading chart...</p>;
    if (error) return <p>Error: {error}</p>;

    if (data.length === 0) {
        return <p>No valid chart data was found. Check the CSV headers and values.</p>;
    }

    return (
        <div style={{ width: "100%", height: 400 }}>
            <h2>Мониторинг на шума в България</h2>

            <ResponsiveContainer width="100%" height="85%">
                <LineChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="year"
                        label={{
                            value: "Година",
                            position: "insideBottom",
                            offset: -5
                        }}
                    />

                    <YAxis
                        label={{
                            value: "Мониторинг точки",
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
                        dot={{ r: 5 }}
                        activeDot={{ r: 7 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default NoiseChart;
