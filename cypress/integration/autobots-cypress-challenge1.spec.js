/// <reference types="cypress" />

describe('autobots-cypress week1 challenge', ()=> {

    beforeEach(() => {
        cy.visit('https://www.qap.dev/')
      })

    it('Click the Become a presenter button',() => {
        cy.contains('Become a').click()
        cy.url().should('eq', 'https://www.qap.dev/present-at-qap')
    })
    
    it('Verify the name \'Kidman\' in the leadership page',() => {  
        //cy.get('.Footer-nav > :nth-child(1) > [href="/leadership"]').click()
        cy.get('.Header-nav-folder-item').contains('Leadership').click({force:true})
        cy.get('.Main-content').should('contain.text', 'Carlos Kidman')
        cy.get('strong:contains("Carlos Kidman")').should('have.length', 2)
    })

})

