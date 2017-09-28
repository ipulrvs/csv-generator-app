import SidebarAction from './Sidebar.action'

function SidebarReducer(state = {
	open: true,
	menus: [
		{
			name: 'Application',
			menus: [
				{
					name: 'Dashboard',
					active: false,
					url: '/'
				},
				{
					name: 'Fake Database',
					active: false,
					url: '/modules/fakedb'
				},
			]
		},
		{
			name: 'CSV Generator',
			menus: [
				{
					name: 'EPPT',
					active: false,
					openSub: false,
					submenus: [
						{
							name: 'Pasal 21 Tidak Final'
						},
						{
							name: 'Pasal 21 Final'
						},
						{
							name: 'Pasal 23'
						},
						{
							name: 'Pasal 22'
						},
						{
							name: 'Pasal 4 Ayat 2'
						},
						{
							name: 'Pasal 15'
						}
					]
				},
				{
					name: 'H2H',
					active: false,
					openSub: false,
					submenus: [
						{
							name: 'FK'
						},
						{
							name: 'FM'
						},
						{
							name: 'LT'
						},
						{
							name: 'RDKRDM'
						},
						{
							name: 'VAT'
						},
						{
							name: 'DKDM'
						},
						{
							name: 'Cancel PM'
						}
					]
				}
			]
		},
		{
			name: 'Test Runner',
			menus: [
				{
					name: 'EPPT',
					active: false,
					openSub: false,
					submenus: [
						{
							name: 'Import Pasal'
						},
						{
							name: 'Approve Pasal'
						},
						{
							name: 'Submit Report'
						}
					]
				}
			]
		}
	]
}, action){
	switch(action.type){
		case SidebarAction.initialize:
			console.log("Sidebar do: Intialize")
			return {
				...state
			}
		case SidebarAction.select_menu:
			console.log("Sidebar do: Select Menu")
			let defaultState = state
			let isMenu = action.param.isMenu
			let module = action.param.moduleIndex
			let menu = action.param.menuIndex
			let submenu = action.param.submenuIndex
			let selectedMenu = defaultState.menus[module].menus[menu]
			selectedMenu.active = true
			if(selectedMenu.submenus && selectedMenu.submenus.length > 0){
				selectedMenu.openSub = !selectedMenu.openSub
			}
			if(!isMenu){
				let selectedSubMenu = defaultState.menus[module].menus[menu].submenus[submenu]
				selectedSubMenu.active = true
			}
			defaultState.menus.map(function (moduleDefault, moduleDefaultIndex){
				if(moduleDefault.menus){
					moduleDefault.menus.map(function(menuDefault, menuDefaultIndex){
						if(menuDefaultIndex == menu && moduleDefaultIndex == module){
							
						} else {
							menuDefault.openSub = false
							menuDefault.active = false
						}
						if(menuDefault.submenus){
							menuDefault.submenus.map(function (submenuDefault, submenuDefaultIndex){
								if(submenuDefaultIndex == submenu){
									if(menuDefaultIndex == menu && moduleDefaultIndex == module){
										menuDefault.openSub = true
									}
								} else {
									submenuDefault.active = false
								}
							})
						}
					})
				}
			})
			console.log(defaultState)
			return {
				...state,
				open: defaultState.open,
				menus: defaultState.menus
			}
		default: 
			return {
				...state
			}
	}
}

export default SidebarReducer