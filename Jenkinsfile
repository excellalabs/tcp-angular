pipeline {
  agent {
        docker {
            image 'node:10.16'
            args '-p 4200:80'
        }
    }
  stages {
    stage('Checkout') {
        checkout scm
    }
    stage('Build') {
        sh 'npm install'
    }
  }
}
