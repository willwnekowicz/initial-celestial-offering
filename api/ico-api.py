#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import print_function

import cgi, cgitb

#####################################################################
# Globals
#####################################################################

DEBUG = 0

DATABASE_CSV_PATH = '/var/tmp/hygdata_v3.csv'

#####################################################################
# Classes
#####################################################################

class development_ico_api:
	
	def __init__(self, form, DEBUG=DEBUG):
		
		self.DEBUG = DEBUG
		self.form = form
		
		# Display CGI debug information
		if self.DEBUG:
			cgitb.enable()
		
		self.index = []
		self.data = {}
		
		self.parse_csv()
	
	
	##################################################################
	
	def parse_csv(self):
		
		csv = open(DATABASE_CSV_PATH, 'r')
		
		for line in csv.readlines():
			
			entry = line.strip().split(',')
			
			if self.index == []:
				# First line contains field names
				self.index = entry[:]
			
			else:
				# First value of each line is the unique ID
				# Store lists of values by this unique ID
				self.data[ entry[0] ] = entry[:]
	
	
	##################################################################
	
	def display_id_html(self, api_id):
		
		display_header_html()
		
		index = 0
		
		for each in self.index:
			print("%s: %s</br>" % (each, self.data[api_id][index]))
			index += 1
		
		display_footer_html()
	
	
	##################################################################
	
	def display_id_json(self, api_id):
		
		display_header_json()
		
		print("{")
		
		if ( (not is_number(api_id)) or
		     (int(api_id) > len(self.data)+1) ):
			print('"id": "not found"\n}')
			return
		
		
		count = 0
		
		for each in self.index[:-1]:
			
			if is_number(self.data[api_id][count]):
				print('\t"%s": %s,' % (each, self.data[api_id][count]))
			else:
				print('\t"%s": "%s",' % (each, self.data[api_id][count]))
			count += 1
		
		
		if is_number(self.data[api_id][count]):
			print('\t"%s": %s' % (self.index[-1], self.data[api_id][count]))
		else:
			print('\t"%s": "%s"' % (self.index[-1], self.data[api_id][count]))
		
		print("}")
	
	
	##################################################################
	
	def parse_form(self):
	
		if 'id' in self.form.keys():
			
			api_id = self.form['id'].value
			
			#self.display_id_html(api_id)
			self.display_id_json(api_id)
	
	
	##################################################################
	
	def display_form(self):
		
		if (self.form.keys() != []):
			
			form_keys = self.form.keys()
			form_keys.sort()
			
			for key in form_keys:
				try:
					print("%s: %s<br>" % (key, self.form[key].value))
				except:
					pass
		
		else:
			display_header_html()
			print("<h1>No form values received</h1>")
			display_footer_html()


#####################################################################
# Functions
#####################################################################

def display_header_json():
	print("Content-Type: application/json\n")

def display_header_html():
	print("Content-Type: text/html\n")
	print("<html>")
	print("<head>")
	print("<title>ICO API</title>")
	print("</head>")
	print("<body>")
	
def display_footer_html():
	print("</body>")
	print("</html>")

def is_number(s):
	try:
		float(s)
		return True
	except ValueError:
		pass

	try:
		import unicodedata
		unicodedata.numeric(s)
		return True
	except (TypeError, ValueError):
		pass
	
	return False

#####################################################################
# Main
#####################################################################

if __name__ == '__main__':
	
	try:
		form = cgi.FieldStorage()
	
	except:
		display_header_html()
		
		print("<h1>An error occured attempting to parse the form values<h1>")
		print("<h3>Please click <a href=\"%s\">here</a> to go back</h3>" % \
		          os.environ['HTTP_REFERER'])
		
		display_footer_html()
	
	else:
		interface = development_ico_api(form, DEBUG)
		interface.parse_form()

