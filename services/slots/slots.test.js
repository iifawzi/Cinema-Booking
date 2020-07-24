const request = require("supertest");
const app = require("../../server");
const { createToken } = require("../../helpers/jwt");
const {deleteSlot} = require("./slots.service");
const {deleteHall} = require("../halls");
const { deleteCinema } = require("../cinemas/");
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
                    "start_date": "2020-07-24",
                    "end_date": "2020-07-30",
                    "start_time": "23:30:00"
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
                    "username": "crowann", 
                    "password": "12qwaszx",
                    "contact_number": "01090243795",
                    "country":"Egypt",
                    "city": "Port Said"
                });
            expect(res.statusCode).equals(201);
            const cinemaId = res.body.data.cinema_id;
            const cinemaToken = createToken({username: "crownn", cinema_id: 1,role:"cinema"});
            res = await request(app)
                .post("/api/halls/addHall")
                .set({authorization: "Bearer "+cinemaToken})
                .send({
                    "hall_name": "VIP-1", 
                    "cinema_id": cinemaId,
                    "left_chairs": 30,
                    "right_chairs": 30,
                    "center_chairs": 40,
                });
            expect(res.statusCode).equals(201);
            const hallId = res.body.data.hall_id;
            res = await request(app)
                .post("/api/slots/addSlot")
                .set({authorization: "Bearer "+cinemaToken})
                .send({
                    "movie_id": 1,
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
            await deleteCinema(cinemaId);
        });

        it ("Should respond 409 if There's an slot at the entered duration", async()=>{
            const adminToken = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
            let res = await request(app)
                .post("/api/cinemas/addCinema")
                .set({authorization: "Bearer "+adminToken})
                .send({
                    "cinema_name": "El Crwan",
                    "username": "crowann", 
                    "password": "12qwaszx",
                    "contact_number": "01090243795",
                    "country":"Egypt",
                    "city": "Port Said"
                });
            expect(res.statusCode).equals(201);
            const cinemaId = res.body.data.cinema_id;
            const cinemaToken = createToken({username: "crownn", cinema_id: 1,role:"cinema"});
            res = await request(app)
                .post("/api/halls/addHall")
                .set({authorization: "Bearer "+cinemaToken})
                .send({
                    "hall_name": "VIP-1", 
                    "cinema_id": cinemaId,
                    "left_chairs": 30,
                    "right_chairs": 30,
                    "center_chairs": 40,
                });
            expect(res.statusCode).equals(201);
            const hallId = res.body.data.hall_id;
            res = await request(app)
                .post("/api/slots/addSlot")
                .set({authorization: "Bearer "+cinemaToken})
                .send({
                    "movie_id": 1,
                    "hall_id": hallId,
                    "start_date": "2020-07-24",
                    "end_date": "2020-07-30",
                    "start_time": "21:00:00",
                    "end_time": "22:00:00",
                    "slot_status": false
                });
            expect(res.statusCode).equals(201);
            const slotId = res.body.data.hall_id;
            // ALL OF THE TESTS UNDER THIS COMMENT SHOULD RESPONSD WITH 409:
            res = await request(app)
                .post("/api/slots/addSlot")
                .set({authorization: "Bearer "+cinemaToken})
                .send({
                    "movie_id": 1,
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
                "movie_id": 1,
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
                "movie_id": 1,
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
        });
    });

});