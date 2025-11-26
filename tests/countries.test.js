const request = require("supertest");
const express = require("express");
const router = require("../routes/routes");
const CountryModel = require("../model/country.model");

const app = express();
app.use(express.json());
app.use("/api", router);

describe("Countries API", () => {
    test("POST /api/countries creates country with auto ID", async () => {
        const res = await request(app)
            .post("/api/countries")
            .send({
                name: "Hungary",
                continent: "Europe"
            });

        expect(res.status).toBe(201);
        expect(res.body._id).toBe(1);
        expect(res.body.name).toBe("Hungary");
    });

    test("POST fails when required field missing", async () => {
        const res = await request(app)
            .post("/api/countries")
            .send({ name: "No Continent" });

        expect(res.status).toBe(400);
    });

    test("GET /api/countries returns all", async () => {
        await CountryModel.create({ _id: 1, name: "HU", continent: "Europe" });

        const res = await request(app).get("/api/countries");

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
    });

    test("GET /api/countries/:id returns one", async () => {
        await CountryModel.create({ _id: 1, name: "HU", continent: "Europe" });

        const res = await request(app).get("/api/countries/1");

        expect(res.status).toBe(200);
        expect(res.body.name).toBe("HU");
    });

    test("GET /api/countries/:id 404 if missing", async () => {
        const res = await request(app).get("/api/countries/999");
        expect(res.status).toBe(404);
    });

    test("GET invalid ID returns 500", async () => {
        const res = await request(app).get("/api/countries/abc");
        expect(res.status).toBe(500);
    });

    test("PATCH update works", async () => {
        await CountryModel.create({ _id: 1, name: "Old", continent: "EU" });

        const res = await request(app)
            .patch("/api/countries/1")
            .send({ name: "New" });

        expect(res.status).toBe(200);
        expect(res.body.name).toBe("New");
    });

    test("PATCH missing returns 404", async () => {
        const res = await request(app)
            .patch("/api/countries/999")
            .send({ name: "Nah" });

        expect(res.status).toBe(404);
    });

    test("DELETE works", async () => {
        await CountryModel.create({ _id: 1, name: "ToDelete", continent: "EU" });

        const res = await request(app).delete("/api/countries/1");
        expect(res.status).toBe(204);
    });

    test("DELETE missing returns 404", async () => {
        const res = await request(app).delete("/api/countries/999");
        expect(res.status).toBe(404);
    });
});
