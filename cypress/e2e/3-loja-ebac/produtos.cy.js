/// <reference types="cypress" />
// Referencia para o sistema entender que é um cypress code

describe('Funcionalidade: Produtos - Loja EBAC', () => {
    
    beforeEach(() => {
        cy.visit('produtos')
    });

    it('Deve selecionar um produto da lista', () => {
        cy.get('.product-block').contains('Ariel Roll').click()
        cy.get('.summary.entry-summary > .price > .woocommerce-Price-amount.amount').should('exist')
    });
});