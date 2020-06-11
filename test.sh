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

GitBranchName () {
	read -p 'Enter git branch name: ' gitBranch

	if [ $gitBranch ] 
	then
		git pull origin $gitBranch
   		return $gitBranch
	else
   		echo "Error: Please enter your branch name."
   		GitBranchName
	fi
}

GitProcessStart
GitCommitMsg
GitBranchName
gitBranch = $?

read -p 'Conflict record ?? (y/n): ' conflictKey

if [ $conflictKey == 'y' ] || [ $conflictKey == 'Y' ] 
then
	GitProcessStart
else
	git push origin master
fi

echo "Successfully done."

