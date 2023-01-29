import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog, loggedInUser }) => {
  const [visibile, setVisibility] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {setVisibility(!visibile)}

  const extraInfo = <div>
    <p>{blog.url}</p>
    <p>likes {blog.likes}<button onClick={() => updateBlog(blog.id)}>like</button></p>
    <p>{blog.user.name}</p>
    {(blog.user.username === loggedInUser) && <p><button onClick={() => removeBlog(blog.id)}>remove</button></p>}
  </div>

  const label = visibile ? 'hide' : 'view'

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}

      <button onClick={toggleVisibility}>{label}</button>
      {visibile && extraInfo}
    </div>
  )
}

export default Blog