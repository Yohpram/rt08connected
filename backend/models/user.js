const bcrypt = require('bcrypt');
const { pool } = require('../config/config');

const getAllUser = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
};

const getUserbyid = async (id) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
};

const updatePassword = async (id, newPassword) => {
    try {
        const result = await pool.query('UPDATE users SET password = $1 WHERE id = $2 RETURNING *', [newPassword, id]);
        return result.rows[0];
    } catch (error) {
        throw new Error(`Error updating password: ${error.message}`);
    }
};

const updateUserDetails = async (id, { username, nik, alamat, no_telp }) => {
    try {
        const result = await pool.query(
            'UPDATE users SET username = $1, nik = $2, alamat = $3, no_telp = $4 WHERE id = $5 RETURNING *',
            [username, nik, alamat, no_telp, id]
        );
        return result.rows[0];
    } catch (error) {
        throw new Error(`Error updating user details: ${error.message}`);
    }
};

const getUserByUsernameOrEmail = async (identifier) => {
    const result = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $1', [identifier]);
    return result.rows[0];
};

const doesEmailExist = async (email) => {
    const result = await pool.query('SELECT * FROM users where email = $1', [email]);
    return parseInt(result.rows[0].count) > 0;
};

const createUser = async ({ username, email, nik, alamat,no_telp, password }) => {
    const hashedpassword = await bcrypt.hash(password, 10);

    try {
        const result = await pool.query('INSERT INTO users (username, email, nik, alamat, no_telp, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [username, email, nik, alamat, no_telp, hashedpassword]);
        return result.rows[0];
    } catch (error) {
        if (error.code === '23505' && error.constraint === 'users_email_key') {
            throw new Error(`The email '${email}' is already in use.`);
        }
        throw new Error(`Registration error: ${error.message}`);
    }
};

module.exports = {
     getAllUser, getUserByUsernameOrEmail, doesEmailExist, createUser, getUserbyid, updatePassword, updateUserDetails
};
