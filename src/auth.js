const { google } = require('googleapis');

function getGoogleAuth(credsFile) {
    const auth = new google.auth.GoogleAuth({
        keyFilename: credsFile,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    
    return auth;
}

module.exports = {
    getGoogleAuth
};
