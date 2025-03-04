# Critérios de Aceitação:
# 1 – Seleções de cor, tamanho e quantidade devem ser obrigatórios
# 2 – Deve permitir apenas 10 produtos por venda
# 3 –Quando eu clicar no botão “limpar” deve voltar ao estado original

Feature: Configurar produto conforme tamanho e gosto

    Como cliente da EBAC-SHOP
    Quero configurar meu produto de acordo com meu tamanho e gosto
    E escolher a quantidade
    Para depois inserir no carrinho

    Background:
        Given que eu acesse a página de produtos da EBAC-SHOP
        And escolha um produto


    Scenario Outline: Selecionar cor, tamanho e quantidade obrigatórios
        When eu selecionar a <cor>
        And o <tamanho>
        And a <quantidade> maxima de 10 produtos
        Then os produtos devem ser inseridos no carrinho
        Examples:
            | cor      | tamanho | quantidade |
            | azul     | P       | 1          |
            | azul     | M       | 3          |
            | azul     | G       | 6          |
            | azul     | GG      | 10         |
            | vermelho | P       | 4          |
            | vermelho | M       | 8          |
            | vermelho | G       | 10         |
            | vermelho | GG      | 3          |
            | verde    | P       | 2          |
            | verde    | M       | 1          |
            | verde    | G       | 1          |
            | verde    | GG      | 9          |
            | preto    | P       | 1          |
            | preto    | M       | 10         |
            | preto    | G       | 3          |
            | preto    | GG      | 4          |
            | branco   | P       | 1          |
            | branco   | M       | 2          |
            | branco   | G       | 10         |

    Scenario: deve permitir apenas 10 produtos por venda
        When eu selecionar a cor "azul"
        And o tamanho "P"
        And a quantidade "11"
        Then deve exibir uma mensagem de alerta: "Limite de 10 produtos por venda"

    Scenario: quando clicar no botão limpar, deve voltar ao estado original
        When eu selecionar a cor "azul"
        And o tamanho "P"
        And a quantidade "1"
        And clicar no botão limpar
        Then os campos devem ser limpos