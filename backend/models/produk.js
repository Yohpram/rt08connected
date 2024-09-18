const pool = require('../config/config');

const getProductById = async (id) => {
    const result = await pool.query('SELECT * FROM produk WHERE id = $1', [id]);
    return result.rows[0];
};

const getProducts = (callback) => {
    pool.query('SELECT * FROM produk', (err, results) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, results.rows);
    });
};

const addProduct = (product, callback) => {
    const { nama, harga, keterangan, image } = product;
    pool.query(
        'INSERT INTO produk (nama, harga, keterangan, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [nama, harga, keterangan, image],
        (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, results.rows[0]);
        }
    );
};

module.exports = {
    getProducts,
    getProductById,
    addProduct
};

