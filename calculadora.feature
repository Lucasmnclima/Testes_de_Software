Feature: Feature name

    Como um usuario do sistema
    Quero realizar calculos matematicos com a calculadora
    Para que eu possa realizar operacoes matematicas

    Scenario: Soma numeros
        Given que eu acesse a calculadora
        When eu somar 2 + 2
        Then o resultado deve ser 4
    
    Scenario Outline: soma de 2 numeros
        Given que eu acesse a calculadora
        When eu somar <numero1> + <numero2>
        Then o resultado deve ser <resultado>

    Examples:
            | numero1 | numero2 | resultado |
            | 1       | 1       | 2         |
            | 1       | 2       | 3         |
            | 2       | 2       | 4         |
            | 2       | 3       | 5         |
            | 3       | 3       | 6         |
            | 3       | 4       | 7         |
            | 4       | 4       | 8         |
            | 4       | 5       | 9         |
            | 5       | 5       | 10        |
            | 6       | 6       | 12        |
            | 7       | 7       | 14        |
            | 8       | 8       | 16        |
            | 9       | 9       | 18        |
            | 10      | 10      | 20        |
            | 11      | 11      | 22        |
            | 12      | 12      | 24        |
            | 13      | 13      | 26        |
            | 14      | 14      | 28        |
            | 15      | 15      | 30        |
            | 16      | 16      | 32        |
            | 17      | 17      | 34        |
            | 18      | 18      | 36        |
            | 19      | 19      | 38        |
            | 20      | 20      | 40        |
            | 21      | 21      | 42        |
            | 22      | 22      | 44        |
            | 23      | 23      | 46        |
            | 24      | 24      | 48        |