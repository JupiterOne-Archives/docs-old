#!groovy

pipeline {
  agent none

  stages {
    stage('build and security scan') {
      failFast true

      parallel {
        stage('build and test') {
          agent { label 'ecs-builder' }
          steps {
            initBuild()

            sh '''
            lifeomic-build
            '''

            script {
              if (env.BRANCH_NAME == 'master') {
                sh 'lifeomic-publish'
              }
            }
          }
        }

        stage('security scan') {
          agent { label 'ecs-builder' }
          steps {
            initBuild()
            sh 'yarn install'
            securityScan()
            script {
              if (env.BRANCH_NAME == 'master') {
                publishNpmPackage('.')
              }
            }
          }
        }
      }
    }

    stage('deploy') { when { branch 'master' }
      steps {
        deployToJupiterEnvironments(
          autoPopulateCM: [jiraComponent: 'JupiterOne'])
      }
    }
  }
}
