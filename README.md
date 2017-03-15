CS 247
=======

Web site for CS 247.

# Getting started

## Local development

Start the local server by running the following command:
```
./ssi-server --index index.shtml --rootpath 2017-spring
```
You might need to make `./ssi-server` executable first by e.g. running `chmod +x ./ssi-server`.

The `index` option changes the default index file from `index.html` to one allowing server side includes.
The `rootpath` option allows to mimick running in a subdirectory on the actual webserver. CS247 has so far put content for each class in a subdirectory based on year and quarter of the instantiation of the course.

## Deployment

Run `./deploy.sh` from the repository root. This assumes a fully configured `hci` host in your `.ssh/config` file. An example configuration would be:

```
Host hci
  Hostname hci.stanford.edu
  User <<<your csid>>>
  ForwardAgent yes
```

# Rationale and background

This is meant to be a pretty static HTML site. We wanted no build system. But we also wanted DRY includes.
Our solution are [Server Side Includes](https://en.wikipedia.org/wiki/Server_Side_Includes). 
Stanford's web servers are running Apache [0], and Apache [has an implementation of Server Side Includes](http://httpd.apache.org/docs/2.2/howto/ssi.html).
SSI allows for includes like this:

```
<!--#include virtual="header.html" -->
<h1> Some HTML</h1>
<!--#include virtual="footer.html" -->
```

Note no space after the opening comment `<!--` is allowed.
Name all files that will use include statements `*.shtml`. 

[0] See if that's still true when you read this: `curl --silent -I http://www.stanford.edu | grep Apache`

## Setup Apache SSI

This is already done for you, but FYI:

* Add an `.htaccess` file to the class directory with this option: `Options +Includes`