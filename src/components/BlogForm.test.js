import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import BlogForm from './BlogForm'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('write blog title here')
  const inputAuthor = screen.getByPlaceholderText('write blog author here')
  const inputUrl = screen.getByPlaceholderText('write blog url here')
  const sendButton = screen.getByText('create')

  await user.type(inputTitle, 'Fake Blog')
  await user.type(inputAuthor, 'John Doe')
  await user.type(inputUrl, 'real.com')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Fake Blog')
  expect(createBlog.mock.calls[0][0].author).toBe('John Doe')
  expect(createBlog.mock.calls[0][0].url).toBe('real.com')
})