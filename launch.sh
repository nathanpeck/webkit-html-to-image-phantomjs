#!/bin/bash
supervisor server.js | ./node_modules/bunyan/bin/bunyan -o short