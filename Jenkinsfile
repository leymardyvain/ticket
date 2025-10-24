#!groovy

pipeline {
	agent any
	tools{
        	maven 'maven 3.8.7' // This is the tool that we need to run mvn project
	}
	stages {
		stage('Checkout Access GitHub'){
			steps{
				git branch: 'master',
					credentialsId: 'GitHub_Test',
					url: 'https://github.com/leymardyvain/ticket.git'
        		}
    		}
    	stage('Grant Docker Socket Permissions') {
            steps {
                script {
                    sh 'sudo chmod 666 /var/run/docker.sock'
                }
            }
        }
		stage('Stop app container spring_ticket') {
			steps {
				echo 'starting stop container ...'
				sh 'docker ps -f name=spring_ticket -q | xargs --no-run-if-empty docker container stop'
				sh 'docker container ls -a -f name=spring_ticket -q | xargs -r docker container rm'
        		}
      		}
		stage('Stop db container db_spring_ticket') {
			steps {
				echo 'starting stop container ...'
				sh 'docker ps -f name=db_spring_ticket -q | xargs --no-run-if-empty docker container stop'
				sh 'docker container ls -a -f name=db_spring_ticket -q | xargs -r docker container rm'
				sh 'docker system prune -a -f'	
        		}
      		}
      	stage('Stop haproxy loadbalancer') {
			steps {
				echo 'starting stop container ...'
				sh 'docker ps -f name=ticket_hapee -q | xargs --no-run-if-empty docker container stop'
				sh 'docker container ls -a -f name=ticket_hapee -q | xargs -r docker container rm'
				sh 'docker system prune -a -f'	
        		}
      		}
		 stage('Create mvn clean install') {
			steps {
					sh 'mvn clean install -DskipTests=true'
        		}
      		}
		stage('Build Images') {
			steps {
					sh 'docker-compose up --build -d'
        		}
      		}
      	stage('Docker Push') {
      		steps {
        		withCredentials([usernamePassword(credentialsId: 'DockerHub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
          		sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}"
          		sh 'docker push yleymard/spring_ticket:latest'
          		echo "image yleymard/spring_ticket pushed"
        	}
          }
      }

	}
	post {
        	success {
		  cleanWs deleteDirs: true, disableDeferredWipeout: true
        	}
	}
	
}
