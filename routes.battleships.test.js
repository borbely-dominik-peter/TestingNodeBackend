let BBModel = require('/model/battleship.model');
let HTTPMocks = require("node-mocks-http");
let MockedBBData = require("./TestingData/MockBB.json")
let BBController = require("./controller/BB.controller");

BBModel.create = jest.fn();
BBModel.find = jest.fn();

let req, res, next;
req = HTTPMocks.createRequest()
res = HTTPMocks.createResponse()
next = null
req.body = MockedBBData

describe("/api/battleships, METHOD: GET", () => {
    it('should exist', () => {
        expect(typeof BBController.FindAll).toBe("function");
    })
    it('should have been called', async () => {
        let SpyTarget = jest.spyOn(BBController, "FindAll");
        BBController.FindAll(req,res)
        expect(SpyTarget).toHaveBeenCalled()
    })
    it('should come back with 200 status code', async () => {
        BBController.FindAll(req,res)
        expect(res.statusCode).toBe(200);
    })
    it('should come back with >1 len array', () => {
        BBController.FindAll(req,res)
        expect(res._getData().length).toBeGreaterThan(1);
    })
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