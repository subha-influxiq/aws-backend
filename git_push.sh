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
	echo "\n Execute: Build Angular Production Mode."
	echo ""
	ng build --prod
	echo ""
	echo "Angular Production Build Complete."
	echo "======================================="

	cd dist/

	echo ""
	echo "==========================================="
	echo "Execute: Process to upload into the setver."
	echo "==========================================="
	aws --profile default s3 sync browser s3://testbedpece.influxiq.com --acl public-read  --cache-control max-age=0
}

serveAngular() {
	echo ""
	echo ""
	echo "================================================================"
	read -p 'Do you want to serve angular? (y/n): ' serveKey
	echo "================================================================"
	echo ""
	echo ""

	if [ "$serveKey" = 'y' ] || [ "$serveKey" = 'Y' ] 
	then
		echo ""
		echo ""
		echo "============================="
		echo "Execute: Angular start serve."
		echo "============================="
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

echo "\n================================================================"
read -p 'Any Conflict record ?? Marge your Conflict file then press y.: ' conflictKey

if [ "$conflictKey" = 'y' ] || [ "$conflictKey" = 'Y' ] 
then
	GitProcessStart
else
	echo "=========================="
	echo ">>---> Git Push\n"
	git push origin master
	echo "=========================="
fi

echo "\n\n================================================================"
read -p 'Do you want to build and upload into the server? (y/n): ' uploadKey

if [ "$uploadKey" = 'y' ] || [ "$uploadKey" = 'Y' ] 
then
	buildUpload

	serveAngular
else
	serveAngular
fi

