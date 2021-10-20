import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Grid } from 'semantic-ui-react';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    const textbox = {
      backgroundColor: 'rgba(130,130,130, .9)',
      borderRadius: '25px',
      padding: '10px',
      fontWeight: 'bold',
    };
    const padding = {
      paddingTop: '300px',
    };
    return (
      <div className="login-background">
        <Grid centered columns={2} style={padding}>
          <Grid.Column>
            <Header id="signout-page" style={textbox} as="h2" textAlign="center">
              <p>You have successfully signed out.</p>
            </Header>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
