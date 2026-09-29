import { Search, RefreshCw, SlidersHorizontal } from 'lucide-react';

export default function Toolbar({ query, setQuery, user, setUser, onRefresh, loading }) {
  return (
    <section className="toolbar">
      <div className="search"><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search posts..." aria-label="Search posts" /></div>
      <div className="filter"><SlidersHorizontal size={18}/><select value={user} onChange={e=>setUser(e.target.value)} aria-label="Filter by user"><option value="all">All users</option>{Array.from({length:10},(_,i)=><option key={i+1} value={i+1}>User {i+1}</option>)}</select></div>
      <button className="refresh" onClick={onRefresh} disabled={loading}><RefreshCw size={17} className={loading?'spin':''}/> Refresh</button>
    </section>
  );
}