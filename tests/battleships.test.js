const request = require("supertest");
const express = require("express");
const router = require("../routes/routes");
const BBModel = require("../model/battleship.model");

const app = express();
app.use(express.json());
app.use("/api", router);

describe("Battleships API", () => {
    test("POST /api/battleships creates battleship with auto ID", async () => {
        const res = await request(app)
            .post("/api/battleships")
            .send({
                name: "Yamato",
                class: "Yamato-class",
                commissioned: 1941
            });

        expect(res.status).toBe(201);
        expect(res.body._id).toBe(1);
        expect(res.body.name).toBe("Yamato");
    });

    test("POST fails when required fields missing", async () => {
        const res = await request(app)
            .post("/api/battleships")
            .send({ name: "Invalid: missing class" });

        expect(res.status).toBe(400);
    });

    test("GET /api/battleships returns all", async () => {
        await BBModel.create({ _id: 1, name: "ShipA", class: "A" });

        const res = await request(app).get("/api/battleships");

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
    });

    test("GET /api/battleships/:id returns one", async () => {
        await BBModel.create({ _id: 1, name: "ShipOne", class: "Test" });

        const res = await request(app).get("/api/battleships/1");

        expect(res.status).toBe(200);
        expect(res.body.name).toBe("ShipOne");
    });

    test("GET /api/battleships/:id returns 404 if not found", async () => {
        const res = await request(app).get("/api/battleships/99");
        expect(res.status).toBe(404);
    });

    test("GET /api/battleships/:id handles invalid ID", async () => {
        const res = await request(app).get("/api/battleships/abc");
        expect(res.status).toBe(500);
    });

    test("PATCH /api/battleships/:id updates", async () => {
        await BBModel.create({ _id: 1, name: "Old", class: "X" });

        const res = await request(app)
            .patch("/api/battleships/1")
            .send({ name: "Updated" });

        expect(res.status).toBe(200);
        expect(res.body.name).toBe("Updated");
    });

    test("PATCH returns 404 when missing", async () => {
        const res = await request(app)
            .patch("/api/battleships/999")
            .send({ name: "Nope" });

        expect(res.status).toBe(404);
    });

    test("DELETE /api/battleships/:id deletes", async () => {
        await BBModel.create({ _id: 1, name: "ToDelete", class: "X" });

        const res = await request(app).delete("/api/battleships/1");

        expect(res.status).toBe(204);
    });

    test("DELETE returns 404 when missing", async () => {
        const res = await request(app).delete("/api/battleships/999");
        expect(res.status).toBe(404);
    });
});
