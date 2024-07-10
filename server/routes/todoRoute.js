// routes/todoRoute.js

import express from "express";
import * as todo from "../controllers/todoController.js";
import { verifyJWT } from "../middlewares/verify.js";

const todos = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *
 *         - title
 *         - content
 *       properties:
 *         User:
 *           type: string
 *           description: The user ID
 *         title:
 *           type: string
 *           description: The title of the todo
 *         content:
 *           type: string
 *           description: The content of the todo
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags for the todo
 *         isPinned:
 *           type: boolean
 *           description: Pin status of the todo
 *       example:
 *
 *         title: 'Sample Todo'
 *         content: 'This is a sample todo item'
 *         tags: ['work', 'urgent']
 *         isPinned: false
 */

/**
 * @swagger
 * /todo/createTodo:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: The created todo.
 *       401:
 *         description: invalid
 *       403:
 *         description: Unauthorized

 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
todos.post("/createTodo", verifyJWT, todo.createTodo);

todos.get("/searchTodo", verifyJWT, todo.searchTodo);

/**
 * @swagger
 * /todo/editTodo/{id}:
 *   put:
 *     summary: Edit an existing todo
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The todo id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: The updated todo.
 *       401:
 *         description: invalid
 *       403:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
todos.put("/editTodo/:id", verifyJWT, todo.editTodo);

/**
 * @swagger
 * /todo/editPin/{id}:
 *   put:
 *     summary: Update pin status of a todo
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The todo id
 *     responses:
 *       200:
 *         description: The updated pin status.
 *       401:
 *         description: invalid
 *       403:
 *         description: Unauthorized
 */
todos.put("/editPin/:id", verifyJWT, todo.updatePin);

/**
 * @swagger
 * /todo/getTodo:
 *   get:
 *     summary: Get all todos
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all todos.
 *       401:
 *         description: invalid
 *       403:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
todos.get("/getTodo", verifyJWT, todo.getTodo);

/**
 * @swagger
 * /todo/deleteTodo/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The todo id
 *     responses:
 *       200:
 *         description: The deleted todo.
 *       401:
 *         description: invalid
 *       403:
 *         description: Unauthorized
 */
todos.delete("/deleteTodo/:id", verifyJWT, todo.deleteTodo);
todos.get("/searchTodo", verifyJWT, todo.searchTodo);
export default todos;
