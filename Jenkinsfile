pipeline {
  agent any
  stages {
    stage('Install Dependencies') {
      steps {
        sh 'pwd'
        sh 'ls -al'
        nodejs(nodeJSInstallationName: 'Node 6.x', configId: 'joe_testing_node') {
            sh 'npm config ls'
        }
      }
    }
  }
}