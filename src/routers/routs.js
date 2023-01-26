const express = require('express');
const rout = express.Router();
const Authentication = require("../Auth");
// logins schema
const Loginmens = require("../models/loginschema");
const Adminsch = require("../models/adminschema");
// product scheme 
const Products = require("../models/productshema");
const DB = process.env.DATABASE;

//admin auth
const AdminAuthentication = require("../AdminAuth");

//session 
// const sessions = require('express-session');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookiepersor = require('cookie-parser');
const { redirect, cookie } = require('express/lib/response');
rout.use(express.json());
rout.use(cookiepersor());
rout.use(express.urlencoded({ extended: true }));

//admintest
rout.get("/admintest", AdminAuthentication, async (req, res) => {
    try {
        res.status(200);
        res.send(req.session_id);
    }
    catch (e) {
        console.log("admintest: ", e);
        redirect("/admin");

    }

});
//admin
rout.post("/admin", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        console.log(username, password);
        const names = await Adminsch.findOne({ username });
        console.log("coming to login names ", names);

        const check = names.password === password;
        console.log("check: ", check);
        if (check) {
            const session_id = await jwt.sign({ _id: names._id }, "mynameissalmanandilovetocode");
            res.cookie("salmanbhai", session_id, {
                expires: new Date(Date.now() + 1000000000)
            });
            const reg = await Adminsch.findOneAndUpdate({ _id: names._id }, { session_id });
            const result = await reg.save();
            res.send(names);
        } else {
            res.status(400).send("error");
        }
    }
    catch (e) {
        res.status(400);
        console.log("admin login: ", e);
    }
});

//post registration user
rout.post("/registration",AdminAuthentication, async (req, res) => {
    const regisdata = req.body;
    const username = req.body.username;
    const phoneno = req.body.phoneno;
    const email = req.body.email;
    const password = req.body.password;


    console.log("regisdata ", regisdata);
    if (!username || !email || !password) {
        alert("Please Fill All The Details");
        return res.status(422).send("something went wrong registration");
    }
    try {
        const reg = new Loginmens({
            username,
            phoneno,
            email,
            password

        });
        console.log("reg: " + reg);
        const savereg = await reg.save();
        console.log("reg2: " + reg);
        res.send(savereg);
    }
    catch (e) {
        console.log("something went wrong " + e);
    }
});

