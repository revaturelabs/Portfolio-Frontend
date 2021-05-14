pipeline {
  agent any
  stages {
    stage('Installing Dependencies') {
      steps {
        sh 'pwd'
        sh 'ls -al'
        nodejs(nodeJSInstallationName: 'nodejs') {
            sh 'npm install'
        }
      }
    }
    stage('Testing'){
      steps{
        nodejs(nodeJSInstallationName: 'nodejs') {
            sh 'npm test -- --watchAll=false'
        }

      }
      
    }
  }
}