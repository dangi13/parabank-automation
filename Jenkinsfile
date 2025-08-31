pipeline {
    agent any // Use any available agent, which will be your machine.
    
    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
        
        stage('Run Tests in Docker') {
            steps {
                sh '''
                    # Manually run the Docker command with its full path
                    /usr/local/bin/docker run --rm \\
                      -v $PWD:/usr/src/app -w /usr/src/app \\
                      mcr.microsoft.com/playwright:v1.55.0-noble \\
                      /bin/bash -c "npm ci && npx playwright install --with-deps && npx playwright test --reporter=html"
                '''
            }
        }
        
        stage('Publish Reports') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**/*', fingerprint: true
            }
        }
    }
}