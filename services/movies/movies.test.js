const request = require("supertest");
const app = require("../../server");
const { createToken } = require("../../helpers/jwt");
let expect = require("chai").expect;


describe("/api/movies", async()=>{
    describe("/add", ()=>{
        it ("Should respond 400 if schema validation fails", async()=>{
            const token = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
            const res = await request(app)
                .post("/api/movies/add")
                .set({authorization: "Bearer "+token})
                .send({
                    "movie_name":"The biggest one2",
                    "cover": "https://www.google.com2", 
                    "category": "action", 
                });
            expect(res.statusCode).equals(400);
        });
        it ("Should respond 201 if created successfully", async()=>{
            const token = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
            const res = await request(app)
                .post("/api/movies/add")
                .set({authorization: "Bearer "+token})
                .send({
                    "movie_name":"The biggest one2",
                    "cover": "https://www.google.com2", 
                    "category": "action", 
                    "description": "The best movie ever2", 
                    "rate": 4
                });
            expect(res.statusCode).equals(400);
        });
    });
    });
});