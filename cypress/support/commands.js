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

Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha)
    cy.get('.woocommerce-form > .button').click()
})
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


// -- Cadastro --

Cypress.Commands.add('preCadastro', (email, senhaVelha, primeiroNome, segundoNome, novaSenha) =>{
    
    cy.get('#reg_email').type(email) 
    cy.get('#reg_password').type(senhaVelha)
    cy.get(':nth-child(4) > .button').click()

    cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
    cy.get('#account_first_name').type(primeiroNome)
    cy.get('#account_last_name').type(segundoNome)

    cy.get('#account_display_name').type(primeiroNome + segundoNome)
    
    cy.get('#password_current').type(senhaVelha)
    cy.get('#password_1').type(novaSenha)
    cy.get('#password_2').type(novaSenha)

    cy.get('.woocommerce-Button').click()
})

Cypress.Commands.add('detalhesConta' , (nome, sobrenome, nomeExibicao) => {
    cy.get('#account_first_name').type(nome)
    cy.get('#account_last_name').type(sobrenome)
    cy.get('#account_display_name').type(nomeExibicao)
    cy.get('.woocommerce-Button').click()
})