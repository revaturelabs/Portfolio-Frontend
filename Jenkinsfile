pipeline {
  agent any
  stages {
    stage('Install Dependencies') {
      steps {
        sh 'pwd'
        sh 'ls -al'
        withNPM(npmrcConfig:'joe_testing_node'){
            sh 'npm install'
        }
      }
    }
  }
}