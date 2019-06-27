pipeline {
  agent {
        docker {
            image 'node:10.16'
            args '-p 4200:80'
        }
    }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }
  }
}
