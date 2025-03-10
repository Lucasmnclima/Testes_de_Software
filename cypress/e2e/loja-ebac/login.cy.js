/// <reference types="cypress" />
// Referencia para o sistema entender que é um cypress code

const perfil = require('../../fixtures/perfil.json')


// Caminho feliz
/*  Os cenáros ficam dentro do describe. 
    O describe é um agrupador de cenários. 
    O it é o cenário em si. */
describe('Funcionalidade: Login na loja EBAC', () => {

    // BeforeEach é um hook que executa antes de cada teste
    beforeEach(() => {
        // Acessar a página de login visita a url que queremos testar
        cy.visit('minha-conta')
    });

    it('Deve fazer login com sucesso', () => {
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

    // Usuário inválido
    // only é uma forma de rodar apenas um teste
    it('Deve exibir mensagem de erro ao inserir o usuário inválido', () => {
        // Inserir o email inválido
        cy.get('#username').type('lucasteste.com')
        // Inserir a senha
        cy.get('#password').type('teste@123')
        // Clicar no botão de login
        cy.get('.woocommerce-form > .button').click('')
        // Mensagem de erro
        // Uma segunda forma de validar. Verificar se o elemento existe
        cy.get('.woocommerce-error').should('exist')
    });

    // Senha incorreta
    it('Deve exibir uma mensagem de erro ao inserir a senha inválida', () => {
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

    // Teste com arquivo de dados
    it('Deve fazer login com sucesso - Usando massa de dados', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click('')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, lucas (não é lucas? Sair)')
    });

    // Usando Fixture
    it('Deve fazer login com sucesso - Usando Fixture', () => {
        cy.fixture('perfil').then(dados => {
            cy.get('#username').type(dados.usuario , {log: false})
            cy.get('#password').type(dados.senha, {log: false})
            cy.get('.woocommerce-form > .button').click('')
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, lucas (não é lucas? Sair)')
        })
    });

    it.only('Deve fazer login com sucesso - usando comandos customizados', () => {
        cy.login('lucas@teste.com.br', 'teste@123')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('exist')
        
    });
})