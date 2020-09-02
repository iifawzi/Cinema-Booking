const request = require("supertest");
const app = require("../../server");
const { createToken } = require("../../helpers/jwt");
const {deleteCinema} = require("../cinemas");
const {deleteCountry} = require("../countries");

let expect = require("chai").expect;


describe("/api/cinemaAccounts", async()=>{
    describe("/addAccount", ()=>{
        it ("Should respond 400 if schema validation fails", async()=>{
            const token = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
            const res = await request(app)
                .post("/api/cinemas/addCinema")
                .set({authorization: "Bearer "+token})
                .send({
                    "cinema_en": "El Crwan",
                    "cinema_ar": "الكروان",
                });
            expect(res.statusCode).equals(400);
        });
        it ("Should respond 201 if created successfully", async()=>{
            const token = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
            const cinemaToken = createToken({phone_number: "01090243795", cinema_id: 1,role:"csuperadmin"});
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
            res = await request(app)
                .post("/api/cinemaAccounts/addAccount")
                .set({authorization: "Bearer "+cinemaToken})
                .send({
                    "username": "cinemaa", 
                    "password": "12qwaszx",
                    "role": "csuperadmin",
                    "cinema_id": cinemaId,
                });
            expect(res.statusCode).equals(201);
            await deleteCinema(cinemaId);
            await deleteCountry(country_id);
        });
        it ("Should respond 409 if username already registered", async()=>{
            const token = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
            const cinemaToken = createToken({phone_number: "01090243795", cinema_id: 1,role:"csuperadmin"});
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
            res = await request(app)
                .post("/api/cinemaAccounts/addAccount")
                .set({authorization: "Bearer "+cinemaToken})
                .send({
                    "username": "cinemaa", 
                    "password": "12qwaszx",
                    "role": "csuperadmin",
                    "cinema_id": cinemaId,
                });
            expect(res.statusCode).equals(201);
            res = await request(app)
                .post("/api/cinemaAccounts/addAccount")
                .set({authorization: "Bearer "+cinemaToken})
                .send({
                    "username": "cinemaa", 
                    "password": "12qwaszx",
                    "role": "csuperadmin",
                    "cinema_id": cinemaId,
                });
            expect(res.statusCode).equals(409);
            await deleteCinema(cinemaId);
            await deleteCountry(country_id);
        });
    });


    describe("/signinAccount", ()=>{
        it ("Should respond 400 if schema validation fails", async()=>{
            const res = await request(app)
                .post("/api/cinemaAccounts/signinAccount")
                .send({
                    "username": "crowann", 
                });
            expect(res.statusCode).equals(400);
        });
        it ("Should respond 200 if signin correctely", async()=>{
            const token = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
            const cinemaToken = createToken({phone_number: "01090243795", cinema_id: 1,role:"csuperadmin"});
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
            const cinema_id = res.body.data.cinema_id;
            res = await request(app)
            .post("/api/cinemaAccounts/addAccount")
            .set({authorization: "Bearer "+cinemaToken})
            .send({
                "username": "cinemaa", 
                "password": "12qwaszx",
                "role": "csuperadmin",
                "cinema_id": cinema_id,
            });
            expect(res.statusCode).equals(201);
            res = await request(app)
                .post("/api/cinemaAccounts/signinAccount")
                .send({
                    "username": "cinemaa", 
                    "password": "12qwaszx",
                });
            expect(res.statusCode).equals(200);
            res = await request(app)
                .post("/api/cinemaAccounts/signinAccount")
                .send({
                    "username": "cinemaa", 
                    "password": "qwaszx",
                });
            expect(res.statusCode).equals(401); // password is not correct, or username is not correct
            await deleteCinema(cinema_id);
            await deleteCountry(country_id);
        });
        it ("Should respond 401 if username is not registered", async()=>{
            const res = await request(app)
                .post("/api/cinemaAccounts/signinAccount")
                .send({
                    "username": "fawzi", 
                    "password": "12qwaszx",
                });
            expect(res.statusCode).equals(401);
        });
    });

    describe("/refreshToken", ()=>{
        it ("Should respond 400 if schema validation fails", async()=>{
            const res = await request(app)
                .post("/api/cinemaAccounts/refreshToken")
                .send({
                });
            expect(res.statusCode).equals(400);
        });
        it ("Should respond 401 if token is not found", async()=>{
            const res = await request(app)
                .post("/api/cinemaAccounts/refreshToken")
                .send({
                    "refresh_token":"a0bd58db7f30ad61f35eb9ead30e55d3"
                    });
            expect(res.statusCode).equals(401);
        });
        it ("Should respond 401 if token is invalid", async()=>{
            const res = await request(app)
                .post("/api/cinemaAccounts/refreshToken")
                .set({authorization: "Bearer "+ "djkdjkjdkjdkjdjkdjkdkjdkjdkjkjd"})
                .send({
                    "refresh_token":"a0bd58db7f30ad61f35eb9ead30e55d3"
                    });
            expect(res.statusCode).equals(401);
        });
        it ("Should respond 401 if refresh_token not match the account_id which is stored in token - in db", async()=>{
            const token = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
            const cinemaToken = createToken({account_id: 23,username: 'fawzi', cinema_id: 1,role:"csuperadmin"});
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
            const cinema_id = res.body.data.cinema_id;
            res = await request(app)
            .post("/api/cinemaAccounts/addAccount")
            .set({authorization: "Bearer "+cinemaToken})
            .send({
                "username": "cinemaa", 
                "password": "12qwaszx",
                "role": "csuperadmin",
                "cinema_id": cinema_id,
            });
            expect(res.statusCode).equals(201);
            res = await request(app)
                .post("/api/cinemaAccounts/signinAccount")
                .send({
                    "username": "cinemaa", 
                    "password": "12qwaszx",
                });
            expect(res.statusCode).equals(200);
            const refreshToken = res.body.data.refresh_token;
            res = await request(app)
            .post("/api/cinemaAccounts/refreshToken")
            .set({authorization: "Bearer "+cinemaToken})
            .send({
                "refresh_token":refreshToken
                });
        expect(res.statusCode).equals(401);
            await deleteCinema(cinema_id);
            await deleteCountry(country_id);
        });

        it ("Should respond 200 if new token is generated successfully", async()=>{
            const token = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
            const cinemaToken = createToken({account_id: 23,username: 'fawzi', cinema_id: 1,role:"csuperadmin"});
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
            const cinema_id = res.body.data.cinema_id;
            res = await request(app)
            .post("/api/cinemaAccounts/addAccount")
            .set({authorization: "Bearer "+cinemaToken})
            .send({
                "username": "cinemaa", 
                "password": "12qwaszx",
                "role": "csuperadmin",
                "cinema_id": cinema_id,
            });
            expect(res.statusCode).equals(201);
            res = await request(app)
                .post("/api/cinemaAccounts/signinAccount")
                .send({
                    "username": "cinemaa", 
                    "password": "12qwaszx",
                });
            expect(res.statusCode).equals(200);
            const refreshToken = res.body.data.refresh_token;
            const accountToken = res.body.data.token;
            res = await request(app)
            .post("/api/cinemaAccounts/refreshToken")
            .set({authorization: "Bearer "+accountToken})
            .send({
                "refresh_token":refreshToken,
                });
            expect(res.statusCode).equals(200);
            await deleteCinema(cinema_id);
            await deleteCountry(country_id);
        });
    });
});