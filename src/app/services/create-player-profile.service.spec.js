"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var create_player_profile_service_1 = require("./create-player-profile.service");
describe('CreatePlayerProfileService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [create_player_profile_service_1.CreatePlayerProfileService]
        });
    });
    it('should be created', testing_1.inject([create_player_profile_service_1.CreatePlayerProfileService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=create-player-profile.service.spec.js.map