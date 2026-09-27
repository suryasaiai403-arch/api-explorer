import React,{useEffect,useMemo,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Search, RefreshCw, SlidersHorizontal, AlertCircle, Database} from 'lucide-react';
import './styles.css';

const API='https://jsonplaceholder.typicode.com/posts';

function App(){
  const [posts,setPosts]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState('');
  const [query,setQuery]=useState('');
  const [user,setUser]=useState('all');

  const load=async()=>{
    setLoading(true); setError('');
    try{
      const r=await fetch(API);
      if(!r.ok) throw new Error('Unable to fetch data.');
      setPosts(await r.json());
    }catch(e){setError(e.message||'Something went wrong.');}
    finally{setLoading(false);}
  };
  useEffect(()=>{load()},[]);

  const filtered=useMemo(()=>posts.filter(p=>{
    const matchesUser=user==='all'||String(p.userId)===user;
    const text=(p.title+' '+p.body).toLowerCase();
    return matchesUser && text.includes(query.toLowerCase());
  }),[posts,query,user]);

  return <div className="app">
    <header className="hero">
      <div className="nav"><div className="brand"><span className="logo"><Database size={20}/></span> API Explorer</div><span className="status"><i/> Live API</span></div>
      <div className="hero-copy"><p className="eyebrow">PUBLIC REST API • REACT FRONTEND</p><h1>Explore live data,<br/><span>beautifully.</span></h1><p>Search and filter a real API with responsive UI, loading feedback, and resilient error handling.</p></div>
    </header>

    <main className="container">
      <section className="toolbar">
        <div className="search"><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search posts..." /></div>
        <div className="filter"><SlidersHorizontal size={18}/><select value={user} onChange={e=>setUser(e.target.value)}><option value="all">All users</option>{Array.from({length:10},(_,i)=><option key={i+1} value={i+1}>User {i+1}</option>)}</select></div>
        <button className="refresh" onClick={load} disabled={loading}><RefreshCw size={17} className={loading?'spin':''}/> Refresh</button>
      </section>

      <div className="meta"><span>{loading?'Loading data...':`${filtered.length} results`}</span><span>Source: JSONPlaceholder</span></div>

      {loading && <div className="grid">{Array.from({length:8},(_,i)=><div className="card skeleton" key={i}><div/><div/><div/></div>)}</div>}
      {!loading && error && <div className="state error"><AlertCircle size={38}/><h2>Couldn’t load the data</h2><p>{error}</p><button onClick={load}><RefreshCw size={16}/> Try again</button></div>}
      {!loading && !error && filtered.length===0 && <div className="state"><Search size={38}/><h2>No results found</h2><p>Try a different search term or filter.</p></div>}
      {!loading && !error && filtered.length>0 && <div className="grid">{filtered.map(p=><article className="card" key={p.id}><div className="card-top"><span className="badge">POST #{String(p.id).padStart(2,'0')}</span><span className="user">User {p.userId}</span></div><h2>{p.title}</h2><p>{p.body}</p><div className="card-foot">Public API data <span>→</span></div></article>)}</div>}
    </main>
    <footer>Built with React • Fetch API • Responsive components</footer>
  </div>
}
createRoot(document.getElementById('root')).render(<App/>);