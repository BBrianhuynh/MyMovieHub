import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Link } from "react-router-dom";

const supabaseUrl = 'https://whbsffbkywqxhstupgzp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoYnNmZmJreXdxeGhzdHVwZ3pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE4NjQ0MTYsImV4cCI6MTk5NzQ0MDQxNn0.WcE6Yu2t4tN6PdIWr-jYBCqRLwEB71NyphwJ-meW9XM';

function Create(){
    const [date, setDate] = useState(new Date());
    const supabase = createClient(supabaseUrl, supabaseKey);
    const createPost = async (event) => {
        event.preventDefault();
        let title = document.getElementById("titleHolder").value;
        let description = document.getElementById("descriptionHolder").value;
        setInterval(() => setDate(new Date()), 30000);
        let time = date.toLocaleTimeString();
        let dateTemp = date.toLocaleDateString();
        await supabase
        .from('Posts')
        .insert([{Title: title, Description: description, Date: dateTemp, Time: time}])
        .select();
        window.location.reload(true);
      }
    return(
        <div>
            <div><Link to="/"><button>Return to Posts</button></Link></div>
            <div><input type="text" id="titleHolder" placeholder="Title"></input></div>
            <div><input type="text" id="descriptionHolder" placeholder="Description"></input></div>
            <div><button onClick={createPost}>Create Post</button></div>
        </div>
    )
}
export default Create;