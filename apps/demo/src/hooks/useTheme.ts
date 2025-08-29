import { useState } from 'react';
import { PRESET_THEMES, type ThemeKey,  } from '../constants/themes';
import type { Item } from '../types/item';

export function useTheme(initial: ThemeKey = 'default') {
	const [currentTheme, setCurrentTheme] = useState<ThemeKey>(initial);

	const applyThemeToItems = (items: Item[]): Item[] => {
		const colors = PRESET_THEMES[currentTheme].colors;
		return items.map((it, idx) => ({ ...it, color: colors[idx % colors.length] }));
	};

	const switchTheme = (t: ThemeKey, items: Item[]) => {
		setCurrentTheme(t);
		const colors = PRESET_THEMES[t].colors;
		return items.map((it, idx) => ({ ...it, color: colors[idx % colors.length] }));
	};

	return { currentTheme, switchTheme, applyThemeToItems, PRESET_THEMES };
}
