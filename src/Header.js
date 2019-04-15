import React, {Component}  from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
};

class Header extends Component {
	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
			  <AppBar position="static">
				<Toolbar>
				  <Typography variant="h6" color="inherit" className={classes.grow}>
					<Link to="/">Home</Link>
				  </Typography>
				  <Button color="inherit">Login</Button>
				</Toolbar>
			  </AppBar>
			</div>
		  );
	}

}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);