pipeline {
  agent {
        docker {
            image 'duluca/minimal-node-chromium'
            args '-p 4200:80'
        }
    }
   environment {
     HOME = '.'
   }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
    stage('Test') {
      steps {
        sh 'npm run test:headless -- --watch false'
      }
    }
  }
}
