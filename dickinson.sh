#!/bin/bash

# fetch anthology from Project Gutenberg
if [ ! -f 12242-8.txt ];
then
  wget ftp://sailor.gutenberg.lib.md.us/gutenberg/1/2/2/4/12242/12242-8.txt
fi

# remove header/footer blocks; remove poem titles/Roman numerals; hard-code 
# content into HTML page
cat <(echo '<script type="text/plain" id="anthology">') \
    <(cat 12242-8.txt | \
      sed '1,215d;2810,2965d;6960,7020d;10336,10739d' | \
      sed '/^[^a-z]*[\.\!]/d' ) \
    <(echo '</script>') \
    dickinson.html.part > dickinson.html
