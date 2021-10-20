import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Item, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, Link } from 'react-router-dom';
import { Anime } from '../../api/anime/Anime';
import { Users } from '../../api/user/User';


/** Renders users liked shows. */
class LikesSection extends React.Component {
  render() {
    return (
        <Item>
            <Item.Image size='tiny' src={this.props.anime.image_url}/>
            <Item.Content>
                <Item.Header as='a'>{this.props.anime.title}</Item.Header>
                <Item.Meta>{this.props.anime.synopsis}</Item.Meta>
            </Item.Content>
        </Item>
    );
  }
}

/** Require a document to be passed to this component. */
LikesSection.propTypes = {
  anime: PropTypes.object.isRequired,
//   ready: PropTypes.bool.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(LikesSection);