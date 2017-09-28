import React from 'react'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';

import SidebarAction from './Sidebar.action'
import connect from 'redux-connect-decorator'
@connect(store => ({ 
  global: store.global,
  sidebar: store.sidebar
}))
class Sidebar extends React.Component {
  componentDidMount(){
    this.props.dispatch({type: SidebarAction.initialize})
  }

  handleSelectMenu(param){
    const _this = param._this
    _this.props.dispatch({type: SidebarAction.select_menu, param: param})
    console.log(param.url)
    window.hahahaahah = _this
    if(param.isMenu){
       _this.props.history.push(param.url)
    } else {
       _this.props.history.push(param.url)
    }
  }

  viewMenuList(store, _this){
    const modules = store.menus
    const viewList = []
    if(modules && modules.length > 0){
      modules.map(function (modules, modulesIndex){
        const menus = modules.menus
        const viewMenuList = []
        if(menus && menus.length > 0){
          menus.map(function(menu, menuIndex){
            const submenus = menu.submenus
            const viewSubMenuList = []
            if(submenus && submenus.length > 0){
              submenus.map(function(submenu, submenuIndex){
                viewSubMenuList.push(
                  <ListItem button className={submenu.active ? "submenu active" : "submenu"} key={submenuIndex} 
                  onClick={_this.handleSelectMenu.bind(this, {_this: _this, isMenu: false, url: submenu.url,  moduleIndex: modulesIndex, menuIndex: menuIndex, submenuIndex: submenuIndex})}>
                    <ListItemIcon>
                      <Icon>chevron_right</Icon>
                    </ListItemIcon>
                    <ListItemText inset primary={submenu.name} />
                  </ListItem>
                )
              })
            }
            if(submenus && submenus.length > 0){
              viewMenuList.push(
                <ListItem button className={menu.active ? "menu active" : "menu"} key={menuIndex} 
                onClick={_this.handleSelectMenu.bind(this, {_this: _this, isMenu: true, url: menu.url, moduleIndex: modulesIndex, menuIndex: menuIndex})}>
                  <ListItemIcon>
                    <Icon>more_vert</Icon>
                  </ListItemIcon>
                  <ListItemText inset primary={menu.name} />
                  {menu.openSub ? <Icon>expand_more</Icon> : <Icon>keyboard_arrow_left</Icon>}
                </ListItem>,
                <Collapse in={menu.openSub} transitionDuration="auto" unmountOnExit key={menuIndex+"_child"}>
                  {viewSubMenuList}
                </Collapse>
              )
            } 
            if(!submenus) {
              viewMenuList.push(
                <ListItem button className={menu.active ? "menu active" : "menu"} key={menuIndex} 
                onClick={_this.handleSelectMenu.bind(this, {_this: _this, isMenu: true, url: menu.url, moduleIndex: modulesIndex,  menuIndex: menuIndex})}>
                  <ListItemIcon>
                    <Icon>more_vert</Icon>
                  </ListItemIcon>
                  <ListItemText inset primary={menu.name} />
                </ListItem>
              )
            }
          })
        }
        viewList.push(
          <List subheader={<ListSubheader>{modules.name}</ListSubheader>} key={modulesIndex} className="sidebarMenu">
            {viewMenuList}
          </List>
        )
      })
    }
    return viewList
  }

  render() {
    window.hahahaSidebar = this
    const _store = this.props.sidebar
    const viewMenuList = this.viewMenuList(_store, this)
    return (
      <Drawer className="sidebar" type="persistent" open={_store.open}>
				<div className="window vbox">
					<div className="topbar">
            <AppBar position="static" className="topbarMainSidebar">
              <Toolbar>
                <IconButton color="contrast" aria-label="Menu">
                  <Icon>menu_icon</Icon>
                </IconButton>
                <Typography type="title" color="inherit" className="topbarTitle">
                  <strong>THEA Testing</strong>
                </Typography>
              </Toolbar>
            </AppBar>
          </div>
					<div className="content flex">
            {viewMenuList}
					</div>
				</div>
      </Drawer>
    );
  }
}

export default Sidebar