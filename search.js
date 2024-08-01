const API = require('./mock-api');
// To count the matches, call API.countMatches(term) where term is the search term


const EventEmitter = require('events')

class Search extends EventEmitter {
    constructor() {
        super();
    }


    async searchCount(searchTerm) {
        if (typeof searchTerm === 'undefined') {
            this.emit('SEARCH_ERROR', {message: 'INVALID_TERM', term: searchTerm});
            return;
        }

        try {
            this.emit('SEARCH_STARTED', searchTerm);
            const count = API.countMatches(searchTerm)

            this.emit('SEARCH_SUCCESS', {count, term: searchTerm});
        } catch (error) {
            this.emit('SEARCH_ERROR', {message: error.message, term: searchTerm});
        }
    }
}

module.exports = Search;