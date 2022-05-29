const { google } = require('googleapis');

function formatCategories(room) {
    const products = room.values;
    if (typeof products !== 'object') {
        return {};
    }
    const productsAsObject = {};
    let category = '';
    for (const product of products) {
        if (product[0] !== '') {
            category = product[0];
            productsAsObject[category] = [];
        }
        const [, name, status, lastUpdate] = product;
        productsAsObject[category].push({
            name,
            status,
            lastUpdate
        });
    }
    return productsAsObject;
}

function initGSheetClient(auth, spreadsheetId) {
    const sheets = google.sheets({ version: 'v4', auth });
    return ({
        getAllData: async () => {
            const res = await sheets.spreadsheets.get({
                spreadsheetId,
                ranges: [],
            });

            const { sheets: sheetsFromSpreadsheet } = res.data;
            const rangesToFetch = sheetsFromSpreadsheet.map(({ properties }) => `${properties.title}!A2:E`);
            const resValues = await sheets.spreadsheets.values.batchGet({
                spreadsheetId,
                ranges: rangesToFetch
            });

            const houseStatus = resValues.data.valueRanges.map((room) => {
                const name = room.range.split('!')[0].replace(/'/g, '');
                const roomStatus = formatCategories(room);
                return ({
                    name,
                    roomStatus
                });
            });

            return houseStatus;
        }
    });
}

module.exports = {
    initGSheetClient
};
