const request = require("supertest");
const app = require("../../server");
const { createToken } = require("../../helpers/jwt");
const {deleteHall} = require("./halls.service");
const { deleteCinema } = require("../cinemas/");
let expect = require("chai").expect;

describe("/api/halls", async()=>{
 
    describe("/addHall", ()=>{
        it ("Should respond 400 if schema validation fails", async()=>{
            const token = createToken({username: "crownn", cinema_id: 1,role:"cinema"});
            const res = await request(app)
                .post("/api/halls/addHall")
                .set({authorization: "Bearer "+token})
                .send({
                    "hall_name": "VIP-1", 
                });
            expect(res.statusCode).equals(400);
        });
       
        it ("Should respond 201 if created successfully", async()=>{
            const adminToken = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
            let res = await request(app)
                .post("/api/cinemas/addCinema")
                .set({authorization: "Bearer "+adminToken})
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
            const cinemaId = res.body.data.cinema_id;
            const cinemaToken = createToken({username: "crownn", cinema_id: cinemaId,role:"cinema"});
            res = await request(app)
                .post("/api/halls/addHall")
                .set({authorization: "Bearer "+cinemaToken})
                .send({
                    "hall_name": "VIP-1", 
                    "hall_description": "The best hall in the world",
                    "left_chairs": 30,
                    "right_chairs": 30,
                    "center_chairs": 40,
                    "hall_status": false
                });
            expect(res.statusCode).equals(201);
            await deleteHall(res.body.data.hall_id);
            await deleteCinema(cinemaId);
        });

        it ("Should respond 409 if name is already exists", async()=>{
            const adminToken = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
            let res = await request(app)
                .post("/api/cinemas/addCinema")
                .set({authorization: "Bearer "+adminToken})
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
            const cinemaId = res.body.data.cinema_id;
            const cinemaToken = createToken({username: "crownn", cinema_id: cinemaId,role:"cinema"});
            res = await request(app)
                .post("/api/halls/addHall")
                .set({authorization: "Bearer "+cinemaToken})
                .send({
                    "hall_name": "VIP-1", 
                    "hall_description": "The best hall in the world",
                    "left_chairs": 30,
                    "right_chairs": 30,
                    "center_chairs": 40,
                    "hall_status": false
                });
            expect(res.statusCode).equals(201);
            const hall_id = res.body.data.hall_id;
            res = await request(app)
            .post("/api/halls/addHall")
            .set({authorization: "Bearer "+cinemaToken})
            .send({
                "hall_name": "VIP-1", 
                "hall_description": "The best hall in the world",
                "left_chairs": 30,
                "right_chairs": 30,
                "center_chairs": 40,
                "hall_status": false
            });
        expect(res.statusCode).equals(409);
            await deleteHall(hall_id);
            await deleteCinema(cinemaId);
        });
    });

    describe("/toggleHallStatus", ()=>{
        it ("Should respond 400 if schema validation fails", async()=>{
            const token = createToken({phone_number: "01090243795", cinema_id: 1,role:"cinema"});
            const res = await request(app)
                .patch("/api/halls/toggleHallStatus")
                .set({authorization: "Bearer "+token})
                .send({
                    "hall_name": "Crwan",
                });
            expect(res.statusCode).equals(400);
        });
        it ("Should respond 404 if hall is not found", async()=>{ 
            const token = createToken({phone_number: "01090243795", cinema_id: 1,role:"cinema"});
            const res = await request(app)
                .patch("/api/halls/toggleHallStatus")
                .set({authorization: "Bearer "+token})
                .send({
                    "hall_id": 12233
                });
            expect(res.statusCode).equals(404);
        });
        it ("Should respond 200 if update the hall's status successfully", async()=>{ 
            const adminToken = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
            let res = await request(app)
                .post("/api/cinemas/addCinema")
                .set({authorization: "Bearer "+adminToken})
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
            const cinemaId = res.body.data.cinema_id;
            const cinemaToken = createToken({username: "crownn", cinema_id: cinemaId,role:"cinema"});
            res = await request(app)
                .post("/api/halls/addHall")
                .set({authorization: "Bearer "+cinemaToken})
                .send({
                    "hall_name": "VIP-1", 
                    "hall_description": "The best hall in the world",
                    "left_chairs": 30,
                    "right_chairs": 30,
                    "center_chairs": 40,
                    "hall_status": false
                });
            expect(res.statusCode).equals(201);
            const hall_id = res.body.data.hall_id;
            res = await request(app)
                .patch("/api/halls/toggleHallStatus")
                .set({authorization: "Bearer "+cinemaToken})
                .send({
                    "hall_id": hall_id
                });
            expect(res.statusCode).equals(200);
            await deleteHall(hall_id);
            await deleteCinema(cinemaId);
        });

    });
});