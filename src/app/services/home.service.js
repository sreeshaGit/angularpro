"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { Observable } from 'rxjs/Observable';
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
//@Injectable()
var HomeService = (function () {
    function HomeService() {
        this.isUser = new BehaviorSubject_1.BehaviorSubject(false);
    }
    HomeService.prototype.setFirstTimeSignUp = function (value) {
        this.firstSignUp = value;
    };
    HomeService.prototype.getFirstTimeSignUp = function () {
        return this.firstSignUp;
    };
    return HomeService;
}());
exports.HomeService = HomeService;
//# sourceMappingURL=home.service.js.map