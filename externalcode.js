/**
 *  Copyright 2015 Paul Querna
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

(function(){
	function slidify(section, code) {
		section.textContent = code;
		if (window["hljs"] !== undefined) {
			hljs.highlightBlock(section);			
		} else if (window['Rainbow'] !== undefined) {
			Rainbow.color(section);
		}
	}

	function get_range(range_text) {
		function get_int(text, default_value) {
			var number = parseInt(text, 10);
			return isNaN(number) ? default_value : number;
		}

		var range = { begin: 1, end: 1 << 30};

		if (range_text.length > 0) {
			var range_array = range_text.split("-");

			if (range_array.length == 1) {
				range_array.push(range_array[0]);
			}

			range.begin = get_int(range_array[0], range.begin);
			range.end = get_int(range_array[1], range.end);
		}

		return range;
	}

	function select_lines(code, begin, end) {
		var code_lines = code.split("\n");
		var code_slice = code_lines.slice(begin - 1, end)
		return code_slice.join("\n")
	}

	function fetchSection(section) {
		var xhr = new XMLHttpRequest(),
			url = section.getAttribute('data-code')
			code_range = section.getAttribute('data-code-range')
			done = false;

		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
				if (code_range == null)
					code_range = "";
				var range = get_range(code_range);
				slidify(section,  select_lines(xhr.responseText, range.begin, range.end));
				done = true;
			} else if (!done) {
				section.innerHTML = '<section data-state="alert">' +
					'ERROR: The attempt to fetch ' + url + ' failed with HTTP status ' + xhr.status + '. ' +
					'Check your browser\'s JavaScript console for more details.' +
					'<p>Remember that you need to serve the presentation HTML from a HTTP server.</p>' +
					'</section>';
			}
		}

		xhr.overrideMimeType('text/html; charset=utf-8');

		xhr.open('GET', url, true);

		try {
			xhr.send();
		}
		catch ( e ) {
			alert('Failed to get the Code file ' + url + '. Make sure that the presentation and the file are served by a HTTP server and the file can be found there. ' + e);
		}

	}

	function processSlides() {
		var sections = document.querySelectorAll( '[data-code]'),
			section;

		for( var i = 0, len = sections.length; i < len; i++ ) {
			section = sections[i];
			if (section.getAttribute('data-code').length) {
				fetchSection(section);
			}
		}
	}

	processSlides();
})();
