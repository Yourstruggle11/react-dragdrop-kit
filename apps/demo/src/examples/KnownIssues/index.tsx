import React, { useMemo } from 'react';
import { useThemeMode } from '@/contexts/ThemeContext';
import { colors, spacing, borderRadius, typography, shadows } from '@/constants/designSystem';
// Vite: import file contents as raw string
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Vite's ?raw is provided by bundler
import issuesMarkdown from '../../../../../KNOWN_ISSUES.md?raw';

type InlineNode = string | { type: 'code' | 'strong' | 'em'; content: string };

function renderInline(text: string): InlineNode[] {
	const parts = text.split(/(`[^`]+`)/g);
	const nodes: InlineNode[] = [];
	for (const part of parts) {
		if (part.startsWith('`') && part.endsWith('`')) {
			nodes.push({ type: 'code', content: part.slice(1, -1) });
		} else if (part) {
			const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
			for (const b of boldParts) {
				if (b.startsWith('**') && b.endsWith('**')) {
					nodes.push({ type: 'strong', content: b.slice(2, -2) });
				} else if (b) {
					const emParts = b.split(/(_[^_]+_)/g);
					for (const e of emParts) {
						if (e.startsWith('_') && e.endsWith('_')) {
							nodes.push({ type: 'em', content: e.slice(1, -1) });
						} else if (e) {
							nodes.push(e);
						}
					}
				}
			}
		}
	}
	return nodes;
}

export default function KnownIssuesExample() {
	const { mode } = useThemeMode();
	const isDark = mode === 'dark';

	const textColor = isDark ? colors.gray[100] : colors.gray[900];
	const mutedText = isDark ? colors.gray[400] : colors.gray[600];
	const cardBg = isDark ? colors.gray[800] : colors.white;
	const borderColor = isDark ? colors.gray[700] : colors.gray[200];

	const blocks = useMemo(() => {
		const lines = issuesMarkdown.split(/\r?\n/);
		const elements: React.ReactNode[] = [];
		let i = 0;
		let inCode = false;
		let codeBuffer: string[] = [];
		let listBuffer: string[] = [];
		let orderedListBuffer: string[] = [];

		const flushParagraph = (text: string) => {
			const children = renderInline(text).map((n, idx) =>
				typeof n === 'string' ? (
					<span key={idx}>{n}</span>
				) : n.type === 'code' ? (
					<code
						key={idx}
						style={{
							padding: '0 6px',
							background: isDark ? colors.gray[900] : colors.gray[100],
							color: isDark ? colors.gray[200] : colors.gray[800],
							borderRadius: borderRadius.sm,
							fontFamily: typography.fontFamily.mono,
							fontSize: typography.fontSize.sm
						}}
					>
						{n.content}
					</code>
				) : n.type === 'strong' ? (
					<strong key={idx}>{n.content}</strong>
				) : (
					<em key={idx}>{n.content}</em>
				)
			);
			elements.push(
				<p key={`p-${elements.length}`} style={{ color: mutedText, lineHeight: typography.lineHeight.relaxed }}>
					{children}
				</p>
			);
		};

		const flushUnordered = () => {
			if (listBuffer.length === 0) return;
			elements.push(
				<ul key={`ul-${elements.length}`} style={{ margin: 0, paddingLeft: spacing.xl, color: mutedText }}>
					{listBuffer.map((item, idx) => (
						<li key={idx}>
							{renderInline(item).map((n, j) =>
								typeof n === 'string' ? (
									<span key={j}>{n}</span>
								) : n.type === 'code' ? (
									<code
										key={j}
										style={{
											padding: '0 6px',
											background: isDark ? colors.gray[900] : colors.gray[100],
											color: isDark ? colors.gray[200] : colors.gray[800],
											borderRadius: borderRadius.sm,
											fontFamily: typography.fontFamily.mono,
											fontSize: typography.fontSize.sm
										}}
									>
										{n.content}
									</code>
								) : n.type === 'strong' ? (
									<strong key={j}>{n.content}</strong>
								) : (
									<em key={j}>{n.content}</em>
								)
							)}
						</li>
					))}
				</ul>
			);
			listBuffer = [];
		};

		const flushOrdered = () => {
			if (orderedListBuffer.length === 0) return;
			elements.push(
				<ol key={`ol-${elements.length}`} style={{ margin: 0, paddingLeft: spacing.xl, color: mutedText }}>
					{orderedListBuffer.map((item, idx) => (
						<li key={idx}>
							{renderInline(item).map((n, j) =>
								typeof n === 'string' ? (
									<span key={j}>{n}</span>
								) : n.type === 'code' ? (
									<code
										key={j}
										style={{
											padding: '0 6px',
											background: isDark ? colors.gray[900] : colors.gray[100],
											color: isDark ? colors.gray[200] : colors.gray[800],
											borderRadius: borderRadius.sm,
											fontFamily: typography.fontFamily.mono,
											fontSize: typography.fontSize.sm
										}}
									>
										{n.content}
									</code>
								) : n.type === 'strong' ? (
									<strong key={j}>{n.content}</strong>
								) : (
									<em key={j}>{n.content}</em>
								)
							)}
						</li>
					))}
				</ol>
			);
			orderedListBuffer = [];
		};

		while (i < lines.length) {
			const line = lines[i];

			const fenceMatch = line.match(/^```(.*)/);
			if (fenceMatch) {
				if (!inCode) {
					inCode = true;
					codeBuffer = [];
				} else {
					elements.push(
						<pre
							key={`code-${elements.length}`}
							style={{
								margin: 0,
								padding: spacing.md,
								background: isDark ? colors.gray[900] : colors.gray[100],
								color: isDark ? colors.gray[200] : colors.gray[800],
								border: `1px solid ${borderColor}`,
								borderRadius: borderRadius.lg,
								overflowX: 'auto',
								fontFamily: typography.fontFamily.mono,
								fontSize: typography.fontSize.sm,
								boxShadow: shadows.sm
							}}
						>
							<code style={{ color: isDark ? colors.gray[200] : colors.gray[800] }}>{codeBuffer.join('\n')}</code>
						</pre>
					);
					inCode = false;
					codeBuffer = [];
				}
				i++;
				continue;
			}

			if (inCode) {
				codeBuffer.push(line);
				i++;
				continue;
			}

			if (/^\s*[-*]\s+/.test(line)) {
				flushOrdered();
				listBuffer.push(line.replace(/^\s*[-*]\s+/, '').trim());
				i++;
				if (i >= lines.length || !/^\s*[-*]\s+/.test(lines[i])) flushUnordered();
				continue;
			}

			if (/^\s*\d+\.\s+/.test(line)) {
				flushUnordered();
				orderedListBuffer.push(line.replace(/^\s*\d+\.\s+/, '').trim());
				i++;
				if (i >= lines.length || !/^\s*\d+\.\s+/.test(lines[i])) flushOrdered();
				continue;
			}

			const h3 = line.match(/^###\s+(.*)/);
			if (h3) {
				flushUnordered();
				flushOrdered();
				elements.push(
					<h3
						key={`h3-${elements.length}`}
						style={{
							margin: `${spacing.lg} 0 ${spacing.sm} 0`,
							fontSize: typography.fontSize.lg,
							fontWeight: typography.fontWeight.bold,
							color: textColor
						}}
					>
						{h3[1]}
					</h3>
				);
				i++;
				continue;
			}
			const h2 = line.match(/^##\s+(.*)/);
			if (h2) {
				flushUnordered();
				flushOrdered();
				elements.push(
					<h2
						key={`h2-${elements.length}`}
						style={{
							margin: `${spacing.xl} 0 ${spacing.md} 0`,
							fontSize: typography.fontSize['2xl'],
							fontWeight: typography.fontWeight.bold,
							color: textColor
						}}
					>
						{h2[1]}
					</h2>
				);
				i++;
				continue;
			}
			const h1 = line.match(/^#\s+(.*)/);
			if (h1) {
				flushUnordered();
				flushOrdered();
				elements.push(
					<h1
						key={`h1-${elements.length}`}
						style={{
							margin: `${spacing.xl} 0 ${spacing.md} 0`,
							fontSize: typography.fontSize['3xl'],
							fontWeight: typography.fontWeight.bold,
							color: textColor
						}}
					>
						{h1[1]}
					</h1>
				);
				i++;
				continue;
			}

			if (/^---+$/.test(line.trim())) {
				elements.push(
					<hr
						key={`hr-${elements.length}`}
						style={{ border: 'none', borderTop: `1px solid ${borderColor}`, margin: `${spacing.lg} 0` }}
					/>
				);
				i++;
				continue;
			}

			if (line.trim().length > 0) {
				flushUnordered();
				flushOrdered();
				flushParagraph(line);
			}
			i++;
		}

		flushUnordered();
		flushOrdered();
		return elements;
	}, [issuesMarkdown, isDark]);

	return (
		<div style={{ padding: spacing.xl }}>
			<div style={{ maxWidth: '1200px', margin: '0 auto' }}>
				<div
					style={{
						padding: spacing.lg,
						background: cardBg,
						borderRadius: borderRadius.xl,
						border: `1px solid ${borderColor}`,
						boxShadow: shadows.sm
					}}
				>
					{blocks}
				</div>
			</div>
		</div>
	);
}

