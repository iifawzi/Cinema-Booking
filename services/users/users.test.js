const request = require("supertest");
const app = require("../../server");
const userService = require("./users.service");
let expect = require("chai").expect;
let server;

describe("/api/users",async()=>{
    
    describe("/signup", () => {
        it("Should respond 400 if schema validation fails", async () => {
            const res = await request(app)
                .post("/api/users/signup")
                .send({
                    userId: 1,
                });
            expect(res.statusCode).equals(400);
        });
        it("Should respond 201 if user registered successfully", async () => {
            const res = await request(app)
                .post("/api/users/signup")
                .send({
                    "phone_number":"01090243796",
                    "first_name":"fawzi",
                    "last_name":"essam",
                    "country":"egypt",
                    "city":"portsaid",
                    "firebase_token":"93484893983498"
                });
            expect(res.statusCode).equals(201);
        });
        it("Should respond 409 if Phone is already registered", async () => {
            const res = await request(app)
                .post("/api/users/signup")
                .send({
                    "phone_number":"01090243796",
                    "first_name":"fawzi",
                    "last_name":"essam",
                    "country":"egypt",
                    "city":"portsaid",
                    "firebase_token":"93484893983498"
                });
            expect(res.statusCode).equals(409);
            await userService.deleteUser("01090243796");
        });
    });

    describe("/signin", () => {
        it("Should respond 400 if schema validation fails", async () => {
            const res = await request(app)
                .post("/api/users/signin");
            expect(res.statusCode).equals(400);
        });
        it("Should respond 401 if Phone number is not registered", async () => {
            const res = await request(app)
                .post("/api/users/signin")
                .send({
                    "phone_number":"01090243796",
                });
            expect(res.statusCode).equals(401);
        });
        it("Should respond 200 if logined successfully", async () => {
            const res = await request(app)
                .post("/api/users/signup")
                .send({
                    "phone_number":"01090243796",
                    "first_name":"fawzi",
                    "last_name":"essam",
                    "country":"egypt",
                    "city":"portsaid",
                    "firebase_token":"93484893983498"
                });
            expect(res.statusCode).equals(201);
            const res2 = await request(app)
                .post("/api/users/signin")
                .send({
                    "phone_number":"01090243796",
                });
            expect(res2.statusCode).equals(200);
            await userService.deleteUser("01090243796");
        });
    });
    
    describe("/refresh_token", ()=>{
        it("Should respond 401 if no token was found", async ()=>{
            const res = await request(app)
                .post("/api/users/refresh_token")
                .send({
                    "refresh_token":"4987478947894879jydkhjdkjhdkjh",
                });
            expect(res.statusCode).equals(401);
        });
        it("Should respond 401 if token is not found", async ()=>{
            const res = await request(app)
                .post("/api/users/refresh_token")
                .send({
                    "refresh_token":"4987478947894879jydkhjdkjhdkjh",
                });
            expect(res.statusCode).equals(401);
        });
        it("Should respond 401 if token is invalid", async ()=>{
            const res = await request(app)
                .post("/api/users/refresh_token")
                .set({authorization: "Bearer djkhdhjkdhkjdkjhhdjkjdhkkjh478478874gufy"})    
                .send({
                    "refresh_token":"4987478947894879jydkhjdkjhdkjh",
                });
            expect(res.statusCode).equals(401);
        });
        it("Should respond 401 if refresh_token not match the user_id from token - in db", async ()=>{
            let res = await request(app)
                .post("/api/users/signup")
                .send({
                    "phone_number":"01090243796",
                    "first_name":"fawzi",
                    "last_name":"essam",
                    "country":"egypt",
                    "city":"portsaid",
                    "firebase_token":"93484893983498"
                });
            expect(res.statusCode).equals(201);
            const token = res.body.data.token;
            res = await request(app)
                .post("/api/users/refresh_token")
                .set({authorization: "Bearer"+token})    
                .send({
                    "refresh_token":"4987478947894879jydkhjdkjhdkjh",
                });
            expect(res.statusCode).equals(401);
            await userService.deleteUser("01090243796");
        });
        it("Should respond 200 if token updated successfully", async ()=>{
            let res = await request(app)
                .post("/api/users/signup")
                .send({
                    "phone_number":"01090243796",
                    "first_name":"fawzi",
                    "last_name":"essam",
                    "country":"egypt",
                    "city":"portsaid",
                    "firebase_token":"93484893983498"
                });
            expect(res.statusCode).equals(201);
            const token = res.body.data.token;
            const refresh_token = res.body.data.refresh_token;
            res = await request(app)
                .post("/api/users/refresh_token")
                .set({authorization: "Bearer "+token})    
                .send({
                    "refresh_token":refresh_token,
                });
            expect(res.statusCode).equals(200);
            await userService.deleteUser("01090243796");
        });
    });
});