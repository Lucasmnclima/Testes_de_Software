pipeline {
    // Não vamos definir um agente global. Cada estágio dirá onde deve rodar.
    agent none 

    parameters {
        choice(
            name: 'SUITE_DE_TESTES',
            choices: ['loja-ebac', 'basico-v2'],
            description: 'Qual conjunto de testes você deseja executar?'
        )
    }

    stages {
        // Estágio 1: Baixar o código. Pode rodar em qualquer agente.
        stage('Checkout') {
            agent any
            steps {
                echo 'Baixando o código do repositório...'
                checkout scm
            }
        }

        // Estágio 2: Instalar e Testar. ESTE roda dentro do Docker.
        stage('Install & Test') {
            agent {
                docker { image 'cypress/included:12.17.4' }
            }
            steps {
                script {
                    if (params.SUITE_DE_TESTES == 'loja-ebac') {
                        echo "Executando a suíte de testes: Loja EBAC"
                        sh 'npm ci'
                        sh 'npx cypress run --spec "cypress/e2e/loja-ebac/*.cy.js" --reporter junit --reporter-options "mochaFile=results/results-ebac.xml,toConsole=true"'
                    } else if (params.SUITE_DE_TESTES == 'basico-v2') {
                        echo "Executando a suíte de testes: Básico v2"
                        dir('cypress-basico-v2') {
                            sh 'npm ci'
                            sh 'npx cypress run --reporter junit --reporter-options "mochaFile=../results/results-basico.xml,toConsole=true"'
                        }
                    }
                }
            }
        }

        // Estágio 3: Publicar os resultados. Roda no agente principal do Jenkins.
        stage('Publicar Resultados') {
            agent any
            steps {
                echo 'Processo finalizado. Gerando relatórios...'
                // O 'always()' garante que os relatórios sejam publicados mesmo se os testes falharem
                always {
                    junit 'results/*.xml'
                    archiveArtifacts artifacts: '**/cypress/videos/**/*.mp4, **/cypress/screenshots/**/*.png', allowEmptyArchive: true
                }
            }
        }
    }
}