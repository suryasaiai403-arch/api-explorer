import { Database } from 'lucide-react';

export default function Header() {
  return (
    <header className="hero">
      <div className="nav">
        <div className="brand"><span className="logo"><Database size={20}/></span> API Explorer</div>
        <span className="status"><i/> Live API</span>
      </div>
      <div className="hero-copy">
        <p className="eyebrow">PUBLIC REST API • REACT FRONTEND</p>
        <h1>Explore live data,<br/><span>beautifully.</span></h1>
        <p>Search and filter live API data with responsive UI, reusable components, loading feedback, and resilient error handling.</p>
      </div>
    </header>
  );
}