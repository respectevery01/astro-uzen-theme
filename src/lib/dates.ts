/**
 * formatDate — shared date formatting utilities
 * Import: import { formatDate, formatDateShort } from '../lib/dates';
 */

export function formatDate(d: Date): string {
	return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function formatDateShort(d: Date): string {
	const m = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	return `${m}.${day}`;
}

export function formatDateMono(d: Date): string {
	return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
