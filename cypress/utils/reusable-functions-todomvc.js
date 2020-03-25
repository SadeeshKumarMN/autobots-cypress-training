/// <reference types="cypress" />

export function createTodo(todoText) {
    cy.get('.new-todo').type(todoText + '{enter}')
  }
  