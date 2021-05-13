pipeline {
  agent any
  stages {
    stage('Install Dependencies') {
      steps {
        sh 'pwd'
        sh 'ls -al'
        nodejs(nodeJSInstallationName: 'Node 14.16.1', configId: 'joe_testing_node') {
            sh 'npm config ls'
        }
      }
    }
  }
}