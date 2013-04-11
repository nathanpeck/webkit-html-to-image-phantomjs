#!/bin/bash
xvfb-run --server-args="-screen 0, 800x600x24" phantomjs --disk-cache=yes app.js