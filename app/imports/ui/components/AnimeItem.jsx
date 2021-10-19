import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Table, Image, Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import { Users } from '../../api/user/User';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AnimeItem extends React.Component {
  addLike = () => {
    Users.collection.update({ _id: Users.collection.findOne({})._id },
      { $push: { likedShows: this.props.anime._id } });
    console.log(this.props.anime._id);
  };

  render() {
    return (
      <Table.Row>
        <Table.Cell textAlign='center'><Header as='h5'>{this.props.anime.title}</Header></Table.Cell>
        <Table.Cell><Image src={this.props.anime.image_url} size='small'/></Table.Cell>
        <Table.Cell>{this.props.anime.synopsis}</Table.Cell>
        <Table.Cell textAlign='center'>{this.props.anime.episodes}</Table.Cell>
        <Table.Cell textAlign='center'>{this.props.anime.rating}</Table.Cell>
        <Table.Cell>
          <Button icon='heart'
            floated='right'
            onClick={this.addLike}
            // label={{ basic: true, color: 'red', pointing: 'left', content: this.props.items.numberOfLike }}
            // color={User.findOne({}).likedItems.includes(this.props.items._id) ? 'red' : null}/>
          />
        </Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
AnimeItem.propTypes = {
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
  // DELETE LATER. PRINTING TO CONSOLE TO SEE CURRENT USER
  const current = Users.collection.find({}).fetch();
  console.log(current);
  
  return {
    ready: subscription2.ready(),
  };
})(AnimeItem);
// Wrap this component in withRouter since we use the <Link> React Router element.
