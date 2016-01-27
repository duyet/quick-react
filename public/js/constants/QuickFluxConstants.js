var keyMirror = require('fbjs/lib/keyMirror');

// Define action constants
module.exports = keyMirror({
    SELECT_URL: null,
    COLLECTION_ADD: null,
    COLLECTION_REMOVE: null,
    URL_VISIBLE: null,
    RECEIVE_DATA: null,
    SET_USER: null,
    GET_USER: null,
    GET_TOKEN: null,
    SET_TOKEN: null,
});