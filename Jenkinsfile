pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright/node:lts'
            args '-v $PWD:/usr/src/app -w /usr/src/app'
        }
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
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