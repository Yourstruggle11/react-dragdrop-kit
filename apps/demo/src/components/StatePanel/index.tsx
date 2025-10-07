import type { OrderUpdate } from 'react-dragdrop-kit';
import type { Item } from '../../types/item';

type Props = {
	show: boolean;
	items: Item[];
	lastUpdates: OrderUpdate[];
	historyIndex: number;
	historyLen: number;
};

export default function StatePanel({ show, items, lastUpdates, historyIndex, historyLen }: Props) {
  if (!show) return null;

  return (
    <div
      className="panel"
      style={{
        position: 'sticky',
        top: 20,
        maxHeight: 'calc(100vh - 40px)',
        overflow: 'auto',
        width: '100%',
        boxShadow: '0 8px 32px rgba(102,126,234,0.10), 0 2px 8px rgba(0,0,0,0.08)',
        padding: '32px 24px',
        background: 'rgba(255,255,255,0.92)',
        borderRadius: 20,
      }}
      aria-label="State Panel"
      role="region"
      tabIndex={0}
    >
      <h3 style={{ marginTop: 0, fontWeight: 800, fontSize: 20, color: '#667eea', letterSpacing: 0.2 }}>Current State</h3>
      <pre
        style={{
          margin: 0,
          padding: 14,
          background: '#f9fafb',
          border: '1.5px solid #e5e7eb',
          borderRadius: 10,
          fontSize: 13,
          maxHeight: 250,
          overflow: 'auto',
          color: '#22223b',
          fontWeight: 600,
        }}
      >
        {JSON.stringify(items, null, 2)}
      </pre>

      <h3 style={{ marginTop: 22, fontWeight: 800, fontSize: 18, color: '#667eea', letterSpacing: 0.2 }}>Last Updates</h3>
      {lastUpdates.length ? (
        <pre
          style={{
            margin: 0,
            padding: 14,
            background: '#f9fafb',
            border: '1.5px solid #e5e7eb',
            borderRadius: 10,
            fontSize: 13,
            maxHeight: 200,
            overflow: 'auto',
            color: '#22223b',
            fontWeight: 600,
          }}
        >
          {JSON.stringify(lastUpdates, null, 2)}
        </pre>
      ) : (
        <p style={{ color: '#b3b8d0', fontSize: 14, fontWeight: 600, marginTop: 8 }}>Drag items to see updates</p>
      )}

      <div style={{ marginTop: 22, padding: 14, background: '#f0f4ff', borderRadius: 10, boxShadow: '0 2px 8px rgba(102,126,234,0.08)' }}>
        <div style={{ fontSize: 13, color: '#4b5563', fontWeight: 700 }}>
          <span style={{ color: '#667eea' }}>History:</span> {historyIndex + 1} / {historyLen}
        </div>
        <div style={{ fontSize: 13, color: '#4b5563', marginTop: 4, fontWeight: 700 }}>
          <span style={{ color: '#667eea' }}>Total moves:</span> {lastUpdates.reduce((acc, u) => acc + (u.moved ? 1 : 0), 0)}
        </div>
      </div>
    </div>
  );
}
