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
    stage('Build') {
      steps {
        sh 'npm install'
        // stash includes: 'node_modules/', name: 'node_modules'
      }
    }
  }
}
