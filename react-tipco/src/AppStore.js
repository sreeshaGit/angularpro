import { extendObservable } from 'mobx';
import createBrowserHistory from 'history/createBrowserHistory'

class AppStore {
    
    constructor() {
        extendObservable(this, {
            history : createBrowserHistory()
        });    
    }
    
}

export default AppStore;