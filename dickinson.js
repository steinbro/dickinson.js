var Dickinson = function() {
  // give arrays a method for picking a random element
  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)]
  };
  
  var text = document.getElementById("anthology").innerHTML;

  var words = text.split(/[\s\n]/).filter(function(word) { 
    return word != '';
  });
  
  // words suitable for beginning a stanza
  var startwords = words.filter(function(w) {
    return w[0] == w[0].toUpperCase() && w[0] != '-';
  });

  var ngrams = function(n) {
    return words.map(function(word, index, array) {
      return array.slice(index, index + n);
    }).slice(0, 1 - n);
  };
  
  var bigrams = ngrams(2);

  // populate this.poem with a new composition
  this.write = function() {
    var poem = ''; 
    var line = '';

    for(i = 0; i < Math.floor(3 * Math.random()) + 2; i++) {
      var word = startwords.random();

      while(['!', '?', '.'].indexOf(word[word.length - 1]) == -1) {
        if([word[0].toLowerCase(),'-'].indexOf(word[0]) != -1 || 
           line.split(' ').length <= 1) {
          line += word + ' ';
        } else {
          poem += line + '\n';
          line = word + ' ';
        }
        word = bigrams.filter(function (b) {
          return b[0] == word;
        }).random()[1];
      }
      poem += line + word + '\n\n';
      line = '';
    }
    poem = poem.replace(/"/gi, '');
  
    return poem;
  };
  var poem = this.write();
  
  // generate title from last generated poem
  this.title = function() {
    return poem.split('\n')[0].split(/\W+/).slice(-2)[0].toUpperCase() + '.';
  };
};
