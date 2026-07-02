/* 
 * EmptyState — reused for both "no search results" and "load error"
 * (see HomeScreen). Kept generic (title/body/optional action) rather
 * than building two separate components for what's visually the same
 * pattern.
*/

interface EmptyStateProps {
  title: string;
  body: string;
  /** Optional recovery action, e.g. "Clear filters" — omit for states
   *  with no obvious next step (like a load error). */
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ title, body, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <p className="empty-state__title">{title}</p>
      <p>{body}</p>
      {action && (
        <button type="button" className="btn btn-ghost" onClick={action.onClick} style={{ marginTop: 12 }}>
          {action.label}
        </button>
      )}
    </div>
  );
}
