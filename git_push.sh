#!/bin/sh

GitProcessStart() {
	echo "===================="
	echo ">>---> Git Status\n"
	git status
	echo "======================"

	echo ">>---> Git Add All"
	git add .
	echo "======================"
}

GitCommitMsg () {
	read -p 'Enter commit message: ' commitMsg

	if [ $commitMsg ] 
	then
		echo "\n>>---> Apply Git Commit\n"
   		git commit -m $commitMsg
   		echo "==============================="
	else
		echo ""
		echo ""
		echo "========================================"
   		echo "Error: Please enter your commit message."
   		echo "========================================"
   		GitCommitMsg
	fi
}

buildUpload() {
	echo "\n Execute: Build Angular Production Mode.\n"
	ng build --prod
	echo "\nAngular Production Build Complete."
	echo "======================================="

	cd dist/

	echo "Execute: Process to upload into the setver.\n"
	aws --profile default s3 sync browser s3://testbedpece.influxiq.com --acl public-read  --cache-control max-age=0
	echo "==========================================="
}

serveAngular() {
	echo "================================================================"
	read -p 'Do you want to serve angular? (y/n): ' serveKey
	
	if [ "$serveKey" = 'y' ] || [ "$serveKey" = 'Y' ] 
	then
		echo "\nExecute: Angular start serve."
		ng serve --poll=2000
	else
		echo ""
		echo ""
		echo "=================="
		echo "Successfully done."
		echo "=================="
	fi
}

GitProcessStart
GitCommitMsg

echo ">>---> Git Pull\n"
git pull origin master
echo ""

echo "Any Conflict record ??\n If Conflict marge your Conflict file then press y or press other key to push code."
read -p "Enter your choise: " conflictKey

if [ "$conflictKey" = 'y' ] || [ "$conflictKey" = 'Y' ] 
then
	echo "\n=========================================="
	GitProcessStart
else
	echo "=========================="
	echo ">>---> Git Push\n"
	git push origin master
	echo "=========================="
fi

read -p 'Do you want to build and upload into the server? (y/n): ' uploadKey

if [ "$uploadKey" = 'y' ] || [ "$uploadKey" = 'Y' ] 
then
	buildUpload

	serveAngular
else
	serveAngular
fi

