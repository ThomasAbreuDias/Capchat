#!/bin/bash
function usuel()
{
	echo "Ce script va supprimmer les .DS_Store..."
	#appel de main()
	main
}
function main()
{
	find ./ -name *.DS_Store -delete
}
#appel de usuel()
usuel