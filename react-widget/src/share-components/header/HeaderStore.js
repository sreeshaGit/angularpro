/*This file contains logics for header component */
import { extendObservable } from 'mobx';

class HeaderStore {
    constructor() {
        extendObservable(this, {
            activeInd: 0, 
        });
    }
   
    setIndex(index) {
        this.activeInd = index;
    }
}
export default HeaderStore;