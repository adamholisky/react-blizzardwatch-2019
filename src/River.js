import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
	card: {
	  maxWidth: 345,
	  margin: 15,
	},
	media: {
	  height: 200,
	},
};

class River extends Component {
	constructor(props) {
		super(props);

		this.state = {
			articles: []
		};
	}

	componentDidMount() {
		axios.get( 'https://blizzardwatch.com/wp-json/wp/v2/posts' ).then( posts => {
			//var data = posts.data;

			var promises = posts.data.map( post => {
				return axios.get( 'https://cors-anywhere.herokuapp.com/' + post._links['wp:featuredmedia'][0].href ).then( media => { 
					post.featuredimg = media.data.source_url.replace('blizzardwatch.com', 'cdn.blizzardwatch.com');
				} )
			});

			Promise.all(promises).then( () => {
				this.setState({ 
					articles: posts.data
				}); 
			});			
		});
	}

	render() {
		const { classes } = this.props;

		return (
			<div>
				{this.state.articles.map( article => (
					<Link to={`/${article.slug}`} key={article.id}>
						<Card className={classes.card} key={article.id}>
							<CardActionArea>
								<CardMedia className={classes.media} image={article.featuredimg} />
								<CardContent>
									<Typography gutterBottom variant="h5" component="h2" dangerouslySetInnerHTML={{__html:article.title.rendered}} ></Typography>
									<Typography component="p" dangerouslySetInnerHTML={{__html:article.excerpt.rendered}} ></Typography>
								</CardContent>
							</CardActionArea>
							<CardActions>
							<Button size="small" color="primary">
								Read More...
							</Button>
							</CardActions>
						</Card>
					</Link>
				))}
			</div>
		);
	}

}

River.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(River);