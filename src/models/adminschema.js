const bcrypt = require('bcryptjs/dist/bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const res = require('express/lib/response');

const adminschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    session_id: {
        type: String,
        required: false,
        trim: true
    }
});

const Adminschema = new mongoose.model("admins", adminschema);
module.exports = Adminschema;