CS 247
=======

Web site for CS 247.


# Peculiarities

This is meant to be a pretty static HTML site. We wanted no build system. But we also wanted DRY includes.
Our solution are [Server Side Includes](https://en.wikipedia.org/wiki/Server_Side_Includes). 
Stanford's web servers are Apache [0], and Apache [has an implementation of Server Side Includes](http://httpd.apache.org/docs/2.2/howto/ssi.html).
SSI allows for includes like this:

```
<!--#include virtual="header.html" -->
<h1> Some HTML</h1>
<!--#include virtual="footer.html" -->
```

Note no space after the opening comment `<!--` is allowed.

[0] See if that's still true when you read this: `curl --silent -I http://www.stanford.edu | grep Apache`

## Setup Apache SSI

This is already done for you, but FYI:

* Add an `.htaccess` file to the class directory with this option: `Options +Includes`
* Name all files that will use an include statement `*.shtml`