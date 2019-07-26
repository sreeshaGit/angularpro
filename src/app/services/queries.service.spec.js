"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var queries_service_1 = require("./queries.service");
describe('QueriesService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [queries_service_1.QueriesService]
        });
    });
    it('should be created', testing_1.inject([queries_service_1.QueriesService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=queries.service.spec.js.map