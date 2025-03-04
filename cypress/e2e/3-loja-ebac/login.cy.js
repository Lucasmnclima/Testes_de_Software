/// <reference types="cypress" />
// Referencia para o sistema entender que é um cypress code

// Caminho feliz
describe('Funcionalidade: Login na loja EBAC', () => {
    
    it('Deve fazer login com sucesso', () => {
        // Acessar a página de login visita a url que queremos testar
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
        // Inserir o email
        cy.get('#username').type('lucas@teste.com.br')
        // Inserir a senha
        cy.get('#password').type('teste@123')
        // Clicar no botão de login
        cy.get('.woocommerce-form > .button').click('')
        // Mensagem de login
        // should é um método de validação. Está validando a mensagem de login correto
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, lucas (não é lucas? Sair)')
    })

    //Senha incorreta
    it('Em caso de digitar senha incorreta', () => {
        // Acessar a página de login visita a url que queremos testar
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
        // Inserir o email
        cy.get('#username').type('lucas@teste.com.br')
        // Inserir a senha incorreta
        cy.get('#password').type('123458')
        // Clicar no botão de login
        cy.get('.woocommerce-form > .button').click('')
        // Mensagem de erro
        // should é um método de validação. Está validando a mensagem de login correto
        cy.get('.woocommerce-error > li').should('contain', 'Erro: A senha fornecida para o e-mail lucas@teste.com.br está incorreta. Perdeu a senha?')

    })
})