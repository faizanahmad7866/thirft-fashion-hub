pipeline{
    agent any

    environment{
        // Define environment variables here
        IMAGE = 'docker.io/mohammadfaizan786/python-app'
        TAG = "${env.BUILD_NUMBER}"

    }
    stages{

        stage('Checkout'){
            steps{
                // Checkout the code from the repository
                git branch: 'main',
                    url:'https://github.com/faizanahmad7866/thirft-fashion-hub.git'
            }
        }
        stage('Build'){
            steps{
                // Build the Docker image 
                sh 'docker build -t "$IMAGE:$TAG" "$IMAGE:latest" .'

            }

        }
        stage('Push'){
            steps{
                 withCredentials([usernamePassword(credentialsId: 'docker'
          usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PWD')]) {
                    sh 'echo "$DOCKERHUB_PWD" | docker login -u "$DOCKERHUB_USER" --password-stdin'
                    sh 'docker push "$IMAGE:$TAG"'
                    sh 'docker push "$IMAGE:latest"'
                }
            }
        }

        stage('Deploy'){
            steps{
                // Deploy the application using kubectl
                sh 'docker pull "$IMAGE:$TAG"'
                sh 'docker rm -f python-app || true'
                sh 'docker run -d --name python-app -p 3000:3000 "$IMAGE:$TAG"'
            }
        }
    }
}