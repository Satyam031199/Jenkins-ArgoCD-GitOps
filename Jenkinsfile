pipeline {
    agent any
    tools{
        nodejs 'NodeJS'
    }
    environment {
        DOCKER_HUB_REPO = 'satyamchaturvedi/jenkins-argo-cd-gitops'
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
                script{
                    echo 'Building Docker Image'
                    docker.build("${DOCKER_HUB_REPO}:latest")
                }
            }
        }
        stage('Trivy Scan') {
            steps {
                script{
                    sh 'trivy image --security-checks vuln --severity HIGH,CRITICAL --no-progress --format table -o trivy-scan-report.txt ${DOCKER_HUB_REPO}:latest'
                    sh 'cat trivy-scan-report.txt'
                }
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
