class ProdutosPage {
    visitarUrl() {
        cy.visit('produtos')
    }

    buscarProduto(nomeProduto) {
        cy.get('[name="s"]').eq(1).type(nomeProduto) // testando a busca de produtos search
        cy.get('.button-search').eq(1).click() // testando o botão search
    }

    buscarProdutoLista(nomeProduto) {
        cy.get('.products > .row').contains(nomeProduto).click()
    }

    visitarProuto(nomeProduto) {
        // cy.visit(`produtos/${nomeProduto}`)

        const urlFormatada = nomeProduto.replace(/ /g, '-')
        cy.visit(`produtos/${urlFormatada}`)
    }

    addProdutoCarrinho(tamanho, cor, quantidade) {
        cy.get(`.button-variable-item-${tamanho}`).click()
        cy.get(`.button-variable-item-${cor}`).click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()
    }
}

export default new ProdutosPage()