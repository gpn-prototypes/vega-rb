withFolderProperties{
    MASTER = "${env.K8S_MASTER}"
    TECH_USER = "${env.TECH_USER}"
    STAND = "${env.K8S_DEPLOY_STAND}"
    AUTO_DEPLOY_BRANCH = "${env.K8S_DEPLOY_BRANCH_FRONT}"
}

pipeline {

    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '10'))
    }

    environment {
        DOCKER_REGISTRY = 'docker-gpn.nexign.com/gpnx/vg1/frontend'
        DOCKER_FILE = 'docker/Dockerfile'
    }

    stages {

        stage("Set build name") {
            steps {
                echo "================== Set Build name =================="
                script {
                    notifyBitbucket()
                    buildName "#$BUILD_NUMBER-${env.GIT_BRANCH}"
                    GIT_COMMIT_SHORT = sh(
                        script: "printf \$(git rev-parse --short ${GIT_COMMIT})",
                        returnStdout: true
                    )
                }
                wrap([$class: 'BuildUser']) {
                    buildDescription "Executed @ ${NODE_NAME}. Build started by ${env.BUILD_USER ?: 'Jenkins'}"
                }
            }
        }

        stage("Build docker image") {
            steps {
                echo "================== Build Docker image =================="
                script {
                    withCredentials([usernamePassword(credentialsId: 'ARTIFACTORY', usernameVariable: 'NPM_LOGIN', passwordVariable: 'NPM_PASSWORD')]) {
                        docker.withRegistry("https://$DOCKER_REGISTRY", "ARTIFACTORY") {
                            dockerImage = docker.build("$DOCKER_REGISTRY:$GIT_COMMIT_SHORT", "--build-arg NPM_LOGIN=${env.NPM_LOGIN} --build-arg NPM_PASSWORD=${env.NPM_PASSWORD} -f $DOCKER_FILE .")
                        }
                    }
                }
            }
        }

        stage("Push docker image") {
            when {
                expression {
                    env.GIT_BRANCH == AUTO_DEPLOY_BRANCH
                }
            }
            steps {
                echo "================== Push Docker image =================="
                script {
                    docker.withRegistry("https://$DOCKER_REGISTRY", "ARTIFACTORY") {
                        dockerImage.push()
                    }
                }
            }
        }

        stage("Helm install app (front)") {
            when {
                expression {
                    env.GIT_BRANCH == AUTO_DEPLOY_BRANCH
                }
            }
            steps {
                echo "================== Deploy to K8S =================="
                sshagent(credentials: ["K8SHelmSSHKey"]) {
                    sh """
                    ssh -o StrictHostKeyChecking=no $TECH_USER@$MASTER helm repo update
                    ssh -o StrictHostKeyChecking=no $TECH_USER@$MASTER helm upgrade --install vega1-front-$STAND \
                        --wait \
                        --namespace vega-$STAND \
                        --set image.tag="$GIT_COMMIT_SHORT" \
                        --set ingress.hostName="vg1-front-$STAND" \
                        --set service.backHost="http://vega1-back-$STAND:8080" \
                        chartmuseum/vega1-front
                    """
                }
            }
        }
    }

    post {
        always {
            script {
                currentBuild.result = currentBuild.result ?: 'SUCCESS'
                notifyBitbucket()
                generateHTMLReport()
            }
            // Publish HTML Report
            publishHTML (target: [
                allowMissing: false,
                alwaysLinkToLastBuild: false,
                keepAll: true,
                reportDir: 'html-report',
                reportFiles: 'index.html',
                reportName: "Build Report"
            ])

            // Workspace Cleanup after build
            cleanWs()
        }
    }

}

final void generateHTMLReport() {
    script {
        sh '''
        mkdir html-report
        cat <<EOF > html-report/index.html
        <p>BRACH: ${BRANCH_NAME}</p>
        <p>STAND: <a href="http://vg1-front-${STAND}.k8s17.gpn.cloud.nexign.com">http://vg1-front-${STAND}.k8s17.gpn.cloud.nexign.com</a></p>
        <p>DATE: $(date +"%d-%m-%Y %T")</p>
        <p>COMMIT: ${GIT_COMMIT}</p>
        '''
    }
}