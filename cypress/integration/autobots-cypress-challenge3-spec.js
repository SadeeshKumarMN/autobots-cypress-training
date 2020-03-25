/**
Challenges:
1. No todo’s: 
* Are the right elements visible?
2. Create a todo: 
* Can the user type in a todo?
* Is the correct text visible?
* Are the right elements visible?
3. Create a second todo
* Can the user add a second todo?
* Is the correct text visible?
* Are both to-do’s there and in the right order?
4. Create a third todo
* Is the text input cleared after entering a todo?
* Is the “items left” count visible and accurate?
5. Mark a todo as complete
* hint: there's a cy command that I never told you about (in the docs)
* does the completed todo have the right element class?
6. View Completed todo's
* does the list contain the right todo's?
7. Uncomplete a todo
* does the todo disappear from the Completed list?
* Is the todo visible on the All list?
-----Extra Credits------------
8. Edit a todo
* hint: search the docs for the cy commands to double-click and clear text
* Are the right elements visible while editing?
* Does the text change as expected?
9. Create your own test!(Delete a to-do)
* What else should we assert that our app does?
 */

/// <reference types="cypress" />
import { createTodo } from '../utils/reusable-functions-todomvc'
describe('autobots-cypress week3 challenge', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    // Validate the scenario: #1
    it('Validate the visibility of the right elements in home page when no todos', () => {
        cy.title().should('eq', 'React • TodoMVC')
        cy.get('h1').should('be.visible').and('contain.text', 'todos').and('have.css', 'color', 'rgb(184, 63, 69)')
        cy.get('.todo-list li').should('not.exist')
        cy.get('.main').should('not.exist')
        cy.get('.footer').should('not.exist')
        cy.get('.new-todo').should('be.visible').should('to.have.attr', 'placeholder', 'What needs to be done?')
    })

    // Validate the rest of the scenarios(from #2 to #9)
    it('TodoMVC End to End Tests', () => {
        const todo = Cypress.env('todo')
        // #2: Create a new to-do; created a reusable function 'createTodo()'
        createTodo(todo.name1)
        cy.get('.todo-list li').should('have.length', 1)
        // cy.get('.todo-list li:nth-child(1) label').should('have.text', todo.name1).and('not.have.css', 'text-decoration-line', 'line-through')
        // Modified this as per Mike suggestion below to use the chain methods eq and find
        cy.get('.todo-list li').eq(0).find('label').should('contain',todo.name1).and('not.have.css', 'text-decoration-line', 'line-through')
        cy.get('.toggle').should('not.to.be.checked')
        //cy.get('span.todo-count').should('contain.text', '1 item')
        //for precision: prefer, cy.get('span.todo-count').should('have.text', '1 item only')
        cy.get('.todo-count').contains('1 item left ')
        cy.contains('All').should('have.class', 'selected')
        cy.contains('Active').should('have.class', '')
        cy.contains('Completed').should('have.class', '')
        // #3: Create a second to-do
        createTodo(todo.name2)
        cy.get('.todo-list li').eq(1).find('label').should('contain',todo.name2).and('not.have.css', 'text-decoration-line', 'line-through')
        cy.get('.todo-list li').should('have.length', 2)
        // #4: Verifying the ordering of todos
        const todos = [todo.name1, todo.name2]
        cy.get('.todo-list li')
            .should(($ele) => {
                //  expect($ele.eq(0)).to.contain(todo.name1)
                //  expect($ele.eq(1)).to.contain(todo.name2)
                var arrayOfliElements = $ele.map(function (i, el) {
                    return Cypress.$(el).text()
                })
                var arrayOfliElements = arrayOfliElements.get() //convert jquery object to an array (by overwriting / redefining)
                expect(arrayOfliElements).to.have.ordered.members(todos, 'Check the todos list in the same order')
            })
        // ** Mike Code **//
        // cy.get('.new-todo').type(todo.name1+'{enter}').type(todo.name2+'{enter}')
        // cy.get('.todo-list li').should('have.length', 4)
        // cy.get('.todo-count').contains('4 items left ')
        // #4: Create a third to-do
        createTodo(todo.name3)
        cy.get('.new-todo').should('have.value', '')
        // For precision use text instead contain
        cy.get('span.todo-count').should('have.text', '3 items left')

        // #5: Mark the first todo as complete and verify the same
        // cy.get('.todo-list li:nth-child(1) .toggle').click()
        // cy.get('.todo-list li:nth-child(1) .toggle').should('to.be.checked')
        // cy.get('.todo-list li:nth-child(1) label').should('have.css', 'text-decoration-line', 'line-through')
        // As per Mike suggestion, use below:
        //--check() is used to check/select for an element(ex: checkbox/radio) which comes with an <input tag
        cy.get(' todo-list li').eq(0).check()
        cy.get(' todo-list li').eq(0).should('have.class','completed')
        cy.get(' todo-list li').eq(1).should('not.have.class','completed')
        
        // #6: View the Completed todo is available in 'Completed' List 
        cy.contains('Completed').click()
        cy.get('.todo-list li').should('have.length', 1)
        // #7: Uncomplete the todo by toggling & Verify it is not available in the 'Completed' List but in 'All' List
        //--Mike suggestion
        cy.get(' todo-list li').eq(0).find('.toggle').uncheck()
        cy.get(' todo-list li').eq(0).should('not.to.be.checked')
        cy.get(' todo-list li').eq(0).should('not.have.class', 'completed')
        // cy.contains('Completed').click()
        // cy.get('.todo-list li').should('have.length', 0)
        cy.contains('All').click()
        cy.get('.todo-list li').should('have.length', 3)
        // #8: Edit/Clear/Modify the first todo item
        cy.get('.todo-list > li:nth-child(1)').contains(todo.name1).dblclick({ force: true })
        cy.get('.todo-list > li:nth-child(1)').should('have.class', 'editing')
        cy.get('.todo-list li.editing input.edit').clear().type(todo.name1_updated, { delay: 50 }).type('{enter}')
        cy.get('.todo-list li:nth-child(1) label').should('have.text', todo.name1_updated)
        // #9: Delete the first todo item
        cy.get('.todo-list li:nth-child(1) button.destroy').should('be.hidden').
            invoke('show').
            click().get('.todo-list li').should('have.length', 2)
    })

})
