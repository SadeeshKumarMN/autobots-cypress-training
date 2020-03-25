// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('createDefaultTodos', function() {
    let TODO_ITEM_ONE = 'Belive we are great soul'
    let TODO_ITEM_TWO = 'Be consiousness'
    let TODO_ITEM_THREE = 'That\'s more than enough'
    cy.get('.new-todo')
      .type(`${TODO_ITEM_ONE}{enter}`)
      .type(`${TODO_ITEM_TWO}{enter}`)
      .type(`${TODO_ITEM_THREE}{enter}`)
    return cy.get('.todo-list li')
})

Cypress.Commands.add('createTodos', function(todoText) {
  cy.get('.new-todo')
    .type(`${todoText}{enter}`)
  cy.get('.todo-list')
    .contains('li', todoText.trim()) // for trimming the extra whitespaces in the input
    .then(function ($li) {
      return $li
    })
})
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
