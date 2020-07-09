const request = require("supertest");
process.env.NODE_ENV = "test";
const app = require("../../server");
const { createToken } = require("../../helpers/jwt");
let expect = require("chai").expect;


describe("/moddilewares/is-auth", async()=>{
    it("Should return 401 if authorization header is not found", async () => {
        const res = await request(app)
            .get("/api/welcome");
        expect(res.statusCode).equals(401);
    });
    it("Should return 401 if authorization token is not found", async () => {
        const res = await request(app)
            .get("/api/welcome")
            .set({authorization: "Bearer"});
        expect(res.statusCode).equals(401);
    });
    it("Should return 401 if authorization token is not valid", async () => {
        const res = await request(app)
            .get("/api/welcome")
            .set({authorization: "Bearer djkhdhjkdhkjdkjhhdjkjdhkkjh478478874gufy"});
        expect(res.statusCode).equals(401);
    });
    it("Should return 200 if authorization token is correct and not expired", async () => { 
        const token = createToken({phone_number: "01090243795"});
        const res = await request(app)
            .get("/api/welcome")
            .set({authorization: "Bearer "+token});
        expect(res.statusCode).equals(200);
    });
    /*

    Edit the expire to 0s and test the one below: 

    */

    // it("Should return 401 if authorization token is expired", async () => { 
    //     const token = createToken({phone_number: "01090243795"});
    //     const res = await request(app)
    //         .get("/api/welcome")
    //         .set({authorization: "Bearer "+token});
    //     expect(res.statusCode).equals(401);
    // });
});