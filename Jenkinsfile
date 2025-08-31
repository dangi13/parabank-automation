pipeline {
    agent {
        docker {
           image 'mcr.microsoft.com/playwright:v1.55.0-noble'
        }
    }

    environment {
        // This makes the docker command available to the agent { docker { ... } } step
       PATH = "/usr/local/bin:${env.PATH}"
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx playwright test --reporter=html'
            }
        }
        
        stage('Publish Reports') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**/*', fingerprint: true
            }
        }
    }
}