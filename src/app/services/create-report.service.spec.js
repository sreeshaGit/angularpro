"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var create_report_service_1 = require("./create-report.service");
describe('CreateReportService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [create_report_service_1.CreateReportService]
        });
    });
    it('should be created', testing_1.inject([create_report_service_1.CreateReportService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=create-report.service.spec.js.map