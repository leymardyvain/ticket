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
		stage('Stop backend container') {
			steps {
				echo 'starting stop app container ...'
				sh 'docker ps -f name=backend -q | xargs --no-run-if-empty docker container stop'
				sh 'docker container ls -a -f name=backend -q | xargs -r docker container rm'
        		}
      		}
      	stage('Stop frontend container') {
			steps {
				echo 'starting stop app container ...'
				sh 'docker ps -f name=frontend -q | xargs --no-run-if-empty docker container stop'
				sh 'docker container ls -a -f name=frontend -q | xargs -r docker container rm'
        		}
      		}
      	stage('Stop grafana container') {
			steps {
				echo 'starting stop app container ...'
				sh 'docker ps -f name=grafana -q | xargs --no-run-if-empty docker container stop'
				sh 'docker container ls -a -f name=grafana -q | xargs -r docker container rm'
        		}
      		}
      	stage('Stop loki container') {
			steps {
				echo 'starting stop app container ...'
				sh 'docker ps -f name=loki -q | xargs --no-run-if-empty docker container stop'
				sh 'docker container ls -a -f name=loki -q | xargs -r docker container rm'
        		}
      		}
       stage('Stop prometheus container') {
			steps {
				echo 'starting stop app container ...'
				sh 'docker ps -f name=prometheus -q | xargs --no-run-if-empty docker container stop'
				sh 'docker container ls -a -f name=prometheus -q | xargs -r docker container rm'
        		}
      		}
        stage('Stop promtail container') {
			steps {
				echo 'starting stop app container ...'
				sh 'docker ps -f name=promtail -q | xargs --no-run-if-empty docker container stop'
				sh 'docker container ls -a -f name=promtail -q | xargs -r docker container rm'
        		}
      		}
		stage('Stop db container') {
			steps {
				echo 'starting stop db container ...'
				sh 'docker ps -f name=dbserver -q | xargs --no-run-if-empty docker container stop'
				sh 'docker container ls -a -f name=dbserver -q | xargs -r docker container rm'
        		}
      		}
      		stage('Remove all stopped container') {
			steps {
				sh 'docker system prune -a -f'	
        		}
      		}
		 stage('Install packages') {
			steps {
					sh 'mvn clean install -DskipTests=true'
        		}
      		}
		stage('Build Images') {
			steps {
					sh 'docker-compose up --build -d --force-recreate'
        		}
      		}
      	stage('Docker Push') {
      		steps {
        		withCredentials([usernamePassword(credentialsId: 'DockerHub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
          		sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}"
          		sh 'docker push yleymard/backend:latest'
          		sh 'docker push yleymard/frontend:latest'
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
