
const { createPool } = require('mysql2/promise');


module.exports = connect = async () => {

    const connection = await createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'EcommerceTA',
        connectionLimit: 10
    });

    return connection;

}