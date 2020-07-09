const request = require("supertest");
const app = require("../../server");
const userService = require("./users.service");
var expect = require("chai").expect;
let server;

describe("/api/users",async()=>{
    beforeEach(()=>{
        server = require("../../app");
    });

    describe("users", () => {
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
                    "phone_number":"01090243795",
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
                    "phone_number":"01090243795",
                    "first_name":"fawzi",
                    "last_name":"essam",
                    "country":"egypt",
                    "city":"portsaid",
                    "firebase_token":"93484893983498"
                });
            expect(res.statusCode).equals(409);
            await userService.deleteUser("01090243795");
        });
    });
});