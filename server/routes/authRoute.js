import express from 'express';
import * as authentication from '../controllers/authController.js';

const auth = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         name: jpteks
 *         email: jpteks728@gmail.com
 *         password: securepassword
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully registered
 *       400:
 *         description: User not successfully registered
 */
auth.post('/register', authentication.Register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully logged in
 *       403:
 *         description: Invalid credentials
 */
auth.post('/login', authentication.Login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: The user was successfully logged out
 */
auth.post('/logout', authentication.handleLogout);

/**
 * @swagger
 * /auth/refresh:
 *   get:
 *     summary: Refresh the access token
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: The access token was successfully refreshed
 *       401:
 *         description: Unauthorized
 */
auth.get('/refresh', authentication.handleReFreshToken);

export default auth;
