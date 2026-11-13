
import { useEffect, useState, useCallback } from "react";

function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = useCallback(async (signal) => {
        setLoading(true);

        try {
            const response = await fetch("/User/GetCurrentUser", {
                credentials: "same-origin",
                signal
            });

            if (!response.ok) {
                setUser(null);
                return;
            }

            const data = await response.json();
            setUser(data);

        } catch (error) {
            if (error.name !== "AbortError") {
                console.error("Authentication check failed:", error);
                setUser(null);
            }
        } finally {
            if (!signal?.aborted) {
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        checkAuth(controller.signal);

        const handleAuthChange = () => {
            checkAuth();
        };

        window.addEventListener("auth-changed", handleAuthChange);

        return () => {
            controller.abort();
            window.removeEventListener("auth-changed", handleAuthChange);
        };
    }, [checkAuth]);

    return { user, loading, checkAuth };
}

export default useAuth;
