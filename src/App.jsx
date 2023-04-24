import { useState, useEffect } from 'react'
import './App.css'
import { createClient } from '@supabase/supabase-js';
import { Link } from "react-router-dom";
import Create from './Pages/Create';
import Update from './Pages/Create';

const supabaseUrl = 'https://whbsffbkywqxhstupgzp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoYnNmZmJreXdxeGhzdHVwZ3pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE4NjQ0MTYsImV4cCI6MTk5NzQ0MDQxNn0.WcE6Yu2t4tN6PdIWr-jYBCqRLwEB71NyphwJ-meW9XM';
var isRender = false;
function App() {
  const [posts, setPosts] = useState([]);
  const supabase = createClient(supabaseUrl, supabaseKey);
  useEffect(() => {
    const fetchPost = async () => {
        const { data } = await supabase
            .from('Posts')
            .select()
            .order('id', { ascending: true })
            setPosts(data);
            isRender = true;
    }
    fetchPost().catch(console.error);
})
function increaseUpvote(id, vote) {
  const fetchData = async () => {
      await supabase
          .from('Posts')
          .update({Upvote: vote+1})
          .eq('id', id)
          console.log("Update success")
  }
  fetchData().catch(console.error);
}
function deletePost(id) {
  const fetchData = async () => {
      await supabase
          .from('Posts')
          .delete()
          .eq('id', id);
          console.log("Remove success")
  }
  fetchData().catch(console.error);
}
  return (
    <div className="App">
      <div><p>MovieHub</p></div>
      <div><Link to="/Create"><button>Create Post</button></Link></div>
      <div><input type="text" placeholder="Search" ></input></div>
      <div>
        {isRender && posts.map((post) => {
          var tempLink = "/Update/" + post.id;
          return (
          <div>
            <div>Posted on {post.Date} at {post.Time}<Link to={tempLink}><button>Edit</button></Link><button onClick={() => deletePost(post.id)}>Remove</button></div>
            <div>{post.Title}</div>
            <div>{post.Description}</div>
            <div><Link to=""><button>View Comments</button></Link></div>
            <div><button onClick={() => increaseUpvote(post.id,post.Upvote)}>{post.Upvote} Upvotes</button></div>
            {/* <div>{post.Comment.map(comment => {return (
              <div>{comment}</div>
            )})}</div> */}
          </div>
        )})}
      </div>
    </div>
  )
}

export default App
