#! /usr/bin/python3
from urllib.parse import parse_qs, unquote
from sys import exit, stdin
from os import getenv
import re

def response(code, short_msg, msg):
	print("HTTP/1.1 %d %s\r\n"
			"Content-Type: text/plain; charset=utf-8\r\n"
			"\r\n"
			"%s"%(code, short_msg, msg))

if getenv('REQUEST_METHOD') != 'POST':
	response(400, 'Bad Request', 'Oops! Invalid method.')
	exit()

queries = parse_qs(getenv('QUERY_STRING'))
if 'filename' not in queries:
	response(400, 'Bad Request', 'Oops! Invalid options.')
	exit()

filename = unquote(queries['filename'][0])
if '..' in filename or '/' in filename or not filename.isprintable():
	response(400, 'Bad Request', 'Oops! Invalid file name.')
	exit()

if getenv('REQUEST_SCHEME') == 'https':
    filepath = getenv('FILE_ROOT') + '/protected/' + filename
else:
    filepath = getenv('FILE_ROOT') + '/' + filename

with open(filepath, 'wb') as f:
	f.write(stdin.buffer.read())

response(200, 'OK', 'OK')
