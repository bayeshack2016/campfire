#!/usr/bin/env python

"""
Start server with
    'python CampireServer.py'
"""

import SocketServer
import json
import logging
import traceback
import urlparse

from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer


FACILITY_ID = 'facility_id'

class Handler(BaseHTTPRequestHandler):

    def _respond(self, code, response):
        """Sends header and payload of HTTP Get response."""
        self.send_response(code)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(response)

    def _get_input_vars(self):
        """Returns a dictionary of HTTP Get variables from the request.

        Returns:
            A dictionary of key/value variables given in the HTTP request. Might be empty.
        """
        logging.info("path var: %s", self.path)
        if '?' in self.path:  # there might be data here
            input_vars = urlparse.parse_qs(self.path.split('?')[1])
            logging.info("variables gotten from path: %s", input_vars)
            return input_vars
        else:
            return {}

    def _fetch_timeseries_from_db(self, facility_ids):
        """Given a camp facility_id, this method queries the DB and returns the capacity
        timeseries.

        Args:
            facility_id: integer, key to the DB
        Returns:
            A timeseries.
        """
        print('falife', facility_ids)
        series1 = {
            'x': ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
            'y': [1, 3, 6]
        }
        series2 = {
            'x': ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
            'y': [2, 1, 2]
        }
        if len(facility_ids) == 1:
            return json.dumps([series1])
        else:
            return json.dumps([series1, series2])

    def do_GET(self):
        input_vars = self._get_input_vars()

        response = '%s not in input vars.' % (FACILITY_ID,)
        if FACILITY_ID in input_vars:
            logging.info('Necessary key was found in HTTP Get vars.')
            fac_ids = input_vars[FACILITY_ID][0].split(',')
            response = self._fetch_timeseries_from_db(fac_ids)
        self._respond(200, response)

if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG)
    server = HTTPServer(('', 13373), Handler)
    server.serve_forever()
