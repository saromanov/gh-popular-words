"use strict"

var githubRepos = require('github-repositories');

module.exports = function(user, opts, cb) {
    if (typeof opts === 'function') {
        cb = opts;
    }

    var limit = opts.limit || -1;
    var stopwords = opts.stopwords || [];
    githubRepos(user, function(err, data) {

        if (err) {
            cb(err);
            return;
        }

        var words = {};
        for (var i = 0; i < data.length; ++i) {
            data[i].description.split(' ').forEach(function(word) {
                if (word.length > 2 && stopwords.indexOf(word) === -1) {
                    word = word.toLowerCase();
                    if (!(word in words)) {
                        words[word] = 1;
                    } else {
                        words[word] += 1;
                    }
                }
            });
        }
        var wordsandcount = [];
        var justwords = Object.keys(words);
        for (var i = 0; i < justwords.length; ++i) {
            wordsandcount.push({
                word: justwords[i],
                count: words[justwords[i]]
            });
        }
        var sorted = wordsandcount.sort(function(a, b) {
            return a.count < b.count ? 1 : -1;
        });
        if (typeof limit === 'function' || limit === undefined || limit === -1) {
            cb(null, sorted);
        } else {
            var result = [];
            for (var i = 0; i < limit; ++i) {
                result.push(sorted[i]);
            }
            cb(null, result);
        }
    });
};