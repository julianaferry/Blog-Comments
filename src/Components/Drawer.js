import React from 'react';
import PropTypes from 'prop-types';
//import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
//import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
//import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';
import Container from './Container';
import CategoryBar from './CategoryBar';
import Hidden from '@material-ui/core/Hidden';

const drawerWidth = 240;

const styles = theme => ({
root: {
    flexGrow: 1,
    height: 440,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
},

  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class ResponsiveDrawer extends React.Component {
    state = {
        mobileOpen: false,
      };
    
      handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
      };
    
      render() {
        const { classes, theme, posts, categories, order } = this.props;
    

        const drawer = (
            <div>
              <div className={classes.toolbar} />
   
            <List>
            <CategoryBar
         order={order}
         categories={categories}
         handleOrderChange={this.handleOrderChange}
             />
            </List>
            </div>
    );
    return (
        <div className={classes.root}>
          <AppBar className={classes.appBar}>

            <Toolbar  style={{ backgroundColor:'#FF9CD3', boxShadow:'none', width:'20vw'}}>
            <Typography>
                    <Link to={`/`} variant="title" color="inherit" noWrap
                     style={{ color:'yellow', fontFamily: 'fantasy',fontSize: '23px', display: 'block', marginLeft: '-20px'}}> 
                    Readable </Link>
                </Typography>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
             
            </IconButton>
            
                
              
            </Toolbar>
          </AppBar>  
               
     
  
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              style={{backgroundColor:'#FF9CD3'}} 
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              variant="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}
            >s
              {drawer}
            </Drawer>
          </Hidden>
          <main className={classes.content}>
            <Container  
            posts={posts}
            categories={ categories}
            order ={order}
           
        />
          </main>
        </div>
      );
    }
  }
  
  ResponsiveDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);