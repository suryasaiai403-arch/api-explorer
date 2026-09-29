import { AlertCircle, RefreshCw, Search } from 'lucide-react';

export function LoadingGrid() {
  return <div className="grid">{Array.from({length:8},(_,i)=><div className="card skeleton" key={i}><div/><div/><div/></div>)}</div>;
}
export function ErrorState({ message, onRetry }) {
  return <div className="state error"><AlertCircle size={38}/><h2>Couldn’t load the data</h2><p>{message}</p><button onClick={onRetry}><RefreshCw size={16}/> Try again</button></div>;
}
export function EmptyState() {
  return <div className="state"><Search size={38}/><h2>No results found</h2><p>Try a different search term or filter.</p></div>;
}