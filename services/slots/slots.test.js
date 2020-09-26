const request = require("supertest");
const app = require("../../server");
const { createToken } = require("../../helpers/jwt");
const {deleteSlot} = require("./slots.service");
const {deleteHall} = require("../halls");
const { deleteCinema } = require("../cinemas/");
const {deleteCountry} = require("../countries");
const { deleteMovie } = require("../movies/");
let expect = require("chai").expect;

describe("/api/slots", async()=>{

    describe("/addSlot", ()=>{
        it ("Should respond 400 if schema validation fails", async()=>{
            const token = createToken({username: "crownn", cinema_id: 1,role:"csuperadmin"});
            const res = await request(app)
                .post("/api/slots/addSlot")
                .set({authorization: "Bearer "+token})
                .send({
                    "movie_id": 1,
                    "hall_id": 1,
                    "start_time": "2020-09-26T20:00:00Z",
                });
            expect(res.statusCode).equals(400);
        });
        it ("Should respond 201 if created successfully", async()=>{
            const adminToken = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
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
                    "cinema_en": "El Crwan",
                    "cinema_ar": "الكروان",
                    "cinema_description": "the best in the world",
                    "cinema_logo": "www.imagelink.com",
                    "contact_number": "01090243795",
                    "area_id": area_id,
                });
            expect(res.statusCode).equals(201);
            const cinemaId = res.body.data.cinema_id;
            const cinemaToken = createToken({username: "crownn", cinema_id: cinemaId,role:"csuperadmin"});
            res = await request(app)
                .post("/api/halls/addHall")
                .set({authorization: "Bearer "+cinemaToken})
                .send({
                    "hallInfo": {
                        "hall_name": "VIP-1",
                        "hall_description": "The best hall in the world",
                        "rows_number": 30,
                        "columns_number": 30,
                        "hall_status": false
                    },
                    "corridorsInfo": [
                        {
                            "corridor_number": 3,
                            "direction": "row"
                        }
                    ],
                    "lockedSeatsInfo": [
                        {
                            "row": 2,
                            "column": 2
                        }
                    ]
                });
            expect(res.statusCode).equals(201);
            const hallId = res.body.data.hall_id;
            res = await request(app)
            .post("/api/movies/addMovie")
            .set({authorization: "Bearer "+adminToken})
            .send({
                "movie_name":"The biggest one2",
                "cover": "https://www.google.com2", 
                "duration": 160,
                "category": "action", 
                "description": "The best movie ever2", 
                "rate": 4
            });
        expect(res.statusCode).equals(201);
        const movieId = res.body.data.movie_id;
            res = await request(app)
                .post("/api/slots/addSlot")
                .set({authorization: "Bearer "+cinemaToken})
                .send({
                    "movie_id": movieId,
                    "hall_id": hallId,
                    "start_time": "2020-09-26T20:00:00Z",
                    "end_time": "2020-09-26T22:00:00Z",
                    "ticket_price": 150,
                    "slot_status": false
                });
            expect(res.statusCode).equals(201);
            await deleteSlot(res.body.data.slot_id);
            await deleteHall(hallId);
            await deleteMovie(movieId);
            await deleteCinema(cinemaId);
            await deleteCountry(country_id);
        });

        it ("Should respond 409 if There's an slot at the entered duration", async()=>{
            const adminToken = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
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
                    "cinema_en": "El Crwan",
                    "cinema_ar": "الكروان",
                    "cinema_description": "the best in the world",
                    "cinema_logo": "www.imagelink.com",
                    "contact_number": "01090243795",
                    "area_id": area_id,
                });
            expect(res.statusCode).equals(201);
            const cinemaId = res.body.data.cinema_id;
            const cinemaToken = createToken({username: "crownn", cinema_id: cinemaId,role:"csuperadmin"});
            res = await request(app)
                .post("/api/halls/addHall")
                .set({authorization: "Bearer "+cinemaToken})
                .send({
                    "hallInfo": {
                        "hall_name": "VIP-1",
                        "hall_description": "The best hall in the world",
                        "rows_number": 30,
                        "columns_number": 30,
                        "hall_status": false
                    },
                    "corridorsInfo": [
                        {
                            "corridor_number": 3,
                            "direction": "row"
                        }
                    ],
                    "lockedSeatsInfo": [
                        {
                            "row": 2,
                            "column": 2
                        }
                    ]
                });
            expect(res.statusCode).equals(201);
            const hallId = res.body.data.hall_id;
            res = await request(app)
            .post("/api/movies/addMovie")
            .set({authorization: "Bearer "+adminToken})
            .send({
                "movie_name":"The biggest one2",
                "cover": "https://www.google.com2", 
                "duration": 160,
                "category": "action", 
                "description": "The best movie ever2", 
                "rate": 4
            });
        expect(res.statusCode).equals(201);
        const movieId = res.body.data.movie_id;
            res = await request(app)
                .post("/api/slots/addSlot")
                .set({authorization: "Bearer "+cinemaToken})
                .send({
                    "movie_id": movieId,
                    "hall_id": hallId,
                    "start_time": "2020-09-26T20:00:00Z",
                    "end_time": "2020-09-26T22:00:00Z",
                    "ticket_price": 150,
                    "slot_status": false
                });
            expect(res.statusCode).equals(201);
            const slotId = res.body.data.slot_id;
            // ALL OF THE TESTS UNDER THIS COMMENT SHOULD RESPONSD WITH 409:
            res = await request(app)
                .post("/api/slots/addSlot")
                .set({authorization: "Bearer "+cinemaToken})
                .send({
                    "movie_id": movieId,
                    "hall_id": hallId,
                    "start_time": "2020-09-26T19:00:00Z",
                    "end_time": "2020-09-26T20:01:00Z",
                    "ticket_price": 150,
                    "slot_status": false
                });
            expect(res.statusCode).equals(409);
            res = await request(app)
            .post("/api/slots/addSlot")
            .set({authorization: "Bearer "+cinemaToken})
            .send({
                "movie_id": movieId,
                "hall_id": hallId,
                "start_time": "2020-09-26T20:30:00Z",
                "end_time": "2020-09-26T22:00:00Z",
                "ticket_price": 150,
                "slot_status": false
            });
        expect(res.statusCode).equals(409);
        res = await request(app)
            .post("/api/slots/addSlot")
            .set({authorization: "Bearer "+cinemaToken})
            .send({
                "movie_id": movieId,
                "hall_id": hallId,
                "start_time": "2020-09-26T18:00:00Z",
                "end_time": "2020-09-26T22:00:00Z",
                "ticket_price": 150,
                "slot_status": false
            });
        expect(res.statusCode).equals(409);
            await deleteSlot(slotId);
            await deleteHall(hallId);
            await deleteCinema(cinemaId);
            await deleteMovie(movieId);
            await deleteCountry(country_id);
        });
    });

    describe("/toggleSlotStatus", ()=>{
        it ("Should respond 400 if schema validation fails", async()=>{
            const token = createToken({phone_number: "01090243795", cinema_id: 1,role:"csuperadmin"});
            const res = await request(app)
                .patch("/api/slots/toggleSlotStatus")
                .set({authorization: "Bearer "+token})
                .send({
                    "slot_iid": 1,
                });
            expect(res.statusCode).equals(400);
        });
        it ("Should respond 404 if hall is not found", async()=>{ 
            const token = createToken({phone_number: "01090243795", cinema_id: 1,role:"csuperadmin"});
            const res = await request(app)
                .patch("/api/slots/toggleSlotStatus")
                .set({authorization: "Bearer "+token})
                .send({
                    "slot_id": 12233
                });
            expect(res.statusCode).equals(404);
        });
        it ("Should respond 200 if update the slot's status successfully", async()=>{ 
            const adminToken = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
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
                    "cinema_en": "El Crwan",
                    "cinema_ar": "الكروان",
                    "cinema_description": "the best in the world",
                    "cinema_logo": "www.imagelink.com",
                    "contact_number": "01090243795",
                    "area_id": area_id,
                });
            expect(res.statusCode).equals(201);
            const cinemaId = res.body.data.cinema_id;
            const cinemaToken = createToken({username: "crownn", cinema_id: cinemaId,role:"csuperadmin"});
            res = await request(app)
                .post("/api/halls/addHall")
                .set({authorization: "Bearer "+cinemaToken})
                .send({
                    "hallInfo": {
                        "hall_name": "VIP-1",
                        "hall_description": "The best hall in the world",
                        "rows_number": 30,
                        "columns_number": 30,
                        "hall_status": false
                    },
                    "corridorsInfo": [
                        {
                            "corridor_number": 3,
                            "direction": "row"
                        }
                    ],
                    "lockedSeatsInfo": [
                        {
                            "row": 2,
                            "column": 2
                        }
                    ]
                });
            expect(res.statusCode).equals(201);
            const hall_id = res.body.data.hall_id;
            res = await request(app)
            .post("/api/movies/addMovie")
            .set({authorization: "Bearer "+adminToken})
            .send({
                "movie_name":"The biggest one2",
                "cover": "https://www.google.com2", 
                "duration": 160,
                "category": "action", 
                "description": "The best movie ever2", 
                "rate": 4
            });
        expect(res.statusCode).equals(201);
        const movieId = res.body.data.movie_id;
            res = await request(app)
                .post("/api/slots/addSlot")
                .set({authorization: "Bearer "+cinemaToken})
                .send({
                    "movie_id": movieId,
                    "hall_id": hall_id,
                    "start_time": "2020-09-26T20:00:00Z",
                    "end_time": "2020-09-26T22:00:00Z",
                    "ticket_price": 150,
                    "slot_status": false
                });
            const slotId = res.body.data.slot_id;
            res = await request(app)
                .patch("/api/slots/toggleSlotStatus")
                .set({authorization: "Bearer "+cinemaToken})
                .send({
                    "slot_id": slotId
                });
            expect(res.statusCode).equals(200);
            await deleteSlot(slotId);
            await deleteHall(hall_id);
            await deleteCinema(cinemaId);
            await deleteMovie(movieId);
            await deleteCountry(country_id);
        });

    });


});