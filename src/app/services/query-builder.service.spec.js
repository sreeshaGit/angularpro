"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var query_builder_service_1 = require("./query-builder.service");
describe('QueryBuilderService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [query_builder_service_1.QueryBuilderService]
        });
    });
    it('should be created', testing_1.inject([query_builder_service_1.QueryBuilderService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=query-builder.service.spec.js.map