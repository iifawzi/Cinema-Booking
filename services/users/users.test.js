const request = require("supertest");
const app = require("../../server");
const userService = require("./users.service");
let expect = require("chai").expect;
let server;

describe("/api/users",async()=>{
    describe("/signup", () => {
        it("Should return 400 if schema validation fails", async () => {
            const res = await request(app)
                .post("/api/users/signup")
                .send({
                    userId: 1,
                });
            expect(res.statusCode).equals(400);
        });
        it("Should return 201 if user registered successfully", async () => {
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
        it("Should return 409 if Phone is already registered", async () => {
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
        it("Should return 400 if schema validation fails", async () => {
            const res = await request(app)
                .post("/api/users/signin");
            expect(res.statusCode).equals(400);
        });
        it("Should return 401 if Phone number is not registered", async () => {
            const res = await request(app)
                .post("/api/users/signin")
                .send({
                    "phone_number":"01090243796",
                });
            expect(res.statusCode).equals(401);
        });
        it("Should return 200 if logined successfully", async () => {
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
});