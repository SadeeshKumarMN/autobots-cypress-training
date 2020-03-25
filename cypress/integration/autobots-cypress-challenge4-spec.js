/*Autobots-Cypress- Week 4 Challenges
  1.set the baseUrl config
  2. add a beforeEach to visit the app
  3. Write a custom command, createDefaultTodos 
     >>It should return 3 todos
     >>alias the output of the command
     >>rewrite the test to create todos using the command
  4. Write a custom command createTodo 
  5. Using at least one of the new commands, write tests
     >>To edit todos 
     >>To make sure the new-todo element is in focus (hint: there's a cypress command for that)
     >>To assert the text input is trimmed
  6.Using a beforeEach that visits the app and creates todos write tests to assert
    >>Other controls are hidden when editing
    >>Edits are saved on blur
    >>Text input is trimmed 
    >>The item is removed if empty text string was entered
    >>Edits are cancelled on escape
  7.Test the Clear completed button
    >>displays the correct text
    >>completed items are removed when clicked
    >>hidden when there are no completed items
*/
/// <reference types="cypress" />
/// <reference types="../support" />

// @ts-check
describe('autobots-cypress week4 challenge', () => {
    let TODO_ITEM_ONE = 'Belive we are great soul'
    let TODO_ITEM_TWO = 'Be consiousness'
    let TODO_ITEM_THREE = 'That\'s more than enough'
    beforeEach(() => {
        cy.visit('/')
    })

    it('CreateDefaultToDos', () => {
        cy.createDefaultTodos().as('default_todos')
        cy.get('.todo-count').contains('3 items left')
        cy.get('@default_todos')
            .eq(0)
            .find('label')
            .should('contain', TODO_ITEM_ONE)

        cy.get('@default_todos')
            .eq(1)
            .find('label')
            .should('contain', TODO_ITEM_TWO)

        cy.get('@default_todos')
            .eq(2)
            .find('label')
            .should('contain', TODO_ITEM_THREE)
    })

    it('CreateToDos', () => {
        cy.createTodos(TODO_ITEM_TWO).as('createdOne')
        cy.get('@createdOne')
            .eq(0)
            .should('have.text', TODO_ITEM_TWO)
    })
    it('Is New ToDo element is focused', function () {
        cy.focused().should('have.class', 'new-todo')
    })
    it('Edit ToDos', function () {
        cy.createTodos(TODO_ITEM_TWO).as('createdOne')
        cy.get('@createdOne')
            .eq(0)
            .as('secondTodo')
            .find('label')
            .dblclick()
        cy.get('@secondTodo')
            .find('.edit')
            .clear()
            .type('Just Observe{enter}')
        cy.get('@secondTodo')
            .eq(0)
            .should('have.text', 'Just Observe')
    })
    it.only('Is the given text input is trimmed', function () {
        cy.createTodos(`    ${TODO_ITEM_THREE}    `).as('createdOne')
      cy.get('@createdOne')
      .should('have.text', TODO_ITEM_THREE)
    })
})