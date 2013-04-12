#!/bin/bash
xvfb-run --server-args="-screen 0, 1024x768x24" phantomjs --disk-cache=yes --local-to-remote-url-access=yes --load-images=yes phantom.js