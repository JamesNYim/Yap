import React, { useState } from 'react';
import InfiniteScroll from  "react-infinite-scroll-component";

const BACKEND_URL = 'http://localhost:8888'

export default function Feed() {
    const [posts, setPosts] = useState([]);
    
    const fetchPosts = async () => {
        try {
            const response = fetch(
                BACKEND_URL + '/testKid',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            response.then(response => response.json())
            .then(data => {
                    console.log(data.posts);
                    setPosts(data.posts)
                }
            )
        }
        catch(e) {
            console.log("There was an error fetching posts", e);

        }
    }
    
    return (
        <div class = "scrollFeed">
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchPosts}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
                { posts.map((post, index) => (<p key={index}> {post.content}</p>)) }
                
            </InfiniteScroll>
            <button onClick={fetchPosts}>Load Posts</button> {/* Button to trigger fetchPosts */}
            
        </div>
    ) 
}
