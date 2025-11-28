const BBModel = require('./model/battleship.model');
const HTTPMocks = require("node-mocks-http");
const MockedBBData = require("./TestingData/MockBB.json")
const BBController = require("./controller/BB.controller");

// mocks of external dependencies of controller functions

BBModel.create = jest.fn();
BBModel.find = jest.fn( () => {
    return [
        {
            "_id": 1,
            "Cid": 1,
            "name": "USS E",
            "class": "E-class",
            "commissioned": 2024,
            "displacement_tons": 44000,
            "status": "E"
        }
    ]
}
);
BBModel.findOne = jest.fn(() => {
    return [MockedBBData]
})
BBModel.findOneAndUpdate = jest.fn();
BBModel.findOneAndDelete = jest.fn(() => {
    return [];
})


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
    })
    it('should give the mocked data back', () => {
        BBModel.find = jest.fn(() => {
            return MockedBBData
        })
        expect(res._getData()).toStrictEqual([MockedBBData]);
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
    it("BBModel.Create is called", () => {
        BBController.Create(req,res)
        req.body = MockedBBData
        expect(BBModel.create).toHaveBeenCalled();
    })
    it("Should return with code 201", () => {
        /*let SpyTarget = jest.spyOn(BBController, "Create");
        SpyTarget(req,res)*/
        BBController.Create(req,res)
        expect(res.statusCode).toBe(201);
    })
    /*it("should fail with 422 code", () => {
        let SpyTarget = jest.spyOn(BBController, "Create");
        BBModel.create = jest.fn(() => {return "error"});
        SpyTarget(req,res);
        expect(res.statusCode).toBe(422);
        //SpyTarget.mockReset();
    })*/
})



describe("/api/battleships/:id METHOD: PATCH", () => {
    it("should exist", () => {
        expect(typeof BBController.EditOne).toBe("function");
    })
    it("should be called", () => {
        let SpyTarget = jest.spyOn(BBController, "EditOne")
        SpyTarget(req,res)
        expect(SpyTarget).toHaveBeenCalled()
    })
    it("is successful if BBModel.findOneAndUpdate is called", () => {
        /*let SpyTarget = jest.spyOn(BBController, "EditOne")
        SpyTarget(req,res);*/
        BBController.EditOne(req,res);
        expect(BBModel.findOneAndUpdate).toHaveBeenCalled();
    })
    /*it("if it succeeds, returns code 200", () => {
        let SpyTarget = jest.spyOn(BBController, "EditOne")
        SpyTarget(req,res);
        expect(res.statusCode).toBe(200);
    })*/
    it("if BBModel.findOneAndUpdate fails(return value is null), then code is 404", () => {
        BBModel.findOneAndUpdate.mockReturnValueOnce(null) 
        /*let SpyTarget = jest.spyOn(BBController, "EditOne");
        SpyTarget(req,res);*/
        BBController.EditOne(req,res)
        //expect(res._getData()).toBe("");
        expect(res.statusCode).toBe(404);
    })
})

describe("/api/battleships/id, METHOD: GET", () => {
    it("should exist", () => {
        expect(typeof BBController.FindOneBB).toBe("function");
    })
    it("should be called", () => {
        let SpyTarget = jest.spyOn(BBController, "FindOneBB")
        SpyTarget(req,res)
        expect(BBController.FindOneBB).toHaveBeenCalled()
    })
    it("should return with status code 200", () => {
        /*let SpyTarget = jest.spyOn(BBController, "FindOneBB")
        SpyTarget(req,res)*/
        BBController.FindOneBB(req,res)
        expect(res.statusCode).toBe(200)
    })
    /*it("should fail with non-existant id, simulated with a faulty model", async () => {
        let SpyTarget = jest.spyOn(BBController, "FindOneBB")
        SpyTarget(req,res);
        BBController.FindOneBB(req,res);
        expect(res.statusCode).toBe(404);
    });*/
    it("should return the data if given a correct id, simulated with a functional model", () => {
        BBModel.findOne = jest.fn(() => {
            return MockedBBData
        })
        /*let SpyTarget = jest.spyOn(BBController,"FindOneBB");
        SpyTarget(req,res);*/
        BBController.FindOneBB(req,res)
        expect(res._getData()).toStrictEqual([MockedBBData]);
    })
})

describe("/api/battleships/:id METHOD: DELETE", () => {
    it("should exist", () => {
        expect(typeof BBController.DeleteOne).toBe("function");
    })
    it("should be called", () => {
        let SpyTarget = jest.spyOn(BBController, "DeleteOne")
        SpyTarget(req,res)
        expect(SpyTarget).toHaveBeenCalled()
    })
    it("should call BBModel.findOneAndDelete", () => {
        /*let SpyTarget = jest.spyOn(BBController, "DeleteOne");
        SpyTarget(req,res);*/
        BBController.DeleteOne(req,res)
        expect(BBModel.findOneAndDelete).toHaveBeenCalled();
    })
    it("should return with status code 204", () => {
        /*let SpyTarget = jest.spyOn(BBController, "DeleteOne");
        SpyTarget(req,res);*/
        BBController.DeleteOne(req,res)
        expect(res.statusCode).toBe(204);
    })
})