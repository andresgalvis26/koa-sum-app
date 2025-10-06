pipeline {
    agent any

    stages {
        stage('Clonar repositorio') {
            steps {
                git 'https://github.com/tu_usuario/tu_repositorio.git'
            }
        }

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