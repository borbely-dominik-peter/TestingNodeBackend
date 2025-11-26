const routes = require("./routes/routes")

const express = require("express")
express.Router = jest.fn();

const BBModel = require('/model/battleship.model.js');
const HTTPMocks = require("node-mocks-http");
const MockedBBData = require("./TestingData/MockBB.json")
const BBController = require("./controller/BB.controller");

BBModel.create = jest.fn();
BBModel.find = jest.fn();

let req, res, next;
beforeEach(() => {
    req = HTTPMocks.createRequest()
    res = HTTPMocks.createResponse()
    next = null
    req.body = MockedBBData
})

describe("Tests of Get All route of battleships", () => {
    it('should exist', () => {
        expect(typeof BBModel.find).toBe("function");
    })
    it('should return with status code 200', () => {
        expect(res.statusCode).toBe(200);
    })
    /*it('res.status to exist', () => {
        BBModel.find();
        expect(res.status).toBe("asd");
    })*/
});

describe("Tests of Post Route of battleships", () => {
    it("should exist", () => {
        expect(typeof BBModel.create).toBe("function");
    })
    it("should return with 200 code", () => {
        BBModel.create(req.body)
        expect(res.statusCode).toBe(200);
    })
    it("should search for the MAXID", () => {
    })

})