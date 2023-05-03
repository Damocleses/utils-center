import { AppStore, appStoreModule } from './modules/app';
import { RouterStore, routerStoreModule } from './modules/router';
import { TabStore, tabStoreModule } from './modules/tabs';
import { UserStore, userStoreModule } from './modules/user';

const store: {
    routerStore: RouterStore,
    userStore: UserStore,
    appStore: AppStore,
    tabsStore: TabStore,
} = {
    routerStore: routerStoreModule,
    userStore: userStoreModule,
    appStore: appStoreModule,
    tabsStore: tabStoreModule,
}

export const registerStore = () => {
    store.routerStore = routerStoreModule
    store.userStore = userStoreModule
    store.appStore = appStoreModule
    store.tabsStore = tabStoreModule
}

export default store

