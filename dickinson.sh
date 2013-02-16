#!/bin/bash

# fetch anthology from Project Gutenberg
if [ ! -f 12242-8.txt ];
then
  wget ftp://sailor.gutenberg.lib.md.us/gutenberg/1/2/2/4/12242/12242-8.txt
fi

# remove header/footer; hard-code content into HTML page
cat <(echo '<script type="text/plain" id="anthology">') \
    <(tail -n +200 12242-8.txt | tail -r | tail -n +400 | tail -r) \
    <(echo '</script>') \
    dickinson.html.part > dickinson.html
