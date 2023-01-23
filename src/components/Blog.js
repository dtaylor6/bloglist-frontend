import { useState } from "react"

const Blog = ({ blog }) => {
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
      <p>likes </p>
      <p>{blog.user && blog.user.name}</p>
    </div>
  
  const label = visibile ? 'hide' : 'view'

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      
      <button onClick={toggleVisibility}>{label}</button>
      {visibile && extraInfo}
    </div>
  )
}

export default Blog