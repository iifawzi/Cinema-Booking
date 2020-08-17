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
            const token = createToken({username: "crownn", cinema_id: 1,role:"cinema"});
            const res = await request(app)
                .post("/api/halls/addHall")
                .set({authorization: "Bearer "+token})
                .send({
                    "movie_id": 1,
                    "hall_id": 1,
                    "hall_description": "The best hall in the world",
                    "start_date": "2020-07-24",
                    "end_date": "2020-07-30",
                    "start_time": "23:30:00",
                    "hall_status": false
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
                    "cinema_name": "El Crwan",
                    "cinema_description": "the best in the world",
                    "cinema_logo": "www.imagelink.com",
                    "username": "crowann", 
                    "password": "12qwaszx",
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
                    "left_chairs": 30,
                    "right_chairs": 30,
                    "center_chairs": 40,
                    "hall_status": false
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
                    "start_date": "2020-07-24",
                    "end_date": "2020-07-30",
                    "start_time": "23:30:00",
                    "end_time": "23:55:00",
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
                    "cinema_name": "El Crwan",
                    "cinema_description": "the best in the world",
                    "cinema_logo": "www.imagelink.com",
                    "username": "crowann", 
                    "password": "12qwaszx",
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
                    "left_chairs": 30,
                    "right_chairs": 30,
                    "center_chairs": 40,
                    "hall_status": false
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
                    "start_date": "2020-07-24",
                    "end_date": "2020-07-30",
                    "start_time": "21:00:00",
                    "end_time": "22:00:00",
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
                    "start_date": "2020-07-25",
                    "end_date": "2020-07-30",
                    "start_time": "21:30:00",
                    "end_time": "23:00:00",
                    "slot_status": false
                });
            expect(res.statusCode).equals(409);
            res = await request(app)
            .post("/api/slots/addSlot")
            .set({authorization: "Bearer "+cinemaToken})
            .send({
                "movie_id": movieId,
                "hall_id": hallId,
                "start_date": "2020-07-24",
                "end_date": "2020-07-30",
                "start_time": "19:00:00",
                "end_time": "23:30:00",
                "slot_status": false
            });
        expect(res.statusCode).equals(409);
        res = await request(app)
            .post("/api/slots/addSlot")
            .set({authorization: "Bearer "+cinemaToken})
            .send({
                "movie_id": movieId,
                "hall_id": hallId,
                "start_date": "2020-07-24",
                "end_date": "2020-07-30",
                "start_time": "19:00:00",
                "end_time": "23:00:00",
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
            const token = createToken({phone_number: "01090243795", cinema_id: 1,role:"cinema"});
            const res = await request(app)
                .patch("/api/slots/toggleSlotStatus")
                .set({authorization: "Bearer "+token})
                .send({
                    "slot_iid": 1,
                });
            expect(res.statusCode).equals(400);
        });
        it ("Should respond 404 if hall is not found", async()=>{ 
            const token = createToken({phone_number: "01090243795", cinema_id: 1,role:"cinema"});
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
                    "cinema_name": "El Crwan",
                    "cinema_description": "the best in the world",
                    "cinema_logo": "www.imagelink.com",
                    "username": "crowann", 
                    "password": "12qwaszx",
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
                    "left_chairs": 30,
                    "right_chairs": 30,
                    "center_chairs": 40,
                    "hall_status": false
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
                    "start_date": "2020-07-25",
                    "end_date": "2020-07-30",
                    "start_time": "21:30:00",
                    "end_time": "23:00:00",
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