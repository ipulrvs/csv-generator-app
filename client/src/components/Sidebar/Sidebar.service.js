import SidebarAction from './Sidebar.action'

function SidebarReducer(state = {
	open: true,
	menus: [
		{
			name: 'Application',
			menus: [
				{
					name: 'File Manager',
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
					name: 'EPPT v2',
					active: false,
					openSub: false,
					submenus: [
						{
							url : '/modules/epptv2/csv/tidak_final_manual',
							name: 'Pasal 21 Tidak Final Manual'
						},
						{
							url : '/modules/epptv2/csv/tidak_final_auto',
							name: 'Pasal 21 Tidak Final Auto'
						},
						{
							url : '/modules/epptv2/csv/final_manual',
							name: 'Pasal 21 Final Manual'
						},
						{
							url : '/modules/epptv2/csv/final_auto',
							name: 'Pasal 21 Final Auto'
						},
						{
							url : '/modules/epptv2/csv/a1',
							name: 'Pasal 21 A1'
						},
						{
							url : '/modules/epptv2/csv/a2',
							name: 'Pasal 21 A2'
						},
						{
							url : '/modules/epptv2/csv/satu_masa',
							name: 'Pasal 21 Satu Masa'
						},
						{
							url : '/modules/epptv2/csv/ssp',
							name: 'Pasal 21 SSP'
						},
						{
							url : '/modules/epptv2/csv/daftar_biaya',
							name: 'Pasal 21 Daftar Biaya'
						},
					]
				},
				{
					name: 'H2H',
					active: false,
					openSub: false,
					submenus: [
						{
							url: '/modules/h2h/csv/fk',
							name: 'FK'
						},
						{
							url: '/modules/h2h/csv/fm',
							name: 'FM'
						},
						{
							url: '/modules/h2h/csv/lt',
							name: 'LT'
						},
						{
							url: '/modules/h2h/csv/rdkm',
							name: 'RDKRDM'
						},
						{
							url: '/modules/h2h/csv/vat',
							name: 'VAT'
						},
						{
							url: '/modules/h2h/csv/dkdm',
							name: 'DKDM'
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
							url: '/modules/eppt/runner/import',
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