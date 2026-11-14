import { useEffect, useState } from "react";
import "./styleGalery.css";

// Change these URLs if your ASP.NET controller uses different routes.
const PHOTOS_API = "/api/photos";

const knownCategoryLabels = {
    noise: "🏙️ Шумни места",
    quiet: "🍃 Тихи места",
    nature: "🌳 Природа",
};
const labelForCategory = (value) => knownCategoryLabels[value.toLowerCase()] ?? value;

const categoryLabels = {
    noise: "Шумно място",
    quiet: "Тихо място",
    nature: "Природа",
};

// Expected API photo: { id, title, description, category, location,
//   imageUrl, author }.
// imageUrl may be an absolute URL or a path such as /uploads/photos/abc.jpg.
function normalizePhoto(photo) {
    return {
        id: photo.id,
        title: photo.title ?? "Без заглавие",
        description: photo.description ?? "",
        category: String(photo.category ?? "").toLowerCase(),
        location: photo.location ?? "",
        author: photo.author ?? "",
        image: photo.imageUrl ?? "",
    };
}

function PhotoCard({ photo, onOpen }) {
    return (
        <div className="col-12 col-sm-6 col-lg-4 photo-item">
            <article className="photo-card">
                <button
                    className="photo-image-button"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#photoModal"
                    onClick={() => onOpen(photo)}
                    aria-label={`Преглед на ${photo.title}`}
                >
                    <img className="photo-image" loading="lazy" src={photo.image} alt={photo.title} />
                </button>
                <div className="p-3">
                    <span className={`category-badge ${photo.category === "quiet" ? "" : photo.category}`}>
                        {categoryLabels[photo.category] ?? photo.category}
                    </span>
                    <h3 className="card-title mt-3">{photo.title}</h3>
                    <p className="card-description">{photo.description}</p>
                    <div className="photo-meta d-flex justify-content-between gap-2">
                        <span>{photo.author ? `👤 ${photo.author}` : ""}</span>
                        <span>{photo.location ? `📍 ${photo.location}` : ""}</span>
                    </div>
                </div>
            </article>
        </div>
    );
}

