pipeline {
    agent any

    stages {
        stage('Build Custom Docker Image') {
            steps {
                script {
                    // Use the full path to docker to ensure the command is found.
                    // This command builds your Dockerfile and tags the image for caching.
                    sh '/usr/local/bin/docker build -t playwright-ci-image:v1.54.2 .'
                }
            }
        }
        
        stage('Run Tests in Docker') {
            steps {
                sh '''
                    # Use the full path to docker and the custom image we just built.
                    # This is fast because the image is cached locally.
                    /usr/local/bin/docker run --rm \\
                      -v $PWD:/usr/src/app -w /usr/src/app \\
                      playwright-ci-image:v1.54.2 \\
                      /bin/bash -c "npm ci && npx playwright test --reporter=html"
                '''
            }
        }
        
        stage('Publish Reports') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**/*', fingerprint: true
            }
        }
    }
    
    post {
        always {
            script {
                def reportUrl = "${env.BUILD_URL}artifact/playwright-report/index.html"
                echo "Playwright Report URL: ${reportUrl}"
            }
        }
    }
}