import React,{useEffect,useMemo,useState} from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import PostCard from './components/PostCard';
import { LoadingGrid, ErrorState, EmptyState } from './components/States';
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
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),8000);
    try{
      const response=await fetch(API,{signal:controller.signal});
      if(!response.ok) throw new Error(`Request failed with status ${response.status}.`);
      const data=await response.json();
      if(!Array.isArray(data)) throw new Error('The API returned an unexpected response.');
      setPosts(data);
    }catch(err){
      setError(err.name==='AbortError'?'The request timed out. Please try again.':(err.message||'Something went wrong.'));
    }finally{
      clearTimeout(timeout);
      setLoading(false);
    }
  };

  useEffect(()=>{load();},[]);

  const filtered=useMemo(()=>posts.filter(post=>{
    const matchesUser=user==='all'||String(post.userId)===user;
    const text=(post.title+' '+post.body).toLowerCase();
    return matchesUser && text.includes(query.toLowerCase().trim());
  }),[posts,query,user]);

  return <div className="app">
    <Header/>
    <main className="container">
      <Toolbar query={query} setQuery={setQuery} user={user} setUser={setUser} onRefresh={load} loading={loading}/>
      <div className="meta"><span>{loading?'Loading data...':`${filtered.length} results`}</span><span>Source: JSONPlaceholder</span></div>
      {loading && <LoadingGrid/>}
      {!loading && error && <ErrorState message={error} onRetry={load}/>}
      {!loading && !error && filtered.length===0 && <EmptyState/>}
      {!loading && !error && filtered.length>0 && <div className="grid">{filtered.map(post=><PostCard key={post.id} post={post}/>)}</div>}
    </main>
    <footer>Built with React • Fetch API • Reusable components • Responsive UI</footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);