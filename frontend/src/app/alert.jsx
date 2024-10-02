import { useEffect, useRef, useState } from "react";

function AlertEvents({ eventText, eventSetters }) {
	const [setSuccess, setWarning, setError] = eventSetters;
	const NOTIFICATION_TIME_MS = 5000; // 5 seconds

	const alertTypes = {
		success: { setter: setSuccess },
		error: { setter: setError },
		warning: { setter: setWarning },
	};

	// Custom hook to manage alert stack for each alert type
	const useAlertStack = (type) => {
		const [alerts, setAlerts] = useState([]);

		const addAlert = (text) => {
			if (!text) return;

			// Add a new alert to the stack
			const newAlert = { id: Date.now(), text, remainingTime: NOTIFICATION_TIME_MS };
			setAlerts((prevAlerts) => [...prevAlerts, newAlert]);

			// Set a timeout to remove the alert after the specified time
			setTimeout(() => {
				setAlerts((prevAlerts) =>
					prevAlerts.filter((alert) => alert.id !== newAlert.id)
				);
				alertTypes[type].setter(null); // Reset the event text after it's removed
			}, NOTIFICATION_TIME_MS);
		};

		return { alerts, addAlert };
	};

	// Create alert state and handlers for each type
	const alertStacks = {
		success: useAlertStack("success"),
		error: useAlertStack("error"),
		warning: useAlertStack("warning"),
	};

	// Generalized useEffect for all alert types to trigger the alert
	useEffect(() => {
		for (const type of Object.keys(alertTypes)) {
			if (eventText[type]) {
				alertStacks[type].addAlert(eventText[type]);
			}
		}
	}, [eventText]); // Re-run when eventText changes

	return (
		<div id="alertBox">
			{Object.keys(alertStacks).map((type) => {
				return (
					<div key={type} className={`${type}-alerts`}>
						{alertStacks[type].alerts.map((alert) => (
							<div
								className="alert"
								id={type}
								key={alert.id}
								style={{ "--timer": `${alert.remainingTime}ms` }}
							>
								<Event eventId={type} />
								<h3>{alert.text}</h3>
							</div>
						))}
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
