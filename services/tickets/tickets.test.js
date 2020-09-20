const request = require("supertest");
const app = require("../../server");
const {createToken} = require("../../helpers/jwt");
const {deleteSlot} = require("../slots");
const {deleteHall} = require("../halls");
const {deleteCinema} = require("../cinemas/");
const {deleteCountry} = require("../countries");
const {deleteMovie } = require("../movies/");
const {deleteUser} = require("../users/");
let expect = require("chai").expect;


describe("/api/tickets", async()=>{
    describe("/addTicket", ()=>{
        it("Should Respond 400 if schema validation fails", async ()=>{
            const token = createToken({phone_number: "01090243795", user_id: 1,role:"user"});
            let res = await request(app)
            .post("/api/tickets/addTicket")
            .set({authorization: "Bearer "+ token})
            .send({
                "row": 1,
                "slot_id": 1,
            });
            expect(res.statusCode).equals(400);
        });
        it("Should Respond 200 if seat is booked successfully", async ()=>{
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
            .set({authorization: "Bearer "+token})
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
            .post("/api/users/signup")
            .send({
                "phone_number":"01090243796",
                "first_name":"fawzi",
                "last_name":"essam",
                "area_id":area_id,
                "firebase_token":"93484893983498"
            });
            expect(res.statusCode).equals(201);
            const userId = res.body.data.user_id;
            const userToken = createToken({phone_number: "01090243795", user_id: userId,role:"user"});
            res = await request(app)
            .post("/api/tickets/addTicket")
            .set({authorization: "Bearer "+ userToken})
            .send({
                "row": 1,
                "column": 10,
                "slot_id": slotId,
                "hall_id": hallId,
                "reservation_date": "2020-07-25"
            });
            expect(res.statusCode).equals(201);
            await deleteUser("01090243796");
            await deleteSlot(slotId);
            await deleteHall(hallId);
            await deleteMovie(movieId);
            await deleteCinema(cinemaId);
            await deleteCountry(country_id);
        });
    })
})