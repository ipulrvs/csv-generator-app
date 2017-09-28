import React from 'react'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';

class Topbar extends React.Component {
  render() {
    window.hahahaTopbar = this
    return (
      <div className="topbar">
				<AppBar position="static" className="topbarMain">
          <Toolbar>
            <IconButton color="contrast" aria-label="Menu" className="mobileView">
              <Icon>menu_icon</Icon>
            </IconButton> 
            <Typography type="title" color="inherit" className="mobileView topbarTitle">
              <strong>THEA Testing</strong>
            </Typography>
            <Typography type="title" color="inherit" className="topbarSpace">

            </Typography>
            <IconButton color="contrast" aria-label="Menu">
              <Icon>settings_power</Icon>
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Topbar