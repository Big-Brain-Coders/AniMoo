import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Pagination } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Anime } from '../../api/anime/Anime';
import AnimeItem from '../components/AnimeItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListAnime extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">Anime List</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Image</Table.HeaderCell>
              <Table.HeaderCell>Synopsis</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.anime.map((show) => <AnimeItem key={show._id} anime={show} />)}
          </Table.Body>
        </Table>
        <Pagination defaultActivePage={5} totalPages={10} />
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListAnime.propTypes = {
  anime: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Anime.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const anime = Anime.collection.find({}).fetch();
  return {
    anime,
    ready,
  };
})(ListAnime);
