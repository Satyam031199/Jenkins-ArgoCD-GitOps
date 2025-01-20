pipeline {
    agent any
    stages {
        stage('Checkout Github') {
            steps {
                git branch: 'main', credentialsId: 'GitOps-token-Github', url: 'https://github.com/Satyam031199/Jenkins-ArgoCD-GitOps.git'
            }
        }
        stage('Install node dependencies') {
            steps {
                sh '''
                echo Installing node dependencies
                '''
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
        stage('Apply Kubernetes Manifests & Sync App with ArgoCD') {
            steps {
                sh '''
                echo Applying Kubernetes Manifests & Sync App with ArgoCD
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
