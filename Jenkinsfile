pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'pwd'
        sh 'ls -al'
        sh 'chmod +x gradlew'
        withGradle {
          sh './gradlew build'
        }
      }
    }
    stage('Test') {
      steps {
        withGradle {
          sh './gradlew test'
        }
      }
    }
  }
}