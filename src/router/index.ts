import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
import { i18n } from '@/i18n'

NProgress.configure({ showSpinner: false })

const constantRoutes: RouteRecordRaw[] = [
	// {
	// 	path:'/',
	// 	redirect:'/home',
	// },
	// {
	// 	path: '/home',
	// 	component: () => import('@/views/ccodeGenrator/index.vue'),
	// },
	{
		path: '/:pathMatch(.*)',
		component: () => import('../views/404.vue')
	}
]

const asyncRoutes: RouteRecordRaw = {
	path: '/',
	component: () => import('../layout/index.vue'),
	children: [
		{
			path: '/',
			redirect: '/home'
		},
		{
			path: '/home',
			name: '代码生成器',
			component: () => import('@/views/home.vue'),
			meta: {
				title: i18n.global.t('router.home'),
				affix: true
			}
		},
	]
}

// 配置常量菜单
export const constantMenu = [
	{
		id: 1000,
		name: '代码生成器',
		url: null,
		openStyle: 0,
		icon: 'icon-windows',
		children: [
			{
				id: 1001,
				name: '上下文模板',
				url: 'codeGenerator/contextTemplate',
				openStyle: 0,
				icon: 'icon-unorderedlist'
			},
			{
				id: 1002,
				name: '填充上下文',
				url: 'codeGenerator/context',
				openStyle: 0,
				icon: 'icon-unorderedlist'
			},
			{
				id: 1003,
				name: '模板管理',
				url: 'codeGenerator/template',
				openStyle: 0,
				icon: 'icon-unorderedlist'
			},
			{
				id: 1004,
				name: '代码生成',
				url: 'codeGenerator/generator',
				openStyle: 0,
				icon: 'icon-unorderedlist'
			},
		]
	}
]

export const errorRoute: RouteRecordRaw = {
	path: '/:pathMatch(.*)',
	redirect: '/404'
}

export const router = createRouter({
	history: createWebHashHistory(),
	routes: constantRoutes
})

// 白名单列表
const whiteList = ['/login']

// 路由跳转前
router.beforeEach(async (to, from, next) => {
	NProgress.start()
	// token存在的情况
	if (store.userStore.Token) {
		if (to.path === '/login') {
			next('/home')
		} else {
			// 用户信息不存在，则重新拉取
			if (!store.userStore.user.id) {

				store.userStore.user.id = "4123"

				// 动态菜单+常量菜单
				const menuRoutes = await store.routerStore.getMenuRoutes

				// 获取扁平化路由，将多级路由转换成一级路由
				const keepAliveRoutes = getKeepAliveRoutes(menuRoutes, [])

				// 添加菜单路由
				asyncRoutes.children?.push(...keepAliveRoutes)
				router.addRoute(asyncRoutes)

				// 错误路由
				router.addRoute(errorRoute)

				// 保存路由数据
				store.routerStore.setRoutes(constantRoutes.concat(asyncRoutes))

				next({ ...to, replace: true })
			} else {
				next()
			}
		}
	} else {
		// 没有token的情况下，可以进入白名单
		if (whiteList.indexOf(to.path) > -1) {
			next()
		} else {
			next('/login')
		}
	}
})

// 路由加载后
router.afterEach(() => {
	NProgress.done()
})

// 获取扁平化路由，将多级路由转换成一级路由
export const getKeepAliveRoutes = (rs: RouteRecordRaw[], breadcrumb: string[]): RouteRecordRaw[] => {
	const routerList: RouteRecordRaw[] = []

	rs.forEach((item: any) => {
		if (item.meta.title) {
			breadcrumb.push(item.meta.title)
		}

		if (item.children && item.children.length > 0) {
			routerList.push(...getKeepAliveRoutes(item.children, breadcrumb))
		} else {
			item.meta.breadcrumb.push(...breadcrumb)
			routerList.push(item)
		}

		breadcrumb.pop()
	})
	return routerList
}

// 加载vue组件
const layoutModules = import.meta.glob('/src/views/**/*.vue')

// 根据路径，动态获取vue组件
const getDynamicComponent = (path: string): any => {
	return layoutModules[`/src/views/${path}.vue`]
}

// 根据菜单列表，生成路由数据
export const generateRoutes = (menuList: any): RouteRecordRaw[] => {
	const routerList: RouteRecordRaw[] = []

	menuList.forEach((menu: any) => {
		let component
		let path
		if (menu.children && menu.children.length > 0) {
			component = () => import('@/layout/index.vue')
			path = '/p/' + menu.id
		} else {
				component = getDynamicComponent(menu.url)
				path = '/' + menu.url
		}
		const route: RouteRecordRaw = {
			path: path,
			name: path,
			component: component,
			children: [],
			meta: {
				title: menu.name,
				icon: menu.icon,
				id: '' + menu.id,
				url: menu.url,
				cache: true,
				newOpen: menu.openStyle === 1,
				breadcrumb: []
			}
		}

		// 有子菜单的情况
		if (menu.children && menu.children.length > 0) {
			route.children?.push(...generateRoutes(menu.children))
		}

		routerList.push(route)
	})

	return routerList
}
