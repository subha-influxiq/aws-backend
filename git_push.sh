#!/bin/sh

GitProcessStart() {
	git status

	git add .
}

GitCommitMsg () {
	echo ""
	echo ""
	echo "==============================="
	read -p 'Enter commit message: ' commitMsg
	echo "==============================="
	echo ""
	echo ""

	if [ $commitMsg ] 
	then
   		git commit -m $commitMsg
	else
		echo ""
		echo ""
		echo "========================================"
   		echo "Error: Please enter your commit message."
   		echo "========================================"
   		echo ""
		echo ""
   		GitCommitMsg
	fi
}

buildUpload() {
	echo ""
	echo ""
	echo "======================================="
	echo "Execute: Build Angular Production Mode."
	echo "======================================="
	ng build --prod

	cd dist/

	echo ""
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

git pull origin master

echo ""
echo ""
echo "================================================================"
read -p 'Conflict record ?? Marge your Conflict file then press y.: ' conflictKey
echo "================================================================"
echo ""
echo ""

if [ "$conflictKey" = 'y' ] || [ "$conflictKey" = 'Y' ] 
then
	GitProcessStart
else
	git push origin master
fi


echo ""
echo ""
echo "================================================================"
read -p 'Do you want to build and upload into the server? (y/n): ' uploadKey
echo "================================================================"
echo ""
echo ""

if [ "$uploadKey" = 'y' ] || [ "$uploadKey" = 'Y' ] 
then
	buildUpload

	serveAngular
else
	serveAngular
fi

