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
		
		self.table = []
		self.data = {}
		
		self.parse_csv()
	
	
	##################################################################
	
	def parse_csv(self):
		
		csv = open(DATABASE_CSV_PATH, 'r')
		
		for line in csv.readlines():
			
			entry = line.strip().split(',')
			
			if self.table == []:
				# First line contains field names
				self.table = entry[:]
			
			else:
				# First value of each line is the unique ID
				# Store lists of values by this unique ID
				self.data[ entry[0] ] = entry[:]
	
	
	##################################################################
	
	def display_id_html(self, api_id):
		
		display_header_html()
		
		index = 0
		
		for each in self.table:
			print("%s: %s</br>" % (each, self.data[api_id][index]))
			index += 1
		
		display_footer_html()
	
	
	##################################################################
	
	def display_id_json(self, api_id):
		
		display_header_json()
		
		print("{")
		
		if ( (not is_number(api_id)) or
		     (int(api_id) > len(self.data)+1) ):
			#print('"id": "not found"\n}')
			print("}")
			return
		
		
		count = 0
		
		for each in self.table[:-1]:
			
			if is_number(self.data[api_id][count]):
				print('\t"%s": %s,' % (each, self.data[api_id][count]))
			else:
				print('\t"%s": "%s",' % (each, self.data[api_id][count]))
			count += 1
		
		
		if is_number(self.data[api_id][count]):
			print('\t"%s": %s' % (self.table[-1], self.data[api_id][count]))
		else:
			print('\t"%s": "%s"' % (self.table[-1], self.data[api_id][count]))
		
		print("}")
	
	
	##################################################################
	
	def display_con_json(self, con_id, proper_only=False):
		
		display_header_json()
		
		results = []
		
		
		print("[")
		
		keys = self.data.keys()
		keys.sort()
		
		for key in keys:
			if self.data[key][ self.table.index('con') ] == con_id:
				
				if (not proper_only):
					results.append(self.data[key])
				else:
					if (self.data[key][ self.table.index('proper') ]) != "":
						results.append(self.data[key])
		
		if results == []:
			print("]")
			return
		
		
		for result in results[:-1]:
		
			print("\t{")
			
			count=0
			
			for each in self.table[:-1]:
				
				if is_number(result[count]):
					print('\t\t"%s": %s,' % (each, result[count]))
				else:
					print('\t\t"%s": "%s",' % (each, result[count]))
				count += 1
			
			
			if is_number(result[count]):
				print('\t\t"%s": %s' % (self.table[-1], result[count]))
			else:
				print('\t\t"%s": "%s"' % (self.table[-1], result[count]))
			
			print("\t},")
		
		
		print("\t{")
		
		count=0
		
		for each in self.table[:-1]:
			
			if is_number(self.data[key][count]):
				print('\t\t"%s": %s,' % (each, results[-1][count]))
			else:
				print('\t\t"%s": "%s",' % (each, results[-1][count]))
			count += 1
		
		
		if is_number(self.data[key][count]):
			print('\t\t"%s": %s' % (self.table[-1], results[-1][count]))
		else:
			print('\t\t"%s": "%s"' % (self.table[-1], results[-1][count]))
		
		print("\t}")
		
		
		print("]")
	
	
	##################################################################
	
	def parse_form(self):
	
		if 'id' in self.form.keys():
			
			api_id = self.form['id'].value
			
			#self.display_id_html(api_id)
			self.display_id_json(api_id)
			
			return
		
		
		if 'con' in self.form.keys():
			
			con_id = self.form['con'].value
			
			
			proper_only = False
			
			if 'proper_only' in self.form.keys():
				proper_only = "%s" % self.form['proper_only'].value == "True"
			
			
			self.display_con_json(con_id, proper_only)
	
	
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

