const request = require("supertest");
const app = require("../../server");
const { createToken } = require("../../helpers/jwt");
const {deleteCinema} = require("./cinemas.service");
let expect = require("chai").expect;


describe("/api/cinemas", async()=>{
    describe("/addCinema", ()=>{
        it ("Should respond 400 if schema validation fails", async()=>{
            const token = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
            const res = await request(app)
                .post("/api/cinemas/addCinema")
                .set({authorization: "Bearer "+token})
                .send({
                    "cinema_name": "El Crwan",
                    "username": "crowann", 
                    "password": "12qwaszx",
                });
            expect(res.statusCode).equals(400);
        });
        it ("Should respond 201 if created successfully", async()=>{
            const token = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
            const res = await request(app)
                .post("/api/cinemas/addCinema")
                .set({authorization: "Bearer "+token})
                .send({
                    "cinema_name": "El Crwan",
                    "cinema_description": "the best in the world",
                    "cinema_logo": "www.imagelink.com",
                    "username": "crowann", 
                    "password": "12qwaszx",
                    "contact_number": "01090243795",
                    "country":"Egypt",
                    "city": "Port Said"
                });
            expect(res.statusCode).equals(201);
            await deleteCinema(res.body.data.cinema_id);

        });
        it ("Should respond 409 if username already registered", async()=>{
            const token = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
            let res = await request(app)
                .post("/api/cinemas/addCinema")
                .set({authorization: "Bearer "+token})
                .send({
                    "cinema_name": "El Crwan",
                    "cinema_description": "the best in the world",
                    "cinema_logo": "www.imagelink.com",
                    "username": "crowann", 
                    "password": "12qwaszx",
                    "contact_number": "01090243795",
                    "country":"Egypt",
                    "city": "Port Said"
                });
            expect(res.statusCode).equals(201);
            const cinema_id = res.body.data.cinema_id;
            res = await request(app)
                .post("/api/cinemas/addCinema")
                .set({authorization: "Bearer "+token})
                .send({
                    "cinema_name": "El Crwan",
                    "cinema_description": "the best in the world",
                    "cinema_logo": "www.imagelink.com",
                    "username": "crowann", 
                    "password": "12qwaszx",
                    "contact_number": "01090243795",
                    "country":"Egypt",
                    "city": "Port Said"
                });
            expect(res.statusCode).equals(409);
            await deleteCinema(cinema_id);
        });
    });



    describe("/signinCinema", ()=>{
        it ("Should respond 400 if schema validation fails", async()=>{
            const res = await request(app)
                .post("/api/cinemas/signinCinema")
                .send({
                    "username": "crowann", 
                });
            expect(res.statusCode).equals(400);
        });
        it ("Should respond 200 if signin correctely", async()=>{
            const token = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
            let res = await request(app)
                .post("/api/cinemas/addCinema")
                .set({authorization: "Bearer "+token})
                .send({
                    "cinema_name": "El Crwan",
                    "cinema_description": "the best in the world",
                    "cinema_logo": "www.imagelink.com",
                    "username": "crowann", 
                    "password": "12qwaszx",
                    "contact_number": "01090243795",
                    "country":"Egypt",
                    "city": "Port Said"
                });
            expect(res.statusCode).equals(201);
            const cinema_id = res.body.data.cinema_id;
            res = await request(app)
                .post("/api/cinemas/signinCinema")
                .send({
                    "username": "crowann", 
                    "password": "12qwaszx",
                });
            expect(res.statusCode).equals(200);
            await deleteCinema(cinema_id);
        });
        it ("Should respond 401 if username is not registered", async()=>{
            const res = await request(app)
                .post("/api/cinemas/signinCinema")
                .send({
                    "username": "fawzi", 
                    "password": "12qwaszx",
                });
            expect(res.statusCode).equals(401);
        });
        it ("Should respond 401 if password is  incorrect", async()=>{
            const res = await request(app)
                .post("/api/cinemas/signinCinema")
                .send({
                    "username": "crowann", 
                    "password": "qwaszx",
                });
            expect(res.statusCode).equals(401);
        });
    });


    describe("/getCinemasForMovie", ()=>{
        it ("Should respond 400 if schema validation fails", async()=>{
            const res = await request(app)
                .post("/api/cinemas/getCinemasForMovie")
                .send({
                    "city": "port said",
                });
            expect(res.statusCode).equals(400);
        });
        it ("Should respond 200 if got cinemas successfully", async()=>{ // will return empty data if no cinemas found for this movie:
            const res = await request(app)
                .post("/api/cinemas/getCinemasForMovie")
                .send({
                    "city": "Port Said", 
                    "country": "Egypt",
                    "movie_id": 16
                });
            expect(res.statusCode).equals(200);
        });

    });

    describe("/toggleCinemaStatus", ()=>{
        it ("Should respond 400 if schema validation fails", async()=>{
            const token = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
            const res = await request(app)
                .patch("/api/cinemas/toggleCinemaStatus")
                .set({authorization: "Bearer "+token})
                .send({
                    "cinema_name": "Crwan",
                });
            expect(res.statusCode).equals(400);
        });
        it ("Should respond 404 if cinema is not found", async()=>{ 
            const token = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
            const res = await request(app)
                .patch("/api/cinemas/toggleCinemaStatus")
                .set({authorization: "Bearer "+token})
                .send({
                    "cinema_id": 2837
                });
            expect(res.statusCode).equals(404);
        });
        it ("Should respond 200 if update the cinema's status successfully", async()=>{ 
            const token = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
            let res = await request(app)
                .post("/api/cinemas/addCinema")
                .set({authorization: "Bearer "+token})
                .send({
                    "cinema_name": "El Crwan",
                    "cinema_description": "the best in the world",
                    "cinema_logo": "www.imagelink.com",
                    "username": "crowann", 
                    "password": "12qwaszx",
                    "contact_number": "01090243795",
                    "country":"Egypt",
                    "city": "Port Said"
                });
            expect(res.statusCode).equals(201);
            const cinema_id = res.body.data.cinema_id;
            res = await request(app)
                .patch("/api/cinemas/toggleCinemaStatus")
                .set({authorization: "Bearer "+token})
                .send({
                    "cinema_id": cinema_id
                });
            expect(res.statusCode).equals(200);
            await deleteCinema(cinema_id);
        });

    });
});