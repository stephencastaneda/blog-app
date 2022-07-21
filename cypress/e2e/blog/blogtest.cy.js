describe('Blogs are visible', function() {

  it('displays blogs', () => {

    cy.visit('http://localhost:3000')
    cy.get('[data-cy=blog-post]').should('be.visible')
  })
})



describe('Dark Mode Toggle Test', function () {

  it("starts with white background", function () {

    cy.visit('http://localhost:3000')
    cy.get('body').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
  
  })

  it("toggles dark background", function () {

    cy.get('[data-cy=dark-toggle]').click() 
  // Tailwind adds a div with a class dark when it compiles based off theme   
    cy.get('.dark').should('be.visible')
  
  })

  it("toggles white background", function () {

    cy.get('[data-cy=light-toggle]').click()
    cy.get('.light').should('be.visible')
 
  })
})


describe('Link opens github and twitter', function() {
  
  it('opens github', () => {

    cy.visit('http://localhost:3000')
    cy.get('.github-button').should('have.attr', 'href', 'https://github.com/stephencastaneda') 
    cy.get('.github-button').click()
  
  })

  it('opens twitter', () => {

    cy.get('.twitter-button').should('have.attr', 'href', 'https://twitter.com/steve_cmajor')
    cy.get('.twitter-button').click()
   
  })
})


