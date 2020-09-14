const request = require("supertest");
const app = require("../../server");
const { createToken } = require("../../helpers/jwt");
const {deleteHall} = require("../halls");
const { deleteCinema } = require("../cinemas");
const {deleteCountry} = require("../countries");
let expect = require("chai").expect;


describe("/api/corridors", async()=>{
    describe("/addCorridors", ()=>{
        it("Should Respond 400 if schema validation fails", async ()=>{
            const token = createToken({phone_number: "01090243795", admin_id: 1,role:"csuperadmin"});
            let res = await request(app)
            .post("/api/corridors/addCorridors")
            .set({authorization: "Bearer "+ token})
            .send({
                corridors: [{
                "hall_id": 1,
                "corridor_number": 1,
                "direction": "saf" // not allowed
            }]});
            expect(res.statusCode).equals(400);
        });
        it("Should Respond 201 if added corridor successfully", async ()=>{
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
                    "hall_name": "VIP-1", 
                    "hall_description": "The best hall in the world",
                    "rows_number": 30,
                    "columns_number": 30,
                    "hall_status": false
                });
            expect(res.statusCode).equals(201);
            const hallId = res.body.data.hall_id;
            res = await request(app)
                .post("/api/corridors/addCorridors")
                .set({authorization: "Bearer "+cinemaToken})
                .send({
                    corridors: [{
                    "hall_id": 1,
                    "corridor_number": 1,
                    "direction": "row" 
                }]});
            expect(res.statusCode).equals(201);
            await deleteHall(hallId);
            await deleteCinema(cinemaId);
            await deleteCountry(country_id);
        });
    })
})