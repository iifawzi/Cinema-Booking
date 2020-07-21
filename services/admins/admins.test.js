const request = require("supertest");
const app = require("../../server");
const { createToken } = require("../../helpers/jwt");
const {deleteAdmin} = require("./admins.service");
let expect = require("chai").expect;


describe("/api/admins", async()=>{
    describe("/addAdmin", ()=>{
        it ("Should respond 400 if schema validation fails", async()=>{
            const token = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
            const res = await request(app)
                .post("/api/admins/addAdmin")
                .set({authorization: "Bearer "+token})
                .send({
                    "first_name": "Fawzi",
                    "last_name": "Abdulfattah",
                    "role": "admin"
                });
            expect(res.statusCode).equals(400);
        });
        it ("Should respond 201 if created successfully", async()=>{
            const token = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
            const res = await request(app)
                .post("/api/admins/addAdmin")
                .set({authorization: "Bearer "+token})
                .send({
                    "first_name": "Fawzi",
                    "last_name": "Abdulfattah",
                    "username": "iifawzi",
                    "password": "qwaszx",
                    "role": "admin"
                });
            expect(res.statusCode).equals(201);
            await deleteAdmin(res.body.data.admin_id);
        });
        it ("Should respond 409 if username already registered", async()=>{
            const token = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
            let res = await request(app)
                .post("/api/admins/addAdmin")
                .set({authorization: "Bearer "+token})
                .send({
                    "first_name": "Fawzi",
                    "last_name": "Abdulfattah",
                    "username": "iifawzi",
                    "password": "qwaszx",
                    "role": "admin"
                });
            expect(res.statusCode).equals(201);
            const admin_id = res.body.data.admin_id;
            res = await request(app)
                .post("/api/admins/addAdmin")
                .set({authorization: "Bearer "+token})
                .send({
                    "first_name": "Fawzi",
                    "last_name": "Abdulfattah",
                    "username": "iifawzi",
                    "password": "qwaszx",
                    "role": "admin"
                });
            expect(res.statusCode).equals(409);
            await deleteAdmin(admin_id);
        });
    });



    describe("/signinAdmin", ()=>{
        it ("Should respond 400 if schema validation fails", async()=>{
            const res = await request(app)
                .post("/api/admins/signinAdmin")
                .send({
                    "username": "iifawzi",
                });
            expect(res.statusCode).equals(400);
        });
        it ("Should respond 200 if signin correctely", async()=>{
            const token = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
            let res = await request(app)
                .post("/api/admins/addAdmin")
                .set({authorization: "Bearer "+token})
                .send({
                    "first_name": "Fawzi",
                    "last_name": "Abdulfattah",
                    "username": "iifawzi",
                    "password": "qwaszx",
                    "role": "admin"
                });
            expect(res.statusCode).equals(201);
            const admin_id = res.body.data.admin_id;
            res = await request(app)
                .post("/api/admins/signinAdmin")
                .send({
                    "username": "iifawzi",
                    "password": "qwaszx",
                });
            expect(res.statusCode).equals(200);
            await deleteAdmin(admin_id);
        });
        it ("Should respond 401 if username is not registered", async()=>{
            const res = await request(app)
                .post("/api/admins/signinAdmin")
                .send({
                    "username": "ahmed", 
                    "password": "qwaszx",
                });
            expect(res.statusCode).equals(401);
        });
        it ("Should respond 401 if password is  incorrect", async()=>{
            const res = await request(app)
                .post("/api/admins/signinAdmin")
                .send({
                    "username": "iifawzi", 
                    "password": "1233345",
                });
            expect(res.statusCode).equals(401);
        });
    });
});