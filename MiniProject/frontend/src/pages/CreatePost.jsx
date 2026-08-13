import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('image', image)

    axios.post('https://glowing-waffle-g45pg6jpj6q7fpwgq-3000.app.github.dev/create-post', formData)
      .then(() => {
        navigate('/posts')
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <section className='create-post-section'>
      <h1>Create Post</h1>
        
      <form onSubmit={handleSubmit}>
        <input 
          type='file' 
          accept='image/*' 
          onChange={(e) => setImage(e.target.files[0])} 
          required
        />
        <input 
          type='text' 
          placeholder='Enter title' 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required 
        />
        <button type='submit'>Submit</button>
      </form>
    </section>
  )
}

export default CreatePost
