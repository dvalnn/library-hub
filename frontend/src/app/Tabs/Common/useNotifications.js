import { useState } from "react";

function useNotifications() {
	const [event, setEvent] = useState({
		success: null,
		warning: null,
		error: null,
	});

	const setSuccess = (payload) => {
		setEvent((prev) => ({
			...prev,
			success: payload,
		}));
	};

	const setWarning = (payload) => {
		setEvent((prev) => ({
			...prev,
			warning: payload,
		}));
	};

	const setError = (payload) => {
		setEvent((prev) => ({
			...prev,
			error: payload,
		}));
	};

	return [event, setSuccess, setWarning, setError];
}

export default useNotifications;
