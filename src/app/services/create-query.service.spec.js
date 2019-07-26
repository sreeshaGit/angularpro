"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var create_query_service_1 = require("./create-query.service");
describe('CreateQueryService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [create_query_service_1.CreateQueryService]
        });
    });
    it('should be created', testing_1.inject([create_query_service_1.CreateQueryService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=create-query.service.spec.js.map