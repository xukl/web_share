#! /bin/bash
response() {
	printf "HTTP/1.1 $1 $2\r\n\
Content-Type: text/plain; charset=utf-8\r\n\
\r\n\
$3"
}

FILENAME=`sed 's/filename=//' <<< $QUERY_STRING`

# security check
if echo $FILENAME | grep -q "\/\|\.\.\|[[:cntrl:]]"
then
	response "400" "Bad Request" "Oops! Invalid file name. "
	exit
fi

FILE="$FILE_ROOT/$FILENAME"

cat > "$FILE"
if [ $? != 0 ]
then
	response "500" "Internal Server Error" "Oops! Error occurred. "
	exit
fi

response "200" "OK" "OK"
