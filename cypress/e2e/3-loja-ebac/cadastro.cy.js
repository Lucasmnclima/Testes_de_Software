/// <reference types="cypress" />
// Referencia para o sistema entender que é um cypress code
import { faker } from '@faker-js/faker';


describe('Funcionalidade: Cadastro na loja EBAC', () => {
    
    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    });

    it('Deve fazer cadastro com sucesso', () => {
        cy.get('#reg_email').type(faker.internet.email()) 
            // gerando um email fake. Faker cria aleatoriamente emails sempre que gerar o teste
        cy.get('#reg_password').type('teste@123')
        cy.get(':nth-child(4) > .button').click('')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('exist')

        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(faker.person.firstName())
        cy.get('#account_last_name').type(faker.person.lastName())

        // cy.get('#account_display_name').type(faker.person.fullName())
        
        // cy.get('#password_current').type(faker.internet.password())
        // cy.get('#password_1').type(faker.internet.password())
        // cy.get('#password_2').type(faker.internet.password())

        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-message').should('exist')
    });

    it.only('Deve fazer cadastro com sucesso - usando variáveis', () => {
        var nome = faker.person.firstName()
        var email = faker.internet.email(nome)
        var sobrenome = faker.person.lastName()
        var password = faker.internet.password()
        var newPassword = faker.internet.password()

        cy.get('#reg_email').type(email) 
        cy.get('#reg_password').type(password)
        cy.get(':nth-child(4) > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('exist')

        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(nome)
        cy.get('#account_last_name').type(sobrenome)

        cy.get('#account_display_name').type(nome)
        
        cy.get('#password_current').type(password)
        cy.get('#password_1').type(newPassword)
        cy.get('#password_2').type(newPassword)

        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-message').should('exist')
    });
});