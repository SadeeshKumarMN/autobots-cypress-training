/**
 * Navigate to Bottega Page--https://devcamp.com
 * Close the Modal Pop-up
 * Click to Red Sign-up
 * Assert that we are on the right page
 * Fill out the form & Click Create Account
 * Assert we are logged in at the profile page.
 * Assert that name is visible
 */

/// <reference types="cypress" />

describe('autobots-cypress week2 challenge', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('.mc-closeModal', { timeout: 7000 }).should('be.visible').click()
        cy.get('.mc-modal').should('not.be.visible')
    })

    it('Validate Sign-up Feature For Creating Account', () => {
        cy.get('.btn-primary > a', { timeout: 7000 }).contains('Sign').click()
        cy.url().should('contain', '/users/sign_up')
        const user = Cypress.env('user')
        cy.get('#user_first_name').type(user.firstname)
        cy.get('#user_last_name').type(user.lastname)
        cy.get('#user_email').type(user.email)
        cy.get('#user_password').type(user.password)
        cy.get('#user_password_confirmation').type(user.password)
        cy.get('#submit-btn').contains('Create').click()
    })

    it('Validate Successful Login from UI', () => {
        cy.get('.btn-default > a').contains('Log in').click()
        cy.url().should('contain', '/users/sign_in')
        const user = Cypress.env('user')
        cy.get('#user_email').type(user.email)
        cy.get('#user_password').type(user.password)
        cy.get('.signin-button').click()
        cy.url().should('contain', 'public-profile')
        cy.get('a.dropdown-toggle').should('contain', 'Sadeesh Kumar MN')
        cy.get('.username').should('contain', 'MN')
    })
})
