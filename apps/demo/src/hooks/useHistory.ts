import { useEffect, useState } from 'react';

export function useHistory<T>(initial: T) {
	const [history, setHistory] = useState<T[]>([initial]);
	const [index, setIndex] = useState(0);
	const [value, setValue] = useState(initial);

	useEffect(() => {
		if (JSON.stringify(value) !== JSON.stringify(history[index])) {
			const next = history.slice(0, index + 1);
			next.push(value);
			setHistory(next);
			setIndex(next.length - 1);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	const undo = () => {
		if (index > 0) {
			setIndex(index - 1);
			setValue(history[index - 1]);
		}
	};

	const redo = () => {
		if (index < history.length - 1) {
			setIndex(index + 1);
			setValue(history[index + 1]);
		}
	};

	return { value, setValue, history, index, undo, redo };
}
