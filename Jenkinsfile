pipeline {
  agent any
  stages {
    stage('Install Dependencies') {
      steps {
        sh 'pwd'
        sh 'ls -al'
        withNPM('MyNpmrcConfig'){
            sh 'npm install'
        }
      }
    }
  }
}