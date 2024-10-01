import { useEffect, useRef, useState } from "react";

function AlertEvents({ eventText, eventSetters }) {
    const [setSuccess, setWarning, setError] = eventSetters;
    const NOTIFICATION_TIME_MS = 5000; // 5 seconds

    const alertTypes = {
        success: { setter: setSuccess },
        error: { setter: setError },
        warning: { setter: setWarning },
    };

    // Custom hook to manage each alert type
    const useAlert = (type) => {
        const [visible, setVisible] = useState(false);
        const timerRef = useRef(null);
        const remainingTime = useRef(NOTIFICATION_TIME_MS);

        const triggerAlert = (text) => {
            if (text) {
                setVisible(true);
                // Clear existing timer
                if (timerRef.current) clearTimeout(timerRef.current);

                // Set the timeout for hiding the alert
                timerRef.current = setTimeout(() => {
                    setVisible(false);
                    alertTypes[type].setter(null); // Reset the event text
                }, NOTIFICATION_TIME_MS);

                remainingTime.current = NOTIFICATION_TIME_MS;

                // Interval to update the remaining time
                const interval = setInterval(() => {
                    remainingTime.current -= 100;
                    if (remainingTime.current <= 0) {
                        clearInterval(interval);
                    }
                }, 100);

                // Cleanup the interval on alert disappearance
                return () => {
                    clearTimeout(timerRef.current);
                    clearInterval(interval);
                };
            }
        };

        return { visible, triggerAlert, remainingTime: remainingTime.current };
    };

    // Create alert state and handlers for each type
    const alerts = {
        success: useAlert('success'),
        error: useAlert('error'),
        warning: useAlert('warning'),
    };

    // Generalized useEffect for all alert types
    useEffect(() => {
        Object.keys(alertTypes).forEach((type) => {
            alerts[type].triggerAlert(eventText[type]);
        });
    }, [eventText, alerts]);

    return (
        <div id="alertBox">
            {Object.keys(alerts).map((type) => {
                const { visible, remainingTime } = alerts[type];
                return visible && (
                    <div
                        className="alert"
                        id={type}
                        key={`${eventText[type]}-${Date.now()}`}
                        style={{ "--timer": `${remainingTime}ms` }}
                    >
                        <Event eventId={type} />
                        <h3>{eventText[type]}</h3>
                    </div>
                );
            })}
        </div>
    );
}

function Event({ eventId }) {
	switch (eventId) {
		case "success":
			return (
				<svg viewBox="0 0 512 512">
					<title>Notificação Sucesso</title>
					<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
				</svg>
			);
		case "error":
			return (
				<svg viewBox="0 0 512 512">
					<title>Notificação erro</title>
					<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
				</svg>
			);

		case "warning":
			return (
				<svg viewBox="0 0 512 512">
					<title>Notificação aviso</title>
					<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
				</svg>
			);
		default:
			return null;
	}
}

export default AlertEvents;
