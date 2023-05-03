import { Module, VuexModule, getModule } from 'vuex-module-decorators';
import { sysStore } from '../sysStore';

@Module({ dynamic: true, namespaced: true, name: 'user', store: sysStore})
export class UserStore extends VuexModule {
    user: {
        id?: string,
        username?: string,
        avatar?: string
    } = {};
    token: string = "123"

    get Token() {
        return "123"
    }
}

export const userStoreModule = getModule(UserStore);
