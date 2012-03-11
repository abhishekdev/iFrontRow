#!/usr/bin/env python
#
# Copyright (c) 2011 Abhishek Dev
# Licensed under the MIT License
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# 	http://bit.ly/abhishekdevMIT-License
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

import os
import webapp2
import jinja2

# setup the template engine 
jinja_environment = jinja2.Environment(
	    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))


class MainHandler(webapp2.RequestHandler):
	def get (self, q):
		if q is None:
			q = 'resource/index.html'
		
		template = jinja_environment.get_template(q)
		self.response.headers ['Content-Type'] = 'text/html'
		self.response.out.write (template.render({}))


# register the app
app = webapp2.WSGIApplication([('/(.*html)?', MainHandler)],
	                              debug=True)

	

