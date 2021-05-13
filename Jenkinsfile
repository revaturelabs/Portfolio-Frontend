pipeline {
  agent any
  stages {
    stage('Install Dependencies') {
      steps {
        sh 'pwd'
        sh 'ls -al'
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        //run jest tests
      }
    }
  }
}