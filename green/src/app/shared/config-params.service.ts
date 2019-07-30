import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { query } from '@angular/animations';

function _window(): any {
    return window;
}

@Injectable()
export class ConfigParamsService {

    private winRef = _window();
    readonly params = new ReplaySubject<any>();

    constructor(
        private activatedRoute: ActivatedRoute
    ) {
        if (this.winRef.SharedInstanceManager) {
            this.winRef.SharedInstanceManager.getBootParams((params) => {
                this.params.next(params);
            });
        } else {
            this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
                this.params.next(queryParams);
            });
        }
    }

}
