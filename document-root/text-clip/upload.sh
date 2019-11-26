#! /bin/bash
response() {
	printf "HTTP/1.1 $1 $2\r\n\
Content-Type: text/plain; charset=utf-8\r\n\
\r\n\
$3"
}

NAME=`sed 's/title=//' <<< $QUERY_STRING`

# security check
if echo $NAME | grep -q "\/\|\.\.\|[[:cntrl:]]"
then
	response "400" "Bad Request" "Oops! Invalid file name. "
	exit
fi

FILE="$FILE_ROOT/$NAME"

cat > "$FILE"
if [ $? != 0 ]
then
	response "500" "Internal Server Error" "Oops! Error occurred. "
	exit
fi

response "200" "OK" "OK"
