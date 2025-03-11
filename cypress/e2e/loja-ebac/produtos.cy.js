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

    cy.fixture('produtos').then(dados => { //criei produtos.json para armazenar os produtos
        dados.forEach(produto => { // Com o forEach, percorremos cada produto do arquivo produtos.json
            produtosPage.buscarProduto(produto.nomeProduto) // Buscamos o produto na loja
            produtosPage.addProdutoCarrinho( // Adicionamos o produto ao carrinho
                produto.tamanho, // escolhendo o tamanho
                produto.cor,  // escolhendo a cor
                produto.quantidade) // escolhendo a quantidade
            cy.get('.woocommerce-message').should('contain', produto.nomeProduto) // Validamos se o produto foi adicionado ao carrinho
            cy.get('.woocommerce-message').find('a').click() // Clicamos no link para ir para o carrinho
        })
    })
});