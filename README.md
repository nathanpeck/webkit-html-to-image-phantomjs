webkit-html-to-image-phantomjs
==============================

A simple Phantom.js webkit HTML to Image conversion service

Installation
============

The following installation steps have been verified to work on Ubuntu:

1. **Download from Github:**

    ```bash
    git clone https://github.com/nathanpeck/webkit-html-to-image-phantomjs.git
    ```   

2. **Install node.js:**

    ```bash
    sudo apt-get install python-software-properties python g++ make
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs npm
    ```

3. **Install phantom.js:** (Instructions assume a 64 bit system. Substitute the 32 bit version if needed.)

    ```bash
    wget https://phantomjs.googlecode.com/files/phantomjs-1.9.0-linux-i686.tar.bz2
    tar xvf phantomjs-1.9.0-linux-i686.tar.bz2
    sudo mv phantomjs-1.9.0-linux-i686/bin/phantomjs /usr/bin/phantomjs
    ```

4. **Install needed dependencies:**

    ```bash
    sudo npm install -g supervisor
    cd webkit-html-to-image-phantomjs
    npm install
    ```
    
5. **Start the server:**

    ```bash
    ./launch.sh
    ```
