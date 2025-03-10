/// <reference types="cypress" />
// Referencia para o sistema entender que é um cypress code

import produtosPage from '../../support/page-objects/produtos.page'

describe('Funcionalidade: Produtos - Loja EBAC', () => {
    
    beforeEach(() => {
        produtosPage.visitarUrl()
    });

    // it('Deve selecionar um produto da lista', () => {
    //     // No lugar de .contains() também é possível usar .first() para pegar o primeiro elemento
    //     // .last() para pegar o último elemento
    //     // .eq(2) para pegar o elemento na posição 2
    //     cy.get('.product-block').contains('Ariel Roll').click()
    //     cy.get('.summary.entry-summary > .price > .woocommerce-Price-amount.amount').should('exist')
    // });

    it('Deve selecionar um produto da lista', () => {
        produtosPage.buscarProdutoLista('Ariel Roll')
        cy.get('.summary.entry-summary > .price > .woocommerce-Price-amount.amount').should('exist')
    });

    it('Deve buscar um produto com sucesso', () => {
        let produto = 'Circe Hooded Ice Fleece'
        produtosPage.buscarProduto(produto)
        cy.get('.product_title').should('contain', produto)
    });

    it('Deve visitar a página do produto específico', () => {
        produtosPage.visitarProuto('Selene Yoga Hoodie')
    });

    it('Deve adicionar produto ao carrinho', () => {
        let quantidade = 7
        produtosPage.buscarProduto('Selene Yoga Hoodie') // buscando produto
        produtosPage.addProdutoCarrinho('M', 'Purple', quantidade) /* adicionando produto ao carrinho O produto está configurado no support */
        cy.get('.woocommerce-message').should('contain', 'foram adicionados no seu carrinho.') // validando mensagem de sucesso
        
    });

    it.only('Deve adicionar produto ao carrinho - buscando da massa de dados', () => {
        cy.fixture('produtos').then(dados => {
            produtosPage.buscarProduto(dados[0].nomeProduto) 
            produtosPage.addProdutoCarrinho(
                dados[0].tamanho, 
                dados[0].cor, 
                dados[0].quantidade)
            cy.get('.woocommerce-message').should('contain', dados[0].nomeProduto)
        })
    });
});