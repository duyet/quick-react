'use strict';

var config = require('../../config');

module.exports = function* click(next) {
    // Counter and redirect
    var next_url = null;
    var id = null;
    if (this.request.query && this.request.query['next']) next_url = this.request.query['next'];
    if (this.request.query && this.request.query['id']) id = this.request.query['id'];

    console.log(this.request.query);

    if (!next_url) return this.body = 'Hi!';
    
    this.redirect(next_url);
};
