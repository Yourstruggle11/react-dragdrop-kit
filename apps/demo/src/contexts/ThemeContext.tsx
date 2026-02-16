import { useState, useEffect, type ReactNode } from 'react';
import { ThemeContext, type ThemeMode } from './theme-context';

interface ThemeProviderProps {
	children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
	const [mode, setModeState] = useState<ThemeMode>(() => {
		// Check localStorage or system preference
		const stored = localStorage.getItem('theme-mode') as ThemeMode | null;
		if (stored) return stored;

		// Check system preference
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			return 'dark';
		}

		return 'light';
	});

	useEffect(() => {
		// Persist to localStorage
		localStorage.setItem('theme-mode', mode);

		// Update document class for global styling
		document.documentElement.classList.remove('light', 'dark');
		document.documentElement.classList.add(mode);
		document.documentElement.setAttribute('data-theme', mode);
	}, [mode]);

	const toggleMode = () => {
		setModeState((prev) => (prev === 'light' ? 'dark' : 'light'));
	};

	const setMode = (newMode: ThemeMode) => {
		setModeState(newMode);
	};

	return (
		<ThemeContext.Provider value={{ mode, toggleMode, setMode }}>
			{children}
		</ThemeContext.Provider>
	);
}