//get products
rout.get("/products", AdminAuthentication, async (req, res) => {
    try {

        const data = await Products.find({});
        res.send(data);

    }
    catch (e) {
        console.log("product rout err ", e);
        redirect("/admin");
    }


});
//add product
rout.post("/products", AdminAuthentication, async (req, res) => {
    try {
        // console.log("prd ", prd);
        const { name, category, img, describtion, amount, item, discount, image_details } = req.body;
        const reg = new Products({
            name,
            category,
            img,
            describtion,
            amount,
            item,
            discount,
            image_details
        });

        const savereg = await reg.save();
        res.send(savereg);
    }
    catch (e) {
        console.log("product error is: ");
    }
}
);
//users
rout.get("/users", AdminAuthentication, async (req, res) => {
    try {
        const reg = await Loginmens.find({}, { "username": 1, "email": 1, "phoneno": 1 });
        console.log("reg ", reg);
        res.send(reg);
    }
    catch (e) {
        console.log(e);
    }
});
//single users
rout.post("/particular_users", AdminAuthentication, async (req, res) => {
    try {
        const { _id } = req.body;
        // console.log("particular_users ", _id);
        const reg = await Loginmens.findOne({ _id }, { "username": 1, "email": 1, "phoneno": 1, "messages": 1 });
        // console.log("reg ", reg);
        res.send(reg);
    }
    catch (e) {
        console.log(e);
    }
});
//update user
rout.put("/user", AdminAuthentication, async (req, res) => {
    try {
        const { _id, username, phoneno, email, password } = req.body;
        // console.log("edit user ", req.body)
        //create an object of collection or model
        const obj = await Loginmens();
        if (obj) {
            const pass = await obj.enc_pass(password);
            const reg = await Loginmens.findOneAndUpdate({ _id }, { username, phoneno, email, password: pass });
            const savereg = await reg.save();
            console.log("savereg ", savereg);
            res.send(savereg);
        }
    }
    catch (e) {
        console.log("update user error ", e);

    }
})
//delet user
rout.delete("/user/del", AdminAuthentication, async (req, res) => {
    try {
        const data = req.body._id;
        const reg = await Loginmens.deleteOne({ "_id": data });
        console.log("reg ", reg);
        res.send(reg);
    }
    catch (e) {
        console.log(e);
    }
})
//add new user
rout.post("/add_new_user", AdminAuthentication, async (req, res) => {
    try {
        const { username, phoneno, email, password } = req.body;
        const reg = new Loginmens({
            username,
            phoneno,
            email,
            password
        });
        const savereg = await reg.save();
        console.log("savereg ", savereg);
        res.send(savereg);
    }
    catch (e) {
        console.log(e);
    }
})
// get All orders 
rout.get("/orders", AdminAuthentication, async (req, res) => {
    try {
        const data = req.body._id;
        const reg = await Loginmens.find({}, { "addtocarts": 1 });
        console.log("reg ", reg);
        res.send(reg);
    }
    catch (e) {
        console.log(e);
    }
})
// get latest orders 
rout.get("/latest_orders", AdminAuthentication, async (req, res) => {
    try {
        const data = req.body._id;
        const reg = await Loginmens.find({}, { "addtocarts": -1 }).limit(3);
        console.log("reg ", reg);
        res.send(reg);
    }
    catch (e) {
        console.log(e);
    }
})
// get user products 
rout.get("/user/product", AdminAuthentication, async (req, res) => {
    try {
        const data = req.body._id;
        const reg = await Loginmens.find({ "_id": data }, { "addtocarts": 1 });
        console.log("reg ", reg);
        res.send(reg);
    }
    catch (e) {
        console.log(e);
    }
})
//delete user products
rout.delete("/order", AdminAuthentication, async (req, res) => {
    try {
        const data = req.body._id;
        const reg = await Loginmens.find({ "_id": data }, { "addtocarts": 1 });
        console.log("reg ", reg);
        res.send(reg);
    }
    catch (e) {
        console.log(e);
    }
})
//add new product
rout.post("/add_new_product", AdminAuthentication, async (req, res) => {
    try {
        const { name, category, img, describtion, amount, item, discount, image_details } = req.body;
        const reg = new Products({
            name,
            category,
            img,
            describtion,
            amount,
            item,
            discount,
            image_details
        });

        // console.log("reg: " + reg);
        const savereg = await reg.save();
        console.log("reg2: " + reg);
        res.send(savereg);
    }
    catch (e) {
        console.log(e);
    }
})
// particular product
rout.post("/perticular_product", AdminAuthentication, async (req, res) => {
    try {
        const { _id } = req.body;
        console.log("_id ", _id);
        const reg = await Products.findOne({ _id });
        console.log("reg ", reg);
        res.send(reg);
    }
    catch (e) {
        console.log(e);
    }
})
// edit product
rout.put("/product", AdminAuthentication, async (req, res) => {
    try {
        const { _id, name, category, img, describtion, amount, item, discount, image_details } = req.body;
        const obj = await Products();
        if (obj) {
            const reg = await Products.findOneAndUpdate({ _id }, { name, category, img, describtion, amount, item, discount, image_details });
            const savereg = await reg.save();
            console.log("savereg ", savereg);
            res.send(savereg);
        }
    }
    catch (e) {
        console.log(e);
    }
})
// delete product
rout.delete("/product/del", AdminAuthentication, async (req, res) => {
    try {
        const _id = req.body._id;
        const reg = await Products.deleteOne({ _id });
        console.log("reg ", reg);
        res.send(reg);
    }
    catch (e) {
        console.log(e);
    }
})
//get message
rout.get("/message", AdminAuthentication, async (req, res) => {
    try {
        const data = req.body._id;
        const reg = await Loginmens.find({}, { "messages": 1 });
        console.log("reg ", reg);
        res.send(reg);
    }
    catch (e) {
        console.log(e);
    }
})
//get user message 
rout.get("/user/message", AdminAuthentication, async (req, res) => {
    try {
        const data = req.body._id;
        const reg = await Loginmens.find({ "_id": data }, { "messages": 1 });
        console.log("reg ", reg);
        res.send(reg);
    }
    catch (e) {
        console.log(e);
    }
})

//logout user
rout.get("/logout", Authentication, async (req, res) => {
    try {
        req.rootusers.tokens = req.rootusers.tokens.filter((elem) => {
            console.log("elem :", elem)
            if (elem !== null) {
                console.log("elem token: ", elem.token);
                return elem.token !== req.token;
            }
        })
        res.clearCookie("salman");
        await req.rootusers.save();
        res.send(req.token);
    }
    catch (e) {
        console.log("not gen token: ", e);
    }
});

module.exports = rout;

