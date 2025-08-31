pipeline {
    agent any // Use any available agent, which will be your machine.
        environment {
        // Skip browser download during npm install
        PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = '1'
    }
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
                      mcr.microsoft.com/playwright:v1.54.2 \\
                      /bin/bash -c "npm ci && npx playwright install chromium --with-deps && npx playwright test"
                '''
            }
        }
        
        stage('Publish Reports') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**/*', fingerprint: true
            }
        }
        
        post {
        always {
            script {
                // Construct and print the URL to the build logs
                def reportUrl = "${env.BUILD_URL}artifact/playwright-report/index.html"
                echo "Playwright Report URL: ${reportUrl}"
            }
        }
    }
    }
}