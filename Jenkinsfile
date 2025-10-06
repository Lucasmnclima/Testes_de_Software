// Inicia a definição do nosso pipeline
pipeline {
    // Define o ambiente de execução. Note que atualizei a imagem para uma versão mais recente
    // do Cypress, que é mais provável que o seu projeto 'loja-ebac' use.
    agent {
        docker { image 'cypress/included:12.17.4' }
    }

    // Passo 1: Definir os Parâmetros (O "Menu de Opções")
    // Aqui criamos o menu dropdown que aparecerá no Jenkins.
    parameters {
        choice(
            name: 'SUITE_DE_TESTES',
            choices: ['loja-ebac', 'basico-v2'],
            description: 'Qual conjunto de testes você deseja executar?'
        )
    }

    // Passo 2: Definir os Estágios
    stages {
        stage('Checkout') {
            steps {
                echo 'Baixando o código do repositório...'
                checkout scm
            }
        }

        // Este estágio agora tem lógica para decidir o que fazer
        stage('Instalar & Testar') {
            steps {
                // O bloco 'script' nos permite usar lógica como 'if/else'
                script {
                    // SE o usuário escolheu 'loja-ebac' no menu...
                    if (params.SUITE_DE_TESTES == 'loja-ebac') {
                        echo "Executando a suíte de testes: Loja EBAC"
                        
                        // Passos para o projeto principal (loja-ebac)
                        sh 'npm ci'
                        // Usamos a flag --spec para dizer ao Cypress para rodar apenas os testes da pasta especificada
                        sh 'npx cypress run --spec "cypress/e2e/loja-ebac/*.cy.js" --reporter junit --reporter-options "mochaFile=results/results-ebac.xml,toConsole=true"'

                    // SENÃO, SE o usuário escolheu 'basico-v2'...
                    } else if (params.SUITE_DE_TESTES == 'basico-v2') {
                        echo "Executando a suíte de testes: Básico v2"
                        
                        // Passos para o sub-projeto (basico-v2)
                        // Note que ainda precisamos do 'dir' aqui
                        dir('cypress-basico-v2') {
                            sh 'npm ci'
                            sh 'npx cypress run --reporter junit --reporter-options "mochaFile=../results/results-basico.xml,toConsole=true"'
                        }
                    }
                }
            }
        }
    }

    // Passo 3: Ações Pós-Execução (Agora funciona para ambos)
    post {
        always {
            echo 'Processo finalizado. Gerando relatórios...'

            // O JUnit agora procura por qualquer arquivo .xml na pasta results
            junit 'results/*.xml'

            // O 'archiveArtifacts' agora procura vídeos e screenshots em qualquer subpasta do projeto
            archiveArtifacts artifacts: '**/cypress/videos/**/*.mp4, **/cypress/screenshots/**/*.png', allowEmptyArchive: true
        }
    }
}