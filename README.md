# gh-popular-words
Get sorted list of popular words from descriptions of repositories

## Install

```$ npm install -g gh-popular-words```


## Usage

```javascript
var gpw = require('gh-popular-words');
var opts = {limit: 5, stopwords: ['for', 'with', 'and', 'the', 'from'], minwordlength: 5};
gpw('saromanov', opts , function(err, data){
   console.log(data);
});
```
Output will be
```
[ { word: 'implementation', count: 13 },
  { word: 'python', count: 5 },
  { word: 'learning', count: 5 },
  { word: 'simple', count: 4 },
  { word: 'experiments', count: 4 } ]
  
```

or just with
```javascript
var gpw = require('./gh-popular-words');
gpw('saromanov', function(err, data){
   console.log(data);
});
```
The word "implementation" found 13 times on the descriptions, word "python" - 5 times, etc.


## License
MIT
