import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Container, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class Signin extends React.Component {

  // Initialize component state with properties for login and redirection.
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  // Update the form controls each time the user interacts with them.
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  // Handle Signin submission using Meteor's account mechanism.
  submit = () => {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  // Render the signin form.
  render() {
    const lightblue = {
      backgroundColor: '#6eb3be',
      borderRadius: '25px',
      padding: '31px',
    };
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    // Otherwise return the Login form.
    return (
      <div className="login-background">
        <Container id="signin-page" centered>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2} >
            <div className="login">
              <Form onSubmit={this.submit}>
                <Segment style={lightblue}>
                  <Header inverted as='h2' textAlign='center'>Welcome to AniMoo</Header>
                  <Grid>
                    <Grid.Column width={10}>
                      <Image src="/images/anisquad.png" size='medium' circular centered/>
                    </Grid.Column>
                    <Grid.Column width={20}>
                      <Form.Input
                        label="Email"
                        id="login-form-email"
                        icon="user"
                        iconPosition="left"
                        name="email"
                        type="email"
                        placeholder="E-mail address"
                        onChange={this.handleChange}
                      />
                      <Form.Input
                        label="Password"
                        id="login-form-password"
                        icon="lock"
                        iconPosition="left"
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={this.handleChange}
                      />
                      <Grid>
                        <Grid.Column width={5}>
                          <Form.Button id="login-form-submit" content="Login" size="medium"/>
                        </Grid.Column>
                        <Grid.Column width={11}>
                          <p className="login-register" style={{ paddingTop: '8px' }}>Need an account? Register <Link id='signup' to='/signup'>here </Link></p>
                        </Grid.Column>
                      </Grid>
                    </Grid.Column>
                  </Grid>
                </Segment>
              </Form>
              <Message>
                <Link to="/signup">Click here to Register</Link>
              </Message>
            </div>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Login was not successful"
                content={this.state.error}
              />
            )}
          </Grid>
        </Container>
      </div>
    );
  }
}

// Ensure that the React Router location object is available in case we need to redirect.
Signin.propTypes = {
  location: PropTypes.object,
};
