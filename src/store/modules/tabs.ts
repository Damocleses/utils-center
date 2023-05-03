import { RouteLocationNormalizedLoaded } from 'vue-router';
import { Action, Module, VuexModule, getModule } from 'vuex-module-decorators';
import { sysStore } from '../sysStore';

@Module({ dynamic: true, namespaced: true, name: 'taps', store: sysStore })
export class TabStore extends VuexModule {

    mVisitedViews: any[] = [];
    mCachedViews: any[] = [];

	get visitedViews() {
		return this.mVisitedViews
	}

	get cachedViews() {
		return this.mCachedViews
	}

	@Action
    addView(view: RouteLocationNormalizedLoaded) {
        if (this.visitedViews.some(value => value.path === view.path)) {
            return
        }
        this.visitedViews.push(
            Object.assign({}, view, {
                title: view.meta?.title || 'unknown'
            })
        )
    }

	@Action
	addCachedView(view: RouteLocationNormalizedLoaded) {
        if (this.cachedViews.includes(view.name)) {
            return
        }

        if (view.meta.cache) {
            this.cachedViews.push(view.name)
        }
    }

	@Action
	delView(view: RouteLocationNormalizedLoaded) {
        for (const [i, v] of this.visitedViews.entries()) {
            if (v.path === view.path) {
                this.visitedViews.splice(i, 1)
                break
            }
        }

        this.delCachedView(view).then()
    }

	@Action
	delCachedView(view: RouteLocationNormalizedLoaded) {
        return new Promise(resolve => {
            const index = this.cachedViews.indexOf(view.name)
            if (index > -1) {
                this.cachedViews.splice(index, 1)
            }
            resolve([...this.cachedViews])
        })
    }

	@Action
	delOthersViews(view: RouteLocationNormalizedLoaded) {
        this.mVisitedViews = this.visitedViews.filter(v => {
            return v.meta.affix || v.path === view.path
        })

        const index = this.cachedViews.indexOf(view.name)
        if (index > -1) {
            this.mCachedViews = this.cachedViews.slice(index, index + 1)
        } else {
            this.mCachedViews = []
        }
    }

	@Action
	delAllViews() {
        this.mVisitedViews = this.visitedViews.filter(tab => tab.meta.affix)
        this.mCachedViews = []
    }
}

export const tabStoreModule = getModule(TabStore);

