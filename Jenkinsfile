pipeline {
  agent any
  stages {
    stage('Install Dependencies') {
      steps {
        sh 'pwd'
        sh 'ls -al'
        withNPM(npmrcConfig:'MyNpmrcConfig'){
            sh 'npm install'
        }
      }
    }
  }
}