"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var http_interceptor_service_1 = require("./http-interceptor.service");
describe('HttpInterceptorService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [http_interceptor_service_1.HttpInterceptorService]
        });
    });
    it('should be created', testing_1.inject([http_interceptor_service_1.HttpInterceptorService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=http-interceptor.service.spec.js.map