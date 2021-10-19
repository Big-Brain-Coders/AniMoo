import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Pagination, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Anime } from '../../api/anime/Anime';
import AnimeItem from '../components/AnimeItem';

/**
const [shows, setShows] = useState(JsonData);
const [pageNumber, setPageNumber] = useState(0);
const perPage = 10;
const pagesRead = pageNumber * perPage;
const animes = Anime.collection.find({}).fetch();

const onClick = () => {

};
 * */

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListAnime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
  }

  handlePageChange = (e, { activePage }) => {
    this.setState({ activePage });
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {

    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const shows = Anime.collection.find({}).fetch();

    return (
      <Container>
        <Header as="h2" textAlign="center">Anime List</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Image</Table.HeaderCell>
              <Table.HeaderCell>Summary</Table.HeaderCell>
              <Table.HeaderCell>Episodes</Table.HeaderCell>
              <Table.HeaderCell>Rating</Table.HeaderCell>
              <Table.HeaderCell>Add To Favorites</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.anime.slice((this.state.activePage - 1) * 25, this.state.activePage * 25).map((show) => <AnimeItem key={show._id} anime={show} />)}
          </Table.Body>
        </Table>
        <Pagination
          activePage={this.activePage}
          totalPages={Math.ceil(shows.length / 25)}
          firstItem={{ content: <Icon name='angle double left'/>, icon: true }}
          lastItem={{ content: <Icon name='angle double right'/>, icon: true }}
          prevItem={{ content: <Icon name='angle left'/>, icon: true }}
          nextItem={{ content: <Icon name='angle right'/>, icon: true }}
          onPageChange={this.handlePageChange}
        />
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
