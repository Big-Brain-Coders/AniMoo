import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Table, Image, Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
// eslint-disable-next-line no-unused-vars
import { _ } from 'meteor/underscore';
import { Users } from '../../api/user/User';

/** Renders a single row in the Anime table. */
class AnimeItem extends React.Component {
  addLike = () => {
    if (!(Users.collection.findOne({}).likedShows.includes(this.props.anime._id))) {
      Users.collection.update({ _id: Users.collection.findOne({})._id },
        { $push: { likedShows: this.props.anime._id } });
    } else {
      Users.collection.update({ _id: Users.collection.findOne({})._id },
        { $pull: { likedShows: this.props.anime._id } });
    }
  };

  render() {
    return (this.props.ready) ? this.renderPage() : null;
  }

  renderPage() {
    return (
      <Table.Row>
        <Table.Cell textAlign='center'><Header as='h5'>{this.props.anime.title}</Header></Table.Cell>
        <Table.Cell><Image src={this.props.anime.image_url} size='small'/></Table.Cell>
        <Table.Cell>{this.props.anime.synopsis}</Table.Cell>
        <Table.Cell textAlign='center'>{this.props.anime.episodes}</Table.Cell>
        <Table.Cell textAlign='center'>{this.props.anime.rating}</Table.Cell>
        <Table.Cell>
          <Button icon='heart'
            floated='left'
            onClick={this.addLike}
            color={Users.collection.findOne({}).likedShows.includes(this.props.anime._id) ? 'red' : 'grey'}
          />
        </Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
AnimeItem.propTypes = {
  ready: PropTypes.bool.isRequired,
  anime: PropTypes.shape({
    title: PropTypes.string,
    image_url: PropTypes.string,
    synopsis: PropTypes.string,
    episodes: PropTypes.number,
    rating: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

export default withTracker(() => {
  const subscription2 = Meteor.subscribe(Users.userPublicationName);
  // DON'T DELETE CURRENT IDK WHY BUT IT'S SUPER NECESSARY
  // eslint-disable-next-line no-unused-vars
  const current = Users.collection.find({}).fetch();
  return {
    ready: subscription2.ready(),
  };
})(AnimeItem);
