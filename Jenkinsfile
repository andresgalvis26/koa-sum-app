pipeline {
    agent any

    tools {
        nodejs '22.20.0' // nombre que configuraste en Global Tool Configuration
    }

    environment {
        DOCKER_USER = 'anfelipegalvis'
        IMAGE_NAME = "${DOCKER_USER}/koa-sum-app"
        IMAGE_TAG = 'latest'
        AZURE_APP_NAME = 'koa-sum-api'
        AZURE_RG = 'rg-koa-sum'
    }

    stages {
        stage('Construir imagen Docker') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Análisis de código con SonarQube') {
            environment {
                scannerHome = tool 'SonarQubeScanner' // nombre que configuraste en Global Tool Configuration
            }
            steps {
                withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                    withSonarQubeEnv('SonarQubeServer') { // nombre que diste al servidor en Configure System
                        sh """
                            ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=koa-sum-app \
                            -Dsonar.sources=. \
                            -Dsonar.exclusions=**/node_modules/**
                        """
                    }
                }

            }
        }

        stage('Esperar Quality Gate') {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }


        stage('Publicar imagen en Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-token', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        sh "echo $DOCKERHUB_PASSWORD | docker login -u $DOCKERHUB_USERNAME --password-stdin"
                        sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                    }
                }
            }
        }


        stage('Desplegar en Azure Web App') {
            steps {
                withCredentials([string(credentialsId: 'azure-cli-sp', variable: 'AZURE_CREDENTIALS_JSON')]) {
                    // Escribir las credenciales en un archivo temporal
                    writeFile file: 'azure_creds.json', text: "${AZURE_CREDENTIALS_JSON}"

                    sh """
                        AZURE_APP_ID=\$(jq -r .clientId azure_creds.json)
                        AZURE_PASSWORD=\$(jq -r .clientSecret azure_creds.json)
                        AZURE_TENANT=\$(jq -r .tenantId azure_creds.json)

                        echo "🔹 Iniciando sesión en Azure..."
                        az login --service-principal -u \$AZURE_APP_ID -p \$AZURE_PASSWORD --tenant \$AZURE_TENANT

                        echo "🔹 Reiniciando Web App para aplicar la nueva imagen..."
                        az webapp restart --name ${AZURE_APP_NAME} --resource-group ${AZURE_RG}
                    """
                }
            }
        }


        stage('Clean up') {
            steps {
                sh "docker rmi ${IMAGE_NAME}:${IMAGE_TAG} || true"
            }
        }
    }

    post {
        always {
            echo 'El pipeline ha finalizado.'
        }
    }
}