"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var sign_up_service_1 = require("./sign-up.service");
describe('SignUpService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [sign_up_service_1.SignUpService]
        });
    });
    it('should be created', testing_1.inject([sign_up_service_1.SignUpService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=sign-up.service.spec.js.map