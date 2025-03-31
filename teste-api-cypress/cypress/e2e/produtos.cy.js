/// <reference types="cypress" />
import contrato from '../contratos/produtos.contrato'
describe('Teste de API - Produtos', () => {

    let token
    /* Token visível para todos os testes criados. Criei o comando token em support/commands.js 
        Posso utilizar token em qualquer teste que eu descreva */
    beforeEach(() => {
        cy.token('fulano@qa.com', 'teste').then(tkn => {
            token = tkn
        })
    })

    it.only('Deve validar contrato de produtos com sucesso', () => {
        cy.request('produtos').then(response => {
            return contrato.validateAsync(response.body)
            /* O validateAsync é uma função do Joi que valida o contrato */            
        })
    })

    it('Deve listar produtos com sucesso - GET', () => {
        cy.request({
            method: 'GET',
            url: '/produtos',
        }).should((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('produtos')
        })
    });

    it('Deve cadastrar produtos com sucesso - POST', () => {
        let produto = 'Produtos EBAC ' + Math.floor(Math.random() * 100000000000)
        /* Com essa função matemática de JS (Math.floor) ele gera um número automaticamente
        juntando com a variável let usuario. Isso evita que o cypress trave e não cadastre
        o mesmo produto*/
        cy.cadastrarProduto(token, produto, 10, 'Cabo USB C', 100)
            .should((response) => {
                expect(response.status).equal(201)
                expect(response.body.message).equal('Cadastro realizado com sucesso')
            })
    });

    it('Deve validar mesnagem de produto cadastrado anteriormente - POST', () => {
        cy.cadastrarProduto(token, 'Cabo USB 001', 10, 'Cabo USB C', 100)
            /* O teste foi codado em support/commands.js
                Aqui, é apenas a função que leva o nome do código
                Isso deixa o código mais fácil de dar manutenção  */
            .should((response) => {
                expect(response.status).equal(400)
                expect(response.body.message).equal('Já existe produto com esse nome')
            })
    });

    it('Deve editar produto com sucesso - PUT', () => {
        let produto = 'Produto EBAC Editado ' + Math.floor(Math.random() * 100000000000)
        cy.cadastrarProduto(token, produto, 10, 'Produto EBAC editado', 100)
            .then(response => {
                let id = response.body._id
                /* Esse é o endereço de quando cadastra um produto */
                cy.request({
                    method: 'PUT',
                    url: `produtos/${id}`, /*Pegando a variável id do cadastro de produtos */
                    headers: { authorization: token },
                    body: {
                        "nome": produto,
                        "preco": 400,
                        "descricao": 'Produto EBAC editado',
                        "quantidade": 150
                    }
                }).should(response => {
                    expect(response.body.message).to.equal('Registro alterado com sucesso')
                    expect(response.status).to.equal(200)
                })
            })
    });

    it('Deve deletar um produto com sucesso - DELETE', () => {
        cy.cadastrarProduto(token, 'Produto para deletar', 10, 'Produto para deletar', 100)
            .then(response => {
                let id = response.body._id
                cy.request({
                    method: 'DELETE',
                    url: `produtos/${id}`,
                    headers: { authorization: token },
                }).should((response) => {
                    expect(response.status).to.equal(200)
                    expect(response.body.message).to.equal('Registro excluído com sucesso')
                })
            })
    });
});