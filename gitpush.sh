#!/bin/sh

GitProcessStart() {
	git status

	git add .
}

GitCommitMsg () {
	read -p 'Enter commit message: ' commitMsg

	if [ $commitMsg ] 
	then
   		git commit -m $commitMsg
	else
   		echo "Error: Please enter your commit message."
   		GitCommitMsg
	fi
}

GitProcessStart
GitCommitMsg

git pull origin master

read -p 'Conflict record ?? Marge your Conflict file then press y.: ' conflictKey

if [ $conflictKey -eq 'y' ] || [ $conflictKey -eq 'Y' ] 
then
	GitProcessStart
else
	git push origin master
fi

echo "Successfully done."