export default function Gallery() {
    const [photos, setPhotos] = useState([]);
    const [categoryNames, setCategoryNames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [uploadNotice, setUploadNotice] = useState("");
    const [uploading, setUploading] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        fetch(`${PHOTOS_API}/categories`)
            .then(async (response) => {
                if (!response.ok) throw new Error("Could not load categories");
                return response.json();
            })
            .then(setCategoryNames)
            .catch((error) => console.error(error));
    }, []);

    const categories = [
        { value: "all", label: "Всички" },
        ...categoryNames.map((name) => ({ value: name.toLowerCase(), label: labelForCategory(name) })),
    ];

    useEffect(() => {
        const controller = new AbortController();
        async function loadPhotos() {
            setLoading(true);
            setLoadError("");
            try {
                const response = await fetch(PHOTOS_API, {
                    credentials: "include",
                    signal: controller.signal,
                });
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const data = await response.json();
                if (!Array.isArray(data)) throw new Error("Expected an array of photos");
                setPhotos(data.map(normalizePhoto));
            } catch (error) {
                if (error.name !== "AbortError") {
                    setLoadError("Снимките не могат да бъдат заредени. Опитай отново.");
                    console.error("Loading photos failed:", error);
                }
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }
        loadPhotos();
        return () => controller.abort();
    }, [reloadKey]);

    useEffect(() => {
        if (!photoFile || !["image/jpeg", "image/png", "image/webp"].includes(photoFile.type)) {
            setPreviewUrl("");
            return;
        }
        const url = URL.createObjectURL(photoFile);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [photoFile]);

    async function handleUpload(event) {
        event.preventDefault();
        setUploadNotice("");
        if (!photoFile || !["image/jpeg", "image/png", "image/webp"].includes(photoFile.type)) {
            setUploadNotice("Избери JPG, PNG или WebP снимка.");
            return;
        }

        const form = event.currentTarget;
        const data = new FormData(form);
        // The file input is named "photo" and is included in FormData automatically.
        setUploading(true);
        try {
            const csrfResponse = await fetch(`${PHOTOS_API}/antiforgery`, { credentials: "include" });
            if (!csrfResponse.ok) throw new Error("Could not obtain CSRF token");
            const { token } = await csrfResponse.json();
            const response = await fetch(PHOTOS_API, {
                method: "POST",
                headers: { RequestVerificationToken: token },
                body: data,
                credentials: "include",
            });
            if (!response.ok) {
                const detail = await response.text();
                throw new Error(`HTTP ${response.status}: ${detail}`);
            }
            setUploadNotice("Снимката е публикувана успешно!");
            form.reset();
            setPhotoFile(null);
            setReloadKey((value) => value + 1);
        } catch (error) {
            console.error("Uploading photo failed:", error);
            setUploadNotice("Качването не беше успешно. Провери дали си влязъл в профила си.");
        } finally {
            setUploading(false);
        }
    }

    const visiblePhotos = photos.filter(
        (photo) => activeFilter === "all" || photo.category === activeFilter
    );

    return (
        <>
            <header className="hero text-center">
                <div className="container position-relative" style={{ zIndex: 1 }}>
                    <div className="mb-3" aria-hidden="true" style={{ fontSize: "2rem" }}>📷 🌳</div>
                    <h1 className="mb-3">Светът през твоите очи</h1>
                    <p>Сподели снимки на шумни улици, тихи места и красивата природа около нас. Нека заедно открием колко ценна е тишината!</p>
                    <button type="button" className="btn btn-mint" data-bs-toggle="modal" data-bs-target="#uploadModal">
                        ＋ Качи снимка
                    </button>
                </div>
            </header>

            <main>
                <section className="gallery-section" id="gallery" aria-labelledby="galleryHeading">
                    <div className="container">
                        <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-4">
                            <div>
                                <h2 className="section-heading mb-1" id="galleryHeading">Нашата галерия</h2>
                                <p className="text-secondary mb-0">Разгледай света, уловен от нашата общност.</p>
                            </div>
                            <span className="text-secondary small" aria-live="polite">
                                {visiblePhotos.length} {visiblePhotos.length === 1 ? "снимка" : "снимки"}
                            </span>
                        </div>

                        <div className="d-flex gap-2 flex-wrap mb-4" role="group" aria-label="Филтър по категория">
                            {categories.map((category) => (
                                <button key={category.value} type="button"
                                    className={`category-filter ${activeFilter === category.value ? "active" : ""}`}
                                    aria-pressed={activeFilter === category.value}
                                    onClick={() => setActiveFilter(category.value)}>
                                    {category.label}
                                </button>
                            ))}
                        </div>

                        {loading && <p role="status">Зареждане на снимките...</p>}
                        {loadError && (
                            <div className="alert alert-danger" role="alert">
                                {loadError} <button className="btn btn-sm btn-outline-danger ms-2" onClick={() => setReloadKey((v) => v + 1)}>Опитай отново</button>
                            </div>
                        )}
                        {!loading && !loadError && (
                            <>
                                <div className="row g-4" id="photoGrid">
                                    {visiblePhotos.map((photo) => <PhotoCard key={photo.id} photo={photo} onOpen={setSelectedPhoto} />)}
                                </div>
                                {visiblePhotos.length === 0 && <div className="empty-state mt-4">Няма снимки в тази категория.</div>}
                            </>
                        )}
                    </div>
                </section>
            </main>

            <div className="modal fade" id="uploadModal" tabIndex={-1} aria-labelledby="uploadModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title fs-5" id="uploadModalLabel">📷 Качи своя снимка</h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Затвори" />
                        </div>
                        <form encType="multipart/form-data" onSubmit={handleUpload}>
                            <div className="modal-body p-4">
                                <div className="drop-zone mb-4">
                                    <div className="fs-2" aria-hidden="true">🖼️</div>
                                    <label htmlFor="photoFile" className="form-label fw-bold">Избери снимка</label>
                                    <input type="file" className="form-control" id="photoFile" name="photo"
                                        accept="image/jpeg,image/png,image/webp" required
                                        onChange={(event) => setPhotoFile(event.target.files?.[0] ?? null)} />
                                    <div className="form-text">JPG, PNG или WebP. Размерът и съдържанието се проверяват и на сървъра.</div>
                                    {previewUrl && <img id="uploadPreview" className="mt-3" src={previewUrl} alt="Преглед на избраната снимка" />}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="photoTitle" className="form-label fw-semibold">Заглавие</label>
                                    <input className="form-control" id="photoTitle" name="title" maxLength={100}
                                        placeholder="Например: Тишина в гората" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="photoDescription" className="form-label fw-semibold">Описание</label>
                                    <textarea className="form-control" id="photoDescription" name="description" rows={3}
                                        maxLength={500} required placeholder="Разкажи историята зад снимката..." />
                                </div>
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <label htmlFor="photoCategory" className="form-label fw-semibold">Категория</label>
                                        <select id="photoCategory" name="category" className="form-select" required defaultValue="">
                                            <option value="" disabled>Избери категория</option>
                                            {categoryNames.map((name) => (
                                                <option key={name} value={name}>{labelForCategory(name)}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <p className="small text-secondary mt-3 mb-0">Качвай само снимки, които имаш право да споделяш. Не публикувай лични данни или снимки на други хора без необходимото разрешение.</p>
                                {uploadNotice && <div className="alert alert-info mt-3 mb-0" role="status">{uploadNotice}</div>}
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-outline-secondary" type="button" data-bs-dismiss="modal">Отказ</button>
                                <button className="btn btn-forest px-4" type="submit" disabled={uploading}>
                                    {uploading ? "Публикуване..." : "Публикувай снимката"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="photoModal" tabIndex={-1} aria-labelledby="photoModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title fs-5" id="photoModalLabel">{selectedPhoto?.title ?? "Снимка"}</h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Затвори" />
                        </div>
                        {selectedPhoto && (
                            <>
                                <img id="lightboxImage" src={selectedPhoto.image} alt={selectedPhoto.title} />
                                <div className="modal-body">
                                    <p className="mb-2">{selectedPhoto.description}</p>
                                    <p className="text-secondary small mb-0">{[selectedPhoto.author, selectedPhoto.location].filter(Boolean).join(" · ")}</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
