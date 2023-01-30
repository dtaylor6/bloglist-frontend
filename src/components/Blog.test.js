import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

test('<Blog> does not render its URL or number of likes by default', async () => {
  const blog = {
    title: 'test123',
    author: 'John Doe',
    url: 'fake.com',
    likes: 10,
    user: {
      name: 'Roto Rooter',
      username: 'leetblogger123'
    }
  }

  const { container } = render(<Blog blog={blog}/>)
  const div = container.querySelector('.blog')
  expect(div).toBeDefined()

  expect(div).toHaveTextContent('test123')
  expect(div).toHaveTextContent('John Doe')
  expect(div).not.toHaveTextContent('fake.com')
  expect(div).not.toHaveTextContent('10')
})

test('<Blog> renders its URL and number of likes when is view is clicked', async () => {
  const blog = {
    title: 'test123',
    author: 'John Doe',
    url: 'fake.com',
    likes: 10,
    user: {
      name: 'Roto Rooter',
      username: 'leetblogger123'
    }
  }

  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.blog')
  expect(div).toBeDefined()

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(div).toHaveTextContent('fake.com')
  expect(div).toHaveTextContent('10')
})

test('<Blog> renders its URL and number of likes when is view is clicked', async () => {
  const blog = {
    title: 'test123',
    author: 'John Doe',
    url: 'fake.com',
    likes: 10,
    user: {
      name: 'Roto Rooter',
      username: 'leetblogger123'
    }
  }

  const likeMockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} updateBlog={likeMockHandler} />)
  const div = container.querySelector('.blog')
  expect(div).toBeDefined()

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(likeMockHandler.mock.calls).toHaveLength(2)
})