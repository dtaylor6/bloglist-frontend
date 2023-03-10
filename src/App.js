import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Toggleable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

let timer

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    else {
      loginFormRef.current.toggleVisibility()
    }
  }, [])

  const errorPopup = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const notificationPopup = (message) => {
    console.log(`message popup: ${message}`)
    setNotificationMessage(message)
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notificationPopup('log in successful')
    } catch (exception) {
      errorPopup('wrong username or password')
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedNote => {
        setBlogs(blogs.concat(returnedNote))
      })
  }

  const likeBlog = (id) => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes+1 }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error => {
        errorPopup(error.response.data.error)
      })
  }

  const deleteBlog = (id) => {
    const blog = blogs.find(b => b.id === id)

    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id))
        })
        .catch(error => {
          errorPopup(error.response.data.error)
        })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
    notificationPopup('logged out')
  }

  const blogFormRef = useRef()
  const loginFormRef = useRef()

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} isError={true} />
      <Notification message={notificationMessage} isError={false} />
      {user === null ?
        <div>
          <Togglable buttonLabel='login' ref={loginFormRef}>
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
          </Togglable>
        </div> :
        <div>
          <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      }
      <div>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={likeBlog}
            removeBlog={deleteBlog}
            loggedInUser={user && user.username}
          />
        )}
      </div>
    </div>
  )
}

export default App
