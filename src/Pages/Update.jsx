import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const supabaseUrl = 'https://whbsffbkywqxhstupgzp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoYnNmZmJreXdxeGhzdHVwZ3pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE4NjQ0MTYsImV4cCI6MTk5NzQ0MDQxNn0.WcE6Yu2t4tN6PdIWr-jYBCqRLwEB71NyphwJ-meW9XM';
var isRender = false;
var temp =[];
function Update () {
    const supabase = createClient(supabaseUrl, supabaseKey);
    var params = useParams();
    var [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await supabase
                .from('Posts')
                .select()
                .order('id', { ascending: true })
                setPosts(data);
            var newTemp = posts.filter((post) =>
                post.id == params.id
            )
            temp = newTemp;
        }
        fetchPost().catch(console.error);
        if (temp.length != 0)
        {
            isRender = true;
        }
    })
    const updateInfo = async (event) => {
        let title = document.getElementById("titleHolder").value;
        let description = document.getElementById("descriptionHolder").value;
        await supabase
            .from('Posts')
            .update({ Title: title, Description: description})
            .eq('id', temp[0].id)
    }
    return (
        <div>
            <div>
            {isRender && <input type="text" id = "titleHolder" placeholder="Edit Title"></input>}
            </div>
            <div>
            {isRender && <input type="text" id = "descriptionHolder" placeholder="Edit Description"></input>}
            </div>
            <div>
            <Link to="/"><button onClick={(updateInfo)}>Update Info</button></Link>
                <Link to="/" ><button className = "Button">Cancel</button></Link>
            </div>
        </div>
    )
}

export default Update;