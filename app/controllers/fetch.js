var MetaInspector = require('node-metainspector');
var co = require('co');
var config = require('../../config');

module.exports = function* fetch() {
    var url = this.request.query ? (this.request.query.url ? this.request.query.url : '') : '';

    this.body = {};
};