pipeline {
    agent any
    tools{
        nodejs 'NodeJS'
    }
    stages {
        stage('Checkout Github') {
            steps {
                git branch: 'main', credentialsId: 'GitOps-token-Github', url: 'https://github.com/Satyam031199/Jenkins-ArgoCD-GitOps.git'
            }
        }
        stage('Install node dependencies') {
            steps {
                sh 'npm install'        
            }
        }
        stage('Build Docker Image') {
            steps {
                sh '''
                echo Building Docker Image
                '''
            }
        }
        stage('Trivy Scan') {
            steps {
                sh '''
                echo Scanning Docker image with Trivy
                '''
            }
        }
        stage('Push Image to DockerHub') {
            steps {
                sh '''
                echo Pushing image to DockerHub
                '''
            }
        }
        stage('Install Kubectl & ArgoCD CLI') {
            steps {
                sh '''
                echo Installing Argo-CLI
                '''
            }
        }
    }

    post {
        success {
            echo 'Build & Deploy completed successfully!'
        }
        failure {
            echo 'Build & Deploy failed. Check logs.'
        }
    }
}
