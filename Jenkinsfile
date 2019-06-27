pipeline {
  stages {
    stage('Checkout') {
        checkout scm
    }
    stage('Build') {
        docker.image('node:10.16').inside {
            sh 'npm install'
            sh 'ng build --progress false --prod --aot'
            sh 'tar -cvzf dist.tar.gz --strip-components=1 dist'
        }
        archive 'dist.tar.gz'
    }
    stage('Test') {
        docker.image('node:10.16').inside {
            sh 'ng test --progress false --watch false'
        }
        junit '**/test-results.xml'
    }
  }
}
