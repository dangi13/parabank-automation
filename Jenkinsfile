pipeline {
    agent any // Use any available agent, which will be my machine. we can use our custom agent also, now sicne we have only one machine we can use any.
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
                      -e BUILD_NUMBER="$BUILD_NUMBER" \\
                      mcr.microsoft.com/playwright:v1.54.2 \\
                      /bin/bash -c "npm ci && npx playwright install chromium --with-deps && npx playwright test"
                '''
            }
        }
    }

    post {
        always {
            stage('Publish Reports') {
                steps {
                    archiveArtifacts artifacts: 'playwright-report/**/*', fingerprint: true
                }
            }
        }

    post {
        always {
            script {
                if (fileExists('playwright-report/index.html')) {
                    def reportUrl = "${env.BUILD_URL}artifact/playwright-report/index.html"
                    echo "Playwright Report URL: ${reportUrl}"
            } else {
                    echo "No Playwright report generated."
            }
        }
    }
}
}
