const request = require("supertest");
const app = require("../../server");
const { createToken } = require("../../helpers/jwt");
let expect = require("chai").expect;


describe("/moddilewares/is-allowed", async()=>{
    it("Should return 403 if not authorized", async () => { 
        const token = createToken({phone_number: "01090243795", user_id: 5,role:"user"});
        const res = await request(app)
            .get("/api/welcome")
            .set({authorization: "Bearer "+token});
        expect(res.statusCode).equals(403);
    });
    it("Should return 200 if authorized", async () => { 
        const token = createToken({phone_number: "01090243795", admin_id: 5,role:"admin"});
        const res = await request(app)
            .get("/api/welcome")
            .set({authorization: "Bearer "+token});
        expect(res.statusCode).equals(200);
    });
});