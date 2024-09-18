const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const { generateAuthToken } = require('../middleware/auth');

class UserController {
    
    static async getAllUser(_, res, next) {
        try {
            const allUsers = await userModel.getAllUser();
            res.status(200).json({ message: "success", data: allUsers });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    static async updatePassword(req, res) {
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;

        try {
            // Get user from database
            const user = await userModel.getUserbyid(id);
            if (!user) return res.status(404).json({ message: 'User not found' });

            // Check if the old password matches
            const validOldPassword = await bcrypt.compare(oldPassword, user.password);
            if (!validOldPassword) return res.status(400).json({ message: 'Old password is incorrect' });

            // Hash the new password
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);

            // Update the user with the new password
            const updatedUser = await userModel.updatePassword(id, hashedNewPassword);

            res.status(200).json({ message: 'Password updated successfully', data: updatedUser });
        } catch (error) {
            console.error('Error updating password:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    static async updateUserDetails(req, res) {
        const { id } = req.params;
        const { username, nik, alamat, no_telp } = req.body;
    
        try {
            // Check if the user exists
            const user = await userModel.getUserbyid(id);
            if (!user) return res.status(404).json({ message: 'User not found' });
    
            // Update the user details
            const updatedUser = await userModel.updateUserDetails(id, { username, nik, alamat, no_telp });
    
            res.status(200).json({ message: 'User details updated successfully', data: updatedUser });
        } catch (error) {
            console.error('Error updating user details:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    
    static async getUserbyid(req, res) {
        const { id } = req.params;

        try {
            const user = await userModel.getUserbyid(id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ message: 'success', data: user });
        } catch (error) {
            console.error('Error getting user by username:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    
    static async login(req, res) {
        const { email, username, password } = req.body;
        const user = await userModel.getUserByUsernameOrEmail(email || username);

        if (!user) return res.status(400).json({ message: 'User not found.' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid username or password.' });

        const token = generateAuthToken({ id: user.id, username: user.username, email: user.email });
        res.header('x-auth-token', token).json({ message: 'Login successful', token: token });
    };

    static async register(req, res) {
        const { username, email, nik, alamat ,no_telp, password } = req.body;
    
        const newUser = {
            username,
            email,
            nik,
            alamat,
            no_telp,
            password
        };
    
        try {
            const user = await userModel.createUser(newUser);
            const loginLink = '/login';
    
            res.status(201).json({
                message: 'Registration successful. Please proceed to login.',
                user,
                loginLink,
            });
        } catch (error) {
            if (error.message === 'Email already in use') {
                return res.status(400).json({ message: 'Email already in use' });
            }
            console.error('Error during registration:', error);
            res.status(500).json({ message: 'Registration error' });
        }
    }
    
};
module.exports = UserController;
