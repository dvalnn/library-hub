import { useEffect, useRef, useState } from "react";

function AlertEvents({ eventText, eventSetters }) {
	const [setSuccess, setWarning, setError] = eventSetters;
	const [visibleAlerts, setVisibleAlerts] = useState({
		success: false,
		error: false,
		warning: false,
	});

	const timers = {
		success: useRef(null),
		error: useRef(null),
		warning: useRef(null),
	};

	// Store the remaining time for the animation
	const remainingTime = useRef({
		success: 0,
		error: 0,
		warning: 0,
	});

	const NOTIFICATION_TIME_MS = 5000; // 5 seconds

	const triggerAlert = (type, text, setter) => {
		if (text) {
			// Show the alert
			setVisibleAlerts((prev) => ({
				...prev,
				[type]: true,
			}));

			// Clear any existing timer for the type
			if (timers[type].current) {
				clearTimeout(timers[type].current);
			}

			// Start a new timer
			timers[type].current = setTimeout(() => {
				setVisibleAlerts((prev) => ({
					...prev,
					[type]: false,
				}));
				setter(null); // Clear the event text to allow re-triggering
			}, NOTIFICATION_TIME_MS);

			// Reset remaining time
			remainingTime.current[type] = NOTIFICATION_TIME_MS; // 5 seconds in milliseconds

			// Timer interval to reduce remaining time
			const interval = setInterval(() => {
				remainingTime.current[type] -= 100; // Decrease by 100ms
				//TODO: Isto funfa. tirar log
				console.log(`remaining time: ${remainingTime.current[type]}`);
				if (remainingTime.current[type] <= 0) {
					clearInterval(interval);
				}
			}, 100); // Update every 100ms

			// Clear the interval when the alert disappears
			return () => {
				clearTimeout(timers[type].current);
				clearInterval(interval);
			};
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: not necessary
	useEffect(
		() => triggerAlert("success", eventText.success, setSuccess),
		[eventText.success],
	);
	// biome-ignore lint/correctness/useExhaustiveDependencies: not necessary
	useEffect(
		() => triggerAlert("error", eventText.error, setError),
		[eventText.error],
	);
	// biome-ignore lint/correctness/useExhaustiveDependencies: not necessary
	useEffect(
		() => triggerAlert("warning", eventText.warning, setWarning),
		[eventText.warning],
	);

	// TODO: MIGUEL: usar os valores de remainingTime.success/.warning/.error
	// para fazer a duração das animações. O modo atual foi o chatgpt que sugeriu
	// mas o CSS não parece estar a curtir.
	return (
		<div id="alertBox">
			{visibleAlerts.success && (
				<div
					className="alert"
					id="success"
					style={{
						// Não sei se isto está correto. Não parece estar a funcionar
						animationDuration: `${remainingTime.current.success}ms`,
						// Pode ser possível que tenha de ser assim, but not sure.
						// animationDuration: `${remainingTime.current[eventText.success]}ms`,
					}}
				>
					<Event eventId="success" />
					<h3>{eventText.success}</h3>
				</div>
			)}
			{visibleAlerts.error && (
				<div
					className="alert"
					id="error"
					style={{
						// Não sei se isto está correto. Não parece estar a funcionar
						animationDuration: `${remainingTime.current.error}ms`,
					}}
				>
					<Event eventId="error" />
					<h3>{eventText.error}</h3>
				</div>
			)}
			{visibleAlerts.warning && (
				<div
					className="alert"
					id="warning"
					style={{
						// Não sei se isto está correto. Não parece estar a funcionar
						animationDuration: `${remainingTime.current.warning}ms`,
					}}
				>
					<Event eventId="warning" />
					<h3>{eventText.warning}</h3>
				</div>
			)}
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
