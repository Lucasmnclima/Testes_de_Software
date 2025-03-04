# Critérios de Aceitação:
# 1 – Deve ser cadastrado com todos os dados obrigatórios, marcado com asteriscos
# 2 – Não deve permitir campo e-mail com formato inválido. Sistema deve inserir uma mensagem de erro
# 3 – Ao tentar cadastrar com campos vazios, deve exibir mensagem de alerta.

Feature: Tela de cadastro - checkout

    Como cliente da EBAC-SHOP
    Quero fazer concluir meu cadastro
    Para finalizar minha compra

    Background: Realizar cadastro
        Given que eu acesse a página de cadastro da plataforma EBAC-SHOP

    Scenario Outline: Cadastro com sucesso
        When eu preencher o campo nome completo com "Lucas"
        And o campo e-mail com "lucas@ebac.com.br"
        And o campo senha com "senha@123"
        And o campo confirmação de senha com "senha@123"
        And eu clicar no botão "Cadastrar"
        Then deve exibir uma mensagem de sucesso: "Cadastro realizado com sucesso"
        Examples:
            | nome completo* | e-mail*              | senha*        | confirmar senha* | mensagem                       |
            | Lucas          | lucas@ebac.com.br    | senha@123     | senha@123        | Cadastro realizado com sucesso |
            | Maria          | maria@ebac.com.br    | maria@456     | maria@456        | Cadastro realizado com sucesso |
            | João           | joao@ebac.com.br     | joao@789      | joao@789         | Cadastro realizado com sucesso |
            | Ana            | ana@ebac.com.br      | ana@101112    | ana@101112       | Cadastro realizado com sucesso |
            | Carlos         | carlos@ebac.com.br   | carlos@1314   | carlos@1314      | Cadastro realizado com sucesso |
            | Julia          | julia@ebac.com.br    | julia@1516    | julia@1516       | Cadastro realizado com sucesso |
            | Pedro          | pedro@ebac.com.br    | pedro@1718    | pedro@1718       | Cadastro realizado com sucesso |
            | Fernanda       | fernanda@ebac.com.br | fernanda@1920 | fernanda@1920    | Cadastro realizado com sucesso |
            | Roberto        | roberto@ebac.com.br  | roberto@2122  | roberto@2122     | Cadastro realizado com sucesso |
            | Camila         | camila@ebac.com.br   | camila@2324   | camila@2324      | Cadastro realizado com sucesso |

    Scenario: E-mail inválido
        When eu preencher o campo e-mail com informações inválidas "email@invalido"
        And eu clicar no botão "Cadastrar"
        Then deve exibir uma mensagem de erro: "E-mail inválido"

    Scenario: Campos vazios
        When eu clicar no botão "Cadastrar" sem preencher os campos obrigatórios
        Then deve exibir uma mensagem de alerta: "Preencha todos os campos obrigatórios"