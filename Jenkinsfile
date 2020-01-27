void setBuildStatus(String message, String state) {
  step([
      $class: "GitHubCommitStatusSetter",
      reposSource: [$class: "ManuallyEnteredRepositorySource", url: "${env.GIT_URL}"],
      contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "ci/jenkins/build-status"],
      errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
      statusResultSource: [ $class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]] ]
  ]);
}

pipeline {
    agent {
      label 'excellanator'
    }
    environment {
     HOME = '.'
    }
    stages {
      stage('SlackNotify'){
        when {
          expression { env.JOB_BASE_NAME.startsWith('PR') }
        }
        steps {
          slackSend(channel: '#tcp-angular', color: '#FFFF00', message: ":jenkins-triggered: Build Triggered - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
        }
      }
      stage('Checkout') {
        agent { docker 'duluca/minimal-node-chromium' }
        steps {
          checkout scm
        }
      }
      stage('Install') {
        agent { docker 'duluca/minimal-node-chromium' }
        steps {
          sh 'npm install'
        }
      }
      stage('Test') {
        agent { docker 'duluca/minimal-node-chromium' }
        steps {
          sh 'npm run test:headless -- --watch false --code-coverage'
        }
      }
      stage('SonarQube analysis') {
        agent { docker 'daneweber/ubuntu-node-java' }
        steps{
            withSonarQubeEnv('default') {
              sh 'npm run sonar'
          }
        }
      }
      stage('Record Coverage') {
          when { branch 'master' }
          steps {
              script {
                  currentBuild.result = 'SUCCESS'
               }
              step([$class: 'MasterCoverageAction', scmVars: [GIT_URL: "${env.GIT_URL}"]])
          }
      }
      stage('PR Coverage to Github') {
          when { allOf {not { branch 'master' }; expression { return env.CHANGE_ID != null }} }
          steps {
              script {
                  currentBuild.result = 'SUCCESS'
               }
              step([$class: 'CompareCoverageAction', publishResultAs: 'statusCheck', scmVars: [GIT_URL: "${env.GIT_URL}"]])
          }
      }
      stage('Build Dev Image'){
        /*when {
          expression { env.JOB_BASE_NAME.startsWith('PR') }
        }*/
        steps{
          nodejs('12') {
            sh 'npm install import-sort'
            sh "./tcp-angular-ecs/package-for-ecs excellaco/tcp-angular"
          }
        }
      }
      stage('Deploy Dev Image'){
        /*when {
          expression { env.JOB_BASE_NAME.startsWith('PR') }
        }*/
        steps{
          dir('tcp-angular-ecs'){
            sh "./configure-for-ecs ${PROJECT_NAME} dev ${AWS_REGION} ${env.GIT_COMMIT}"
            sh "./deploy-to-ecs ${PROJECT_NAME} dev ${AWS_REGION}"
          }
        }
      }
      /* stage('Deploy Test Image'){
        steps{
          dir('tcp-angular-ecs'){
            sh "./configure-for-ecs ${PROJECT_NAME} test ${AWS_REGION} ${env.GIT_COMMIT}"
            sh './deploy-to-ecs ${PROJECT_NAME} test ${AWS_REGION}'
          }
        }
      }*/
      stage('Deploy Prod Image'){
        when {
          branch 'master'
        }
        steps{
          dir('tcp-angular-ecs'){
            sh './tag-as-latest'
            sh "./configure-for-ecs ${PROJECT_NAME} prod ${AWS_REGION} latest"
            sh './deploy-to-ecs ${PROJECT_NAME} prod ${AWS_REGION}'
          }
        }
      }
    }
    post {
      success {
          setBuildStatus("Build succeeded", "SUCCESS");
          script {
            if (env.JOB_BASE_NAME.startsWith('PR'))
             slackSend(channel: '#tcp-angular', color: '#00FF00', message: ":jenkins_ci: Build Successful!  ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) :jenkins_ci:")
           }
          cleanWs()
        }
      failure {
          setBuildStatus("Build failed", "FAILURE");
          script {
            if (env.JOB_BASE_NAME.startsWith('PR'))
             slackSend(channel: '#tcp-angular', color: '#FF0000', message: ":alert: :jenkins_exploding: *Build Failed!  Please remedy this malbuildage at your earliest convenience* ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>) :jenkins_exploding: :alert:")
           }
        }
      always {
        sh 'docker image prune -a --force --filter "until=72h"'
      }
    }
}
