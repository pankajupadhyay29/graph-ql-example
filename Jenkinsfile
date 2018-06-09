node('node') {
    deleteDir()
    currentBuild.result = "SUCCESS"

    try {

       stage('Checkout'){

          checkout scm
       }

       stage('Test'){

         env.NODE_ENV = "prod"

         print "Environment will be : ${env.NODE_ENV}"

         sh 'node -v'
         sh 'npm prune'
         sh 'npm install'
         sh 'npm test'

       }

       stage('Deploy'){

         echo 'Push to Repo'

         echo 'ssh to web server and tell it to pull new image'

       }

       stage('Cleanup'){

         echo 'prune and cleanup'
         sh 'npm prune'
         sh 'rm node_modules -rf'

         mail body: 'project build successful',
                     from: 'pankajupadhyay29@gmail.com',
                     replyTo: 'pankajupadhyay29@gmail.com',
                     subject: 'project build successful',
                     to: 'pankajupadhyay29@gmail.com'
       }



    }
    catch (err) {

        currentBuild.result = "FAILURE"

            mail body: "project build error is here: ${env.BUILD_URL}" ,
            from: 'pankajupadhyay29@gmail.com',
            replyTo: 'pankajupadhyay29@gmail.com',
            subject: 'pankajupadhyay29@gmail.com',
            to: 'pankajupadhyay29@gmail.com'

        throw err
    }

}
