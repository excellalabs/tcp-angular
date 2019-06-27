pipeline {
  agent {
        docker {
            image 'centos/nodejs-10-centos7'
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
        // stash includes: 'node_modules/', name: 'node_modules'
      }
    }
  }
}
