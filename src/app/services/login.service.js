"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//@Injectable()
var LoginService = (function () {
    function LoginService(betPropensityApi) {
        this.betPropensityApi = betPropensityApi;
    }
    LoginService.prototype.getAuth = function (userDetails) {
        return this.betPropensityApi.getLogin(userDetails);
    };
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map