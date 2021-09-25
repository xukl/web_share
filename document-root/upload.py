#! /usr/bin/python3
from urllib.parse import parse_qs, unquote
from sys import stdin
from os import getenv, listdir
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

FILE_ROOT = getenv('FILE_ROOT')
if getenv('REQUEST_SCHEME') == 'https':
    filepath = FILE_ROOT + '/protected/' + filename
else:
    if len(listdir(FILE_ROOT)) > 6:
        response(429, 'Too Many Requests',
                'Can only upload no more than 6 files if unautherized')
        exit()
    elif int(getenv('CONTENT_LENGTH')) > 200 * 2**20: # 200MiB
        response(413, 'Payload Too Large',
                'Can only upload files no larger than 200MiB if unautherized')
        exit()
    filepath = FILE_ROOT + '/' + filename

with open(filepath, 'wb') as f:
	f.write(stdin.buffer.read())

response(200, 'OK', 'OK')
