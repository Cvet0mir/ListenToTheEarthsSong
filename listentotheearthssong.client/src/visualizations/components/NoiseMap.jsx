
import { useMemo } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../shared/css/noiseMap.css";

function parseNoiseValue(value) {
    if (value === null || value === undefined || value === "") {
        return null;
    }

    const number = Number(
        String(value).replace(",", ".")
    );
    return Number.isFinite(number) ? number : null;
}

function getNoiseColor(noiseLevel, norma) {
    if (noiseLevel === null) return "#9ca3af";

    if (noiseLevel <= norma) return "#22c55e";
    if (noiseLevel <= norma + 5) return "#eab308";
    if (noiseLevel <= norma + 10) return "#f97316";

    return "#ef4444";
}

function NoiseMap({ noiseData, year }) {
    const mapData = useMemo(() => ({
        ...noiseData,
        features: noiseData.features.map(feature => ({
            ...feature,
            geometry: {
                type: "Point",
                coordinates: feature.geometry.coordinates[0]
            }
        }))
    }), [noiseData]);

    const pointToLayer = (feature, latlng) => {
        const properties = feature.properties;

        const noiseLevel = parseNoiseValue(
            properties[year]
        );

        const norma = parseNoiseValue(
            properties.norma
        );

        return L.circleMarker(latlng, {
            radius: 9,
            fillColor: getNoiseColor(noiseLevel, norma),
            color: "#ffffff",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.85
        });
    };

    const onEachFeature = (feature, layer) => {
        const properties = feature.properties;

        const noiseLevel = parseNoiseValue(
            properties[year]
        );

        const norma = parseNoiseValue(
            properties.norma
        );

        const popup = document.createElement("div");

        const title = document.createElement("strong");
        title.textContent = properties.punkt;

        const noise = document.createElement("p");
        noise.textContent = noiseLevel === null
            ? `Ниво на шума (${year}): Няма данни`
            : `Ниво на шума (${year}): ${noiseLevel} dB`;

        const limit = document.createElement("p");
        limit.textContent = `Позволена граница: ${norma} dB`;

        const territory = document.createElement("p");
        territory.textContent = `Тип на района: ${properties.tip_teritoria}`;

        popup.appendChild(title);
        popup.appendChild(noise);
        popup.appendChild(limit);
        popup.appendChild(territory);

        layer.bindPopup(popup);
    };

    return (
        <div className="noise-map-container">
            <MapContainer
                center={[42.6977, 23.3219]}
                zoom={12}
                className="noise-map"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                <GeoJSON
                    key={year}
                    data={mapData}
                    pointToLayer={pointToLayer}
                    onEachFeature={onEachFeature}
                />
            </MapContainer>
        </div>
    );
}

export default NoiseMap;
