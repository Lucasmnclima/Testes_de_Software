// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('token', (email, senha) => {
    cy.request({
        method: 'POST',
        url: '/login',
        body: {
            "email": email,
            "password": senha 
          }
      }).then(Response => {
        return Response.body.authorization
      })
})

Cypress.Commands.add('cadastrarProduto', (token, produto, preco, descricao, quantidade) => {
    cy.request({
        method: 'POST',
        url: '/produtos',
        headers: {Authorization: token},
        body: {
            "nome": produto,
            "preco": preco,
            "descricao": descricao,
            "quantidade": quantidade
          }, failOnStatusCode: false 
          /* Esse código é uma recomendação do próprio cypress.
          Quando o status code sai da família 200 ou 300 (que são os considerados sucesso). 
          Esse failOnStatusCode: false serve para validar status code de sucesso 400 ou otros */
    })
})