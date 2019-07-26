"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var bet_propensity_api_service_1 = require("./bet-propensity-api.service");
describe('BetPropensityApiService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [bet_propensity_api_service_1.BetPropensityApiService]
        });
    });
    it('should be created', testing_1.inject([bet_propensity_api_service_1.BetPropensityApiService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=bet-propensity-api.service.spec.js.map