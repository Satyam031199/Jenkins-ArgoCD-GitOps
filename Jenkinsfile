pipeline {
    agent any
    tools{
        nodejs 'NodeJS'
    }
    environment {
        DOCKER_HUB_REPO = 'satyamchaturvedi/jenkins-argo-cd-gitops'
        DOCKER_HUB_CREDENTIALS_ID = 'jenkins-argo-cd-git-ops-dockerhub'
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
                    dockerImage = docker.build("${DOCKER_HUB_REPO}:latest")
                }
            }
        }
        stage('Trivy Scan') {
            steps {
                script {
                    sh 'trivy image --security-checks vuln --severity HIGH,CRITICAL --skip-update --no-progress --format table -o trivy-scan-report.txt ${DOCKER_HUB_REPO}:latest'
                    sh 'cat trivy-scan-report.txt'
                }
            }
        }
        stage('Push Image to DockerHub') {
            steps {
                script {
                    echo 'Pushing Image to DockerHub'
                    docker.withRegistry('https://registry.hub.docker.com',"${DOCKER_HUB_CREDENTIALS_ID}") {
                         dockerImage.push('latest')
                    }
                }
            }
        }
        stage('Install ArgoCD CLI') {
            steps {
                sh '''
                echo Installing Argo-CLI
                curl -sSL -o /usr/local/bin/argocd https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
				chmod +x /usr/local/bin/argocd
                '''
            }
        }
        stage('Apply Kubernetes Manifests & Sync App with ArgoCD'){
			steps {
				script {
                    kubeconfig(credentialsId: 'kubeconfig', serverUrl: 'https://192.168.49.2:8443') {
                        sh '''
                        argocd login 54.209.162.159:31613 --username admin --password ${kubectl get secret -n argocd argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d}
                        '''
                    }
                }
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
