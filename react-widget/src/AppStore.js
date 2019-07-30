import { observable } from 'mobx';
import superagent from 'superagent';

class AppStore {
    @observable activeIndex = 0;
    @observable changedOddStatus = '';
    getActiveIndex() {
        return this.activeIndex;

    }
}
export default AppStore;