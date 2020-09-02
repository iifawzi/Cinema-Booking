const request = require("supertest");
const app = require("../../server");
const { createToken } = require("../../helpers/jwt");
const {deleteSlot} = require("../slots");
const {deleteHall} = require("../halls");
const { deleteCinema } = require("../cinemas/");
const {deleteCountry} = require("../countries");
const { deleteMovie } = require("../movies/");
let expect = require("chai").expect;


describe("/api/lockedSeats", async()=>{
    describe("/lockSeat", ()=>{
        it("Should Respond 400 if schema validation fails", async ()=>{
            const token = createToken({phone_number: "01090243795", admin_id: 1,role:"cinema"});
            let res = await request(app)
            .post("/api/lockedSeats/lockSeat")
            .set({authorization: "Bearer "+ token})
            .send({
                "seat_position": "A1",
            });
            expect(res.statusCode).equals(400);
            res = await request(app)
            .post("/api/lockedSeats/lockSeat")
            .set({authorization: "Bearer "+ token})
            .send({
                "seat_position": "A1",
                "seat_id": 1,
                "hall_id": 8
            });
            expect(res.statusCode).equals(400);
        });
        it("Should Respond 200 if seat is locked successfully", async ()=>{
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
                    "ticket_price": 150,
                    "slot_status": false
                });
            expect(res.statusCode).equals(201);
            const slotId = res.body.data.slot_id;
            res = await request(app)
            .post("/api/lockedSeats/lockSeat")
            .set({authorization: "Bearer "+ cinemaToken})
            .send({
                "seat_position": "A1",
                "slot_id": slotId,
            });
            expect(res.statusCode).equals(201);
            res = await request(app)
            .post("/api/lockedSeats/lockSeat")
            .set({authorization: "Bearer "+ cinemaToken})
            .send({
                "seat_position": "A1",
                "hall_id": hallId,
            });
            expect(res.statusCode).equals(201);
            await deleteSlot(slotId);
            await deleteHall(hallId);
            await deleteMovie(movieId);
            await deleteCinema(cinemaId);
            await deleteCountry(country_id);
        });
        it("Should Respond 409 if seat is already locked", async ()=>{
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
                    "ticket_price": 150,
                    "slot_status": false
                });
            expect(res.statusCode).equals(201);
            const slotId = res.body.data.slot_id;
            res = await request(app)
            .post("/api/lockedSeats/lockSeat")
            .set({authorization: "Bearer "+ cinemaToken})
            .send({
                "seat_position": "A1",
                "slot_id": slotId,
            });
            expect(res.statusCode).equals(201);
            res = await request(app)
            .post("/api/lockedSeats/lockSeat")
            .set({authorization: "Bearer "+ cinemaToken})
            .send({
                "seat_position": "A1",
                "hall_id": hallId,
            });
            expect(res.statusCode).equals(201);
            res = await request(app)
            .post("/api/lockedSeats/lockSeat")
            .set({authorization: "Bearer "+ cinemaToken})
            .send({
                "seat_position": "A1",
                "slot_id": slotId,
            });
            expect(res.statusCode).equals(409);
            res = await request(app)
            .post("/api/lockedSeats/lockSeat")
            .set({authorization: "Bearer "+ cinemaToken})
            .send({
                "seat_position": "A1",
                "hall_id": hallId,
            });
            expect(res.statusCode).equals(409);
            await deleteSlot(slotId);
            await deleteHall(hallId);
            await deleteMovie(movieId);
            await deleteCinema(cinemaId);
            await deleteCountry(country_id);
        });
    })
})