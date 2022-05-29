
const { initGSheetClient } = require('./src/spreadsheet');
const { initHTTPServer } = require('./src/server');
const { getGoogleAuth } = require('./src/auth');

const port = process.env.PORT || 3000;
const credsFile = process.env.CREDENTIALS_FILE || 'credentials.json';
const spreadsheetID = process.env.SPREADSHEET_ID;

async function main() {
    const auth = getGoogleAuth(credsFile);
    const gSheetClient = initGSheetClient(auth, spreadsheetID);

    const app = initHTTPServer(gSheetClient);

    app.listen(port, () => {
        console.log('Listenning on ', port);
    });
}
try {
    main();
} catch (e) {
    console.error(e);
}
