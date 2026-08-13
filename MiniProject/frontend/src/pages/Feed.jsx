import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Feed = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get('https://glowing-waffle-g45pg6jpj6q7fpwgq-3000.app.github.dev/posts')
      .then((res) => {
        const fetchedPosts = res.data.posts || res.data
        setPosts(fetchedPosts)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <section className="feed-section">
      <h1>Latest Posts</h1>

      <div className="posts-list">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id || post.id} className="post-card">
              <img 
                src={post.image || "https://unsplash.com"} 
                alt={post.title} 
              />
              <h3>{post.title}</h3>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#666' }}>No posts found.</p>
        )}
      </div>
    </section>
  )
}

export default Feed
