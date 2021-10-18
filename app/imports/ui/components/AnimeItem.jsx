import React from 'react';
import { Table, Image, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AnimeItem extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell><Header as='h5'>{this.props.anime.title}</Header></Table.Cell>
        <Table.Cell><Image src={this.props.anime.image_url} size='small'/></Table.Cell>
        <Table.Cell>{this.props.anime.synopsis}</Table.Cell>
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
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(AnimeItem);
