let BBModel = require('./model/battleship.model');
let HTTPMocks = require("node-mocks-http");
let MockedBBData = require("./TestingData/MockBB.json")
let BBController = require("./controller/BB.controller");

//jest.mock("BBModel");
BBModel.create = jest.fn();
// BBModel.find = jest.fn();

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
        req.body = MockedBBData
        BBController.FindAll(req,res)
        expect(res.statusCode).toBe(200)
        /*jest.spyOn(BBModel, "find").mockReturnValueOnce([
            {
                "_id": 1,
                "Cid": 1,
                "name": "USS E",
                "class": "E-class",
                "commissioned": 2024,
                "displacement_tons": 44000,
                "status": "E"
            }
        ]);
        expect(res._getData()).toBe("a")*/
    })
    
});

describe("/api/battleships, METHOD: POST", () => {
    it("should exist", () => {
        expect(typeof BBController.Create).toBe("function");
    })
    it("should be called", () => {
        let SpyTarget = jest.spyOn(BBController, "Create")
        SpyTarget(req,res)
        expect(SpyTarget).toHaveBeenCalled()
    })
    it("should fail with 400 code", () => {
        req.body = {}
        let SpyTarget = jest.spyOn(BBController, "Create");
        SpyTarget(req,res);
        expect(res.statusCode).toBe(400);
    })
    it("should return with 201 if successful", () => {
        req.body = MockedBBData
        /*jest.spyOn(BBModel, "find").mockReturnValueOnce([
            {
                "_id": 1,
                "Cid": 1,
                "name": "USS E",
                "class": "E-class",
                "commissioned": 2024,
                "displacement_tons": 44000,
                "status": "E"
            }
        ]);*/
        let SpyTarget = jest.spyOn(BBController, "Create")
        let result = BBController.Create(req,res,next)
        //BBController.Create(req,res,next);
        expect(res._getData()).toBe(201);
    })
})