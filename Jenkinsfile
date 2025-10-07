// pipeline {
//     agent {
//         docker {
//             image 'node:22-alpine'
//             args '-p 3000:3000'
//         }
//     }

//     stages {
//         stage('Instalar dependencias') {
//             steps {
//                 sh 'npm install'
//             }
//         }

//         stage('Ejecutar pruebas') {
//             steps {
//                 sh 'npm test'
//             }
//         }
//     }

//     post {
//         always {
//             echo 'El pipeline ha finalizado.'
//         }
//     }
// }

pipeline {
    agent any

    environment {
        IMAGE_NAME = 'mi-aplicacion-node'
        IMAGE_TAG = 'latest'
    }

    stages {
        stage('Construir imagen Docker') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
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