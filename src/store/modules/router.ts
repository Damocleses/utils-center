import { RouteRecordRaw } from 'vue-router';
import { Action, Module, Mutation, VuexModule, getModule } from 'vuex-module-decorators';
import { sysStore } from '../sysStore';
import { generateRoutes, constantMenu } from '@/router';

@Module({ dynamic: true, namespaced: true, name: 'router', store: sysStore })
export class RouterStore extends VuexModule {
	menuRoutes: RouteRecordRaw[] = [];
	routes: RouteRecordRaw[] = [];

	get getMenuRoutes() {
		const constantRoutes = generateRoutes(constantMenu)
		this.menuRoutes.push(...constantRoutes)
		return this.menuRoutes
	}

	@Mutation
	setRoutes(routers: RouteRecordRaw[]) {
		this.routes = routers
	}
}

export const routerStoreModule = getModule(RouterStore);
