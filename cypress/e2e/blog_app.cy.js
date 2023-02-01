describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset') // reset test mongodb
    cy.createUser({ username: 'testuser', password: 'password123' })
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('password123')
      cy.get('#login-button').click()
      cy.contains('log in successful')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('password12')
      cy.get('#login-button').click()
      cy.contains('log in successful').should('not.exist')
      cy.contains('wrong username or password')
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser', password: 'password123' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Test Blog')
      cy.get('#author').type('John Doe')
      cy.get('#url').type('fake.com')
      cy.get('#create-button').click()
      cy.contains('Test Blog John Doe')
    })
  })
})