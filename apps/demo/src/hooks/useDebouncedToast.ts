import { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';

/**
 * Hook to debounce toast notifications
 * Useful for drag operations that trigger multiple onReorder callbacks
 */
// Global state to ensure cross-component debouncing
let globalToastTimeout: ReturnType<typeof setTimeout> | null = null;
let globalToastId: string | null = null;

export function useDebouncedToast(delay: number = 300) {
	// Cleanup pending timeouts on unmount to avoid late toasts from previous views
	useEffect(() => {
		return () => {
			if (globalToastTimeout) {
				clearTimeout(globalToastTimeout);
				globalToastTimeout = null;
			}
			// Do NOT dismiss active toasts here to avoid killing a new view's toast
		};
	}, []);

	const showToast = useCallback(
		(message: string, type: 'success' | 'error' | 'loading' = 'success') => {
			// Clear any pending scheduled toast globally
			if (globalToastTimeout) {
				clearTimeout(globalToastTimeout);
				globalToastTimeout = null;
			}

			// Dismiss any currently visible toast created by this manager
			if (globalToastId) {
				toast.dismiss(globalToastId);
				globalToastId = null;
			}

			// Schedule the new toast
			globalToastTimeout = setTimeout(() => {
				let id: string;
				switch (type) {
					case 'success':
						id = toast.success(message, { id: 'debounced-reorder-toast' });
						break;
					case 'error':
						id = toast.error(message, { id: 'debounced-reorder-toast' });
						break;
					case 'loading':
						id = toast.loading(message, { id: 'debounced-reorder-toast' });
						break;
					default:
						id = toast.success(message, { id: 'debounced-reorder-toast' });
				}
				globalToastId = id;
				globalToastTimeout = null;
			}, delay);
		},
		[delay]
	);

	return { showToast };
}
