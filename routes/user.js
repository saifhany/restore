const express = require("express");
const {
    registerUser,
    getUsers,
    login,
    getUser,
    deleteUser,
    updateUser,
    updateProfile,
} = require("../controller/user");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

// VALIDATORS
const { runValidation } = require("../validators");
const {
    userRegisterValidator,
    userSigninValidator,
} = require("../validators/user");

// ROUTES
router
    .route("/")
    .post( userRegisterValidator, runValidation, registerUser)
    .get(protect, admin, getUsers);
// User signup
/**
 * @swagger
 * /api/users:
 *  post:
 *    parameters:
 *      - in: body
 *        name: Register
 *        description: Register User API
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - email
 *            - isAdmin
 *            - password
 *          properties:
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            isAdmin:
 *              type: boolean
 *            password:
 *              type: string
 *    description: Register To restuarant App Using Valid name ,email ,password,role
 *    responses:
 *      '201':
 *        description: User Added To restuarant System
 *      '400':
 *        description: Bad Request
 *      '409':
 *        description: Conflict User Alreday Registered
 *      '500':
 *        description: Internal Server Error
 */
// get all users
// get any car by its Id
/**
 * @swagger
 * /api/users:
 *  get:
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        schema:
 *          type: string
 *          format: uuid
 *        required: true
 *    description: Use to Get a users Information to admin
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: users Not Found
 *      '401':
 *        description: Un Authorized-Access
 */
router
    .route("/:id")
    .get(protect, getUser)
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser);
    // get user by id to admin 
/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        schema:
 *          type: string
 *          format: uuid
 *        required: true
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: userid
 *    description: Use to Get a user Information By his ID
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: user Not Found
 *      '401':
 *        description: Un Authorized-Access
 */
// update user
/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        schema:
 *          type: string
 *          format: uuid
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *      - in: body
 *        name: id
 *        description: user Info To Update
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - email
 *            - password
 *            - isAdmin
 *            - avatar
 *          properties:
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            avatar:
 *              type: string
 *            password:
 *              type: string
 *            isAdmin:
 *              type: boolean
 *    description: update user  (Admin is Only Allowed for this)
 *    responses:
 *      '201':
 *        description: user updated to restuarant System
 *      '401':
 *        description: Un Authorized-Access
 *      '404':
 *        description: user is not found
 */
// delete user
/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        schema:
 *          type: string
 *          format: uuid
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *    responses:
 *      '200':
 *        description: User removed
 *      '401':
 *        description: Un Authorized-Access
 *      '404':
 *        description: user is not found
 */
router.post("/login", userSigninValidator, runValidation, login);
// User login
/**
 * @swagger
 * /api/users/login:
 *  post:
 *    parameters:
 *      - in: body
 *        name: UserLogin
 *        description: Login API
 *        schema:
 *          type: object
 *          required:
 *            - email
 *            - password
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *          description: Login API JSON Body
 *    description: Login to restuarant  App
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Un Authorized-Access
 *      '400':
 *        description: Bad Request
 *      '500':
 *        description: Internal Server Error 
 */
router.route("/profile/:id").put(protect, updateProfile);

module.exports = router;
