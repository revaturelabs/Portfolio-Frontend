pipeline {
  agent any
  stages {
    stage('Install Dependencies') {
      steps {
        sh 'pwd'
        sh 'ls -al'
        nodejs() {
            sh 'npm config ls'
        }
      }
    }
  }
}