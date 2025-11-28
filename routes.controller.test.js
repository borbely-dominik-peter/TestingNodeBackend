const CountryModel = require('./model/country.model');
const HTTPMocks = require("node-mocks-http");
const MockedCountryData = require("./TestingData/MockCountry.json")
const CountryCont = require("./controller/country.controller");

CountryModel.create = jest.fn();
CountryModel.find = jest.fn( () => {
    return [
        {
            "name": "United States",
            "continent": "North America",
            "navy_founded": 1775,
            "capital": "Washington, D.C.",
            "biggest_naval_battle": "Battle of Leyte Gulf"
        }
    ]
}
);
CountryModel.findOne = jest.fn(() => {
    return [MockedCountryData]
})
CountryModel.findOneAndUpdate = jest.fn();
CountryModel.findOneAndDelete = jest.fn(() => {
    return [];
})


let req, res, next;
req = HTTPMocks.createRequest()
res = HTTPMocks.createResponse()
next = null
req.body = MockedCountryData

describe("/api/countries, METHOD: GET", () => {
    it('should exist', () => {
        expect(typeof CountryCont.GetAll).toBe("function");
    })
    it('should have been called', async () => {
        let SpyTarget = jest.spyOn(CountryCont, "GetAll");
        CountryCont.GetAll(req,res)
        expect(SpyTarget).toHaveBeenCalled()
    })
    it('should come back with 200 status code', async () => {
        req.body = MockedCountryData
        CountryCont.GetAll(req,res)
        expect(res.statusCode).toBe(200)
    })
    it('should give the mocked data back', () => {
        CountryModel.find = jest.fn(() => {
            return MockedCountryData
        })
        expect(res._getData()).toStrictEqual([MockedCountryData]);
    })
    
});

describe("/api/countries, METHOD: POST", () => {
    it("should exist", () => {
        expect(typeof CountryCont.Create).toBe("function");
    })
    it("should be called", () => {
        let SpyTarget = jest.spyOn(CountryCont, "Create")
        SpyTarget(req,res)
        expect(SpyTarget).toHaveBeenCalled()
    })
    it("BBModel.Create is called", () => {
        req.body = MockedCountryData
        expect(CountryModel.create).toHaveBeenCalled();
    })
    it("Should return with code 201", () => {
        let SpyTarget = jest.spyOn(CountryCont, "Create");
        SpyTarget(req,res)
        expect(res.statusCode).toBe(201);
    })
    /*it("should fail with 422 code", () => {
        let SpyTarget = jest.spyOn(CountryCont, "Create");
        CountryModel.create = jest.fn(() => {return "error"});
        SpyTarget(req,res);
        expect(res.statusCode).toBe(422);
        //SpyTarget.mockReset();
    })*/
})



describe("/api/battleships/:id METHOD: PATCH", () => {
    it("should exist", () => {
        expect(typeof CountryCont.Change).toBe("function");
    })
    it("should be called", () => {
        let SpyTarget = jest.spyOn(CountryCont, "Change")
        SpyTarget(req,res)
        expect(SpyTarget).toHaveBeenCalled()
    })
    it("is succesfull if BBModel.findOneAndUpdate is called", () => {
        let SpyTarget = jest.spyOn(CountryCont, "Change")
        SpyTarget(req,res);
        expect(CountryModel.findOneAndUpdate).toHaveBeenCalled();
    })
    /*it("if it succeeds, returns code 200", () => {
        let SpyTarget = jest.spyOn(BBController, "EditOne")
        SpyTarget(req,res);
        expect(res.statusCode).toBe(200);
    })*/
    it("if BBModel.findOneAndUpdate fails(return value is null), then code is 404", () => {
        CountryModel.findOneAndUpdate.mockReturnValueOnce([]) 
        /*let SpyTarget = jest.spyOn(BBController, "EditOne");
        SpyTarget(req,res);*/
        CountryCont.Change(req,res)
        //expect(res._getData()).toBe("");
        expect(res.statusCode).toBe(404);
    })
})

describe("/api/countries/id, METHOD: GET", () => {
    it("should exist", () => {
        expect(typeof CountryCont.GetOne).toBe("function");
    })
    it("should be called", () => {
        let SpyTarget = jest.spyOn(CountryCont, "GetOne")
        SpyTarget(req,res)
        expect(CountryCont.GetOne).toHaveBeenCalled()
    })
    it("should return with status code 200", () => {
        let SpyTarget = jest.spyOn(CountryCont, "GetOne")
        SpyTarget(req,res)
        expect(res.statusCode).toBe(200)
    })
    /*it("should fail with non-existant id, simulated with a faulty model", async () => {
        let SpyTarget = jest.spyOn(BBController, "FindOneBB")
        SpyTarget(req,res);
        BBController.FindOneBB(req,res);
        expect(res.statusCode).toBe(404);
    });*/
    it("should return the data if given a correct id, simulated with a functional model", () => {
        CountryModel.findOne = jest.fn(() => {
            return MockedCountryData
        })
        let SpyTarget = jest.spyOn(CountryCont,"GetOne");
        SpyTarget(req,res);
        expect(res._getData()).toStrictEqual([MockedCountryData]);
    })
})

describe("/api/countries/:id METHOD: DELETE", () => {
    it("should exist", () => {
        expect(typeof CountryCont.Delete).toBe("function");
    })
    it("should be called", () => {
        let SpyTarget = jest.spyOn(CountryCont, "Delete")
        SpyTarget(req,res)
        expect(SpyTarget).toHaveBeenCalled()
    })
    it("should call BBModel.findOneAndDelete", () => {
        let SpyTarget = jest.spyOn(CountryCont, "Delete");
        SpyTarget(req,res);
        expect(CountryModel.findOneAndDelete).toHaveBeenCalled();
    })
    it("should return with status code 204", () => {
        let SpyTarget = jest.spyOn(CountryCont, "Delete");
        SpyTarget(req,res);
        expect(res.statusCode).toBe(204);
    })
})