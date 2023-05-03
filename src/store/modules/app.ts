import { ITheme } from '@/store/theme/interface'
import cache from '@/utils/cache'
import { Action, Module, VuexModule, getModule } from 'vuex-module-decorators'
import { sysStore } from '../sysStore'

@Module({ dynamic: true, namespaced: true, name: 'app', store: sysStore })
export class AppStore extends VuexModule {

	mTheme = cache.getTheme()

	get sidebarOpened() {
		return cache.getSidebarOpened()
	}

	get language() {
		return cache.getLanguage()
	}

	get componentSize() {
		return cache.getComponentSize()
	}

	get dictList() {
		return []
	}

	get theme() {
		console.log("theme", this.mTheme)
		return this.mTheme
	}

	@Action
	setSidebarOpened() {
		cache.setSidebarOpened(!this.sidebarOpened)
	}

	@Action
	setSidebarStatus(status: boolean) {
		cache.setSidebarOpened(status)
	}

	@Action
	setLanguage(local: string) {
		cache.setLanguage(local)
	}

	@Action
	setComponentSize(size: string) {
		cache.setComponentSize(size)
	}

	@Action
	setTheme(theme: ITheme) {
		this.mTheme = theme
		cache.setTheme(theme)
	}

	@Action
	async getDictListAction() {

	}
}

export const appStoreModule = getModule(AppStore);

