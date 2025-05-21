const fs = require('fs');
const csv = require('csv-parser');

let users = [];
function loadUsersFromCSV(filePath = 'data/users.csv') {
    users = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                users.push(row);
            })
            .on('end', () => {
                console.log('User data loaded from CSV.');
                resolve(users);
            })
            .on('error', reject);
    });
}

function getUsers() {
    return users;
}

module.exports = {
    loadUsersFromCSV,
    getUsers
};