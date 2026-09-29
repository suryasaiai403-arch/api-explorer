export default function PostCard({ post }) {
  return (
    <article className="card">
      <div className="card-top"><span className="badge">POST #{String(post.id).padStart(2,'0')}</span><span className="user">User {post.userId}</span></div>
      <h2>{post.title}</h2><p>{post.body}</p>
      <div className="card-foot">Public API data <span>→</span></div>
    </article>
  );
}