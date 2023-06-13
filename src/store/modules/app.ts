import { ITheme } from '@/store/theme/interface'
import cache from '@/utils/cache'
import { Action, Module, VuexModule, getModule, Mutation } from 'vuex-module-decorators'
import { sysStore } from '../sysStore'

@Module({ dynamic: true, namespaced: true, name: 'app', store: sysStore })
export class AppStore extends VuexModule {

	mTheme = cache.getTheme()
	mSidebarOpened = cache.getSidebarOpened()
	mLanguage = cache.getLanguage()
	mComponentSize = cache.getComponentSize()

	get sidebarOpened() {
		return this.mSidebarOpened
	}

	get language() {
		return this.mLanguage
	}

	get componentSize() {
		return this.mComponentSize
	}

	get dictList() {
		return []
	}

	get theme() {
		return this.mTheme
	}

	@Mutation
	setSidebarOpened() {
		this.mSidebarOpened = !this.mSidebarOpened
		cache.setSidebarOpened(!this.mSidebarOpened)
	}

	@Mutation
	setSidebarStatus(status: boolean) {
		this.mSidebarOpened = status
		cache.setSidebarOpened(status)
	}

	@Mutation
	setLanguage(local: string) {
		this.mLanguage = local
		cache.setLanguage(local)
	}

	@Mutation
	setComponentSize(size: string) {
		this.mComponentSize = size
		cache.setComponentSize(size)
	}

	@Mutation
	setTheme(theme: ITheme) {
		this.mTheme = theme
		cache.setTheme(theme)
	}

	@Mutation
	async getDictListAction() {

	}
}

export const appStoreModule = getModule(AppStore);

