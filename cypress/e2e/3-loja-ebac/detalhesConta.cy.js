/// <reference types="cypress" />

describe('Funcionalidade: Detalhes da Conta - Loja EBAC', () => {
    
    beforeEach(() => {
        cy.visit('minha-conta/edit-account')
        cy.fixture('perfil').then(dados => {
            cy.login(dados.usuario, dados.senha , {log: false})
        })  
    });

    it('Deve completar detalhes da conta com sucesso', () => {
        cy.detalhesConta('Lucas', 'Nascimento', 'Lucas.QA')
        cy.get('.woocommerce-message').should('exist')
    })
})