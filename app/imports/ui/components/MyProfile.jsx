import React from 'react';
import { Image, Container, Header, Divider, Grid, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a profile page. */
class MyProfile extends React.Component {
  render() {
    return (
      <div id='my-profile-page'>
        <Container text style={{ marginTop: '1em' }}>
          <Divider/>
          <Grid columns={2} divided>
            <Grid.Column>
              <Segment>
                <Header as='h1'>{this.props.mProfile.owner}</Header>
                <Header as='h4' style={{ marginTop: '5px', color: 'grey' }}
                >{this.props.mProfile.firstName} {this.props.mProfile.lastName}</Header>
                <Grid.Column>
                  <Image size='medium rounded' src={this.props.mProfile.image} wrapped ui={true} centered/>
                </Grid.Column>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3'>Bio</Header>
              <Segment>
                <Grid.Column>
                  <Container>{this.props.mProfile.bio}</Container>
                </Grid.Column>
              </Segment>
            </Grid.Column>
          </Grid>
          <Divider/>
        </Container>
      </div>
    );
  }
}

// Require a document to be passed to this component.
MyProfile.propTypes = {
  mProfile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    image: PropTypes.string,
    bio: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(MyProfile);
