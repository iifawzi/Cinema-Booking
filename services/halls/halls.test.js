const request = require("supertest");
const app = require("../../server");
const { createToken } = require("../../helpers/jwt");
const {deleteHall} = require("./halls.service");
const {deleteCountry} = require("../countries");
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
            const token = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
            let res = await request(app)
            .post("/api/countries/addCountry")
            .set({authorization: "Bearer "+ token})
            .send({
                "country_ar": "السعودية", 
                "country_en": "Saudi Arabia"
            });
            expect(res.statusCode).equals(201);
            const country_id = res.body.data.country_id;
            res = await request(app)
            .post("/api/areas/addArea")
            .set({authorization: "Bearer "+ token})
            .send({
                "country_id": country_id, 
                "area_ar": "بورسعيد",
                "area_en": "Port Said"
            });
            expect(res.statusCode).equals(201);
            const area_id = res.body.data.area_id;
            res = await request(app)
                .post("/api/cinemas/addCinema")
                .set({authorization: "Bearer "+token})
                .send({
                    "cinema_name": "El Crwan",
                    "cinema_description": "the best in the world",
                    "cinema_logo": "www.imagelink.com",
                    "contact_number": "01090243795",
                    "area_id": area_id,
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
                    "rowsNumber": 30,
                    "columnsNumber": 30,
                    "hall_status": false
                });
            expect(res.statusCode).equals(201);
            await deleteHall(res.body.data.hall_id);
            await deleteCinema(cinemaId);
            await deleteCountry(country_id);
        });

        it ("Should respond 409 if name is already exists", async()=>{
            const token = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
            let res = await request(app)
            .post("/api/countries/addCountry")
            .set({authorization: "Bearer "+ token})
            .send({
                "country_ar": "السعودية", 
                "country_en": "Saudi Arabia"
            });
            expect(res.statusCode).equals(201);
            const country_id = res.body.data.country_id;
            res = await request(app)
            .post("/api/areas/addArea")
            .set({authorization: "Bearer "+ token})
            .send({
                "country_id": country_id, 
                "area_ar": "بورسعيد",
                "area_en": "Port Said"
            });
            expect(res.statusCode).equals(201);
            const area_id = res.body.data.area_id;
            res = await request(app)
                .post("/api/cinemas/addCinema")
                .set({authorization: "Bearer "+token})
                .send({
                    "cinema_name": "El Crwan",
                    "cinema_description": "the best in the world",
                    "cinema_logo": "www.imagelink.com",
                    "contact_number": "01090243795",
                    "area_id": area_id,
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
                    "rowsNumber": 30,
                    "columnsNumber": 30,
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
                "rowsNumber": 30,
                "columnsNumber": 30,
                "hall_status": false
            });
        expect(res.statusCode).equals(409);
            await deleteHall(hall_id);
            await deleteCinema(cinemaId);
            await deleteCountry(country_id);
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
            const token = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
            let res = await request(app)
            .post("/api/countries/addCountry")
            .set({authorization: "Bearer "+ token})
            .send({
                "country_ar": "السعودية", 
                "country_en": "Saudi Arabia"
            });
            expect(res.statusCode).equals(201);
            const country_id = res.body.data.country_id;
            res = await request(app)
            .post("/api/areas/addArea")
            .set({authorization: "Bearer "+ token})
            .send({
                "country_id": country_id, 
                "area_ar": "بورسعيد",
                "area_en": "Port Said"
            });
            expect(res.statusCode).equals(201);
            const area_id = res.body.data.area_id;
            res = await request(app)
                .post("/api/cinemas/addCinema")
                .set({authorization: "Bearer "+token})
                .send({
                    "cinema_name": "El Crwan",
                    "cinema_description": "the best in the world",
                    "cinema_logo": "www.imagelink.com",
                    "contact_number": "01090243795",
                    "area_id": area_id,
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
                    "rowsNumber": 30,
                    "columnsNumber": 30,
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
            await deleteCountry(country_id);
        });

    });
});