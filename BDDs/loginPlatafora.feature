# Critérios de Aceitação:
# 1 – Ao inserir dados válidos deve ser direcionado para a tela de checkout
# 2 – Ao inserir um dos campos inválidos deve exibir uma mensagem de alerta “Usuário ou senha inválidos”

Feature: Login na plataforma

    Como cliente da EBAC-SHOP
    Quero fazer o login (autenticação) na plataforma
    Para visualizar meus pedidos

    Background: inserir dados válidos
        Given que eu acesse a página de login da plataforma EBAC-SHOP

    Scenario: Autenticação válida
        When eu digitar o usuário "lucas@ebac.com.br"
        And a senha "senha@123"
        Then deve exibir uma mensagem de boas vindas: "Olá, Lucas"

     Scenario: Usuário Inexistente
        When eu digitar o usuário "inexistente@ebac.com.br"
        And a senha "senha@123"
        Then deve exibir uma mensagem de alerta: "Usuário inexistente"

    Scenario: Usuário com senha inválida
        When eu digitar o usuário "lucas@ebac.com.br"
        And a senha "senhaInválida"
        Then deve exibir uma mensagem de alerta: "Usuário ou senha inválidos"

    Scenario Outline: autenticar múltiplos usuários
        When eu digitar o <usuario>
        And a senha <senha>
        Then deve exibir uma mensagem de sucesso: <mensagem>
        Examples:
            | usuario              | senha        | mensagem        |
            | lucas@ebac.com.br    | senha123     | "Olá, Lucas"    |
            | maria@ebac.com.br    | maria456     | "Olá, Maria"    |
            | joao@ebac.com.br     | joao789      | "Olá, João"     |
            | ana@ebac.com.br      | ana101112    | "Olá, Ana"      |
            | carlos@ebac.com.br   | carlos1314   | "Olá, Carlos"   |
            | julia@ebac.com.br    | julia1516    | "Olá, Julia"    |
            | pedro@ebac.com.br    | pedro1718    | "Olá, Pedro"    |
            | fernanda@ebac.com.br | fernanda1920 | "Olá, Fernanda" |
            | roberto@ebac.com.br  | roberto2122  | "Olá, Roberto"  |
            | camila@ebac.com.br   | camila2324   | "Olá, Camila"   |