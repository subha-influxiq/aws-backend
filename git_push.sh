#!/bin/sh

GitProcessStart() {
	git status

	git add .
}

GitCommitMsg () {
	echo ""
	echo ""
	read -p 'Enter commit message: ' commitMsg
	echo "==============================="

	if [ $commitMsg ] 
	then
   		git commit -m $commitMsg
	else
		echo ""
		echo ""
   		echo "Error: Please enter your commit message."
   		echo "==========================="
   		GitCommitMsg
	fi
}

GitProcessStart
GitCommitMsg

git pull origin master

echo ""
echo ""
read -p 'Conflict record ?? Marge your Conflict file then press y.: ' conflictKey
echo "=============================================================="

if [ "$conflictKey" = 'y' ] || [ "$conflictKey" = 'Y' ] 
then
	GitProcessStart
else
	git push origin master
fi

echo ""
echo ""
echo "Successfully done."
echo "=================="

