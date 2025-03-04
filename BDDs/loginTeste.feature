Feature: Tela de login
    Como aluno do Portal EBAC
    Quero me autenticar
    Para visualizar minhas notas


    Background:
        Given que eu acesse a página de autenticação do portal EBAC

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

    Scenario Outline: Autenticar multiplos usuários
        When eu digitar o <usuario>
        And a senha <senha>
        Then deve exibir uma mensagem de sucesso: <mensagem>

        Examples:
            | usuario           | senha    | mensagem       |
            | lucas@ebac.com.br | senha123 | "Olá, Lucas"   |
            | lucas@ebac.com.br | senha123 | "Olá, Isadora" |
            | lucas@ebac.com.br | senha123 | "Olá, Marcela" |
            | lucas@ebac.com.br | senha123 | "Olá, Karine"  |