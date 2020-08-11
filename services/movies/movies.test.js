const request = require("supertest");
const app = require("../../server");
const { createToken } = require("../../helpers/jwt");
const {deleteMovie} = require("./movies.service");
let expect = require("chai").expect;


describe("/api/movies", async()=>{
    describe("/addMovie", ()=>{
        it ("Should respond 400 if schema validation fails", async()=>{
            const token = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
            const res = await request(app)
                .post("/api/movies/addMovie")
                .set({authorization: "Bearer "+token})
                .send({
                    "movie_name":"The biggest one2",
                    "cover": "https://www.google.com2", 
                    "category": "action", 
                });
            expect(res.statusCode).equals(400);
        });
        it ("Should respond 201 if created successfully", async()=>{
            const token = createToken({phone_number: "01090243795", admin_id: 1,role:"admin"});
            const res = await request(app)
                .post("/api/movies/addMovie")
                .set({authorization: "Bearer "+token})
                .send({
                    "movie_name":"The biggest one2",
                    "cover": "https://www.google.com2", 
                    "duration": 60,
                    "category": "action", 
                    "description": "The best movie ever2", 
                    "rate": 4
                });
            expect(res.statusCode).equals(201);
            const movie_id = res.body.data.movie_id;
            await deleteMovie(movie_id);
        });
    });

    describe("/getMoviesInCity", ()=>{
        it ("Should respond 400 if schema validation fails", async()=>{
            const res = await request(app)
                .post("/api/movies/getMoviesInCity")
                .send({
                    "city": "port said",
                });
            expect(res.statusCode).equals(400);
        });
        it ("Should respond 200 if got movies successfully", async()=>{ // will return empty data if no movies found in this city, country
            const res = await request(app)
                .post("/api/movies/getMoviesInCity")
                .send({
                    "city": "port said",
                    "country": "egypt"
                });
            expect(res.statusCode).equals(200);
        });

    });
});