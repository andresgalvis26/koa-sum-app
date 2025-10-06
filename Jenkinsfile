pipeline {
    agent {
        docker {
            image 'node:22-alpine'
            args '-p 3000:3000'
        }
    }

    stages {
        stage('Instalar dependencias') {
            steps {
                sh 'npm install'
            }
        }

        stage('Ejecutar pruebas') {
            steps {
                sh 'npm test'
            }
        }
    }

    post {
        always {
            echo 'El pipeline ha finalizado.'
        }
    }
}