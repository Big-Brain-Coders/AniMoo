import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment, TextArea } from 'semantic-ui-react';
import Axios from 'axios';
import FormData from 'form-data';
import { Accounts } from 'meteor/accounts-base';
import swal from 'sweetalert';
import { Users } from '../../api/user/User';
/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /* Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', username: '', firstName: '',
      lastName: '', image: '', bio: '', error: '', redirectToReferer: false };
  }

  /* Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password, firstName, lastName, username, bio } = this.state;
    const image = this.state.image;
    Accounts.createUser({ email, username, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
        Users.collection.insert({
          email: email,
          firstName: firstName,
          lastName: lastName,
          image: image,
          bio: bio,
        },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else if (!image) {
            swal('Error', 'Image has not completed uploading. Please wait a few more seconds and try again.', 'error');
          } else {
            this.setState({ error: '', redirectToReferer: true });
          }
        });
      }
    });
  }

  /* Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/anime-list' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    const uploadImg = (files) => {
      const data = new FormData();
      data.append('file', files[0]);
      data.append('cloud_name', 'glarita');
      data.append('upload_preset', 'animoo');
      Axios.post('https://api.cloudinary.com/v1_1/glarita/image/upload', data).then((r) => {
        console.log(r.data.url);
        this.setState({ image: r.data.url });
      });
    };

    return (
      <Container id="signup-page" style={{ paddingTop: '25px' }}>
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Welcome to AniMoo!
            </Header>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Group widths='equal'>
                  <Form.Input
                    fluid
                    label="First Name"
                    id="signup-form-firstName"
                    name="firstName"
                    type="firstName"
                    placeholder="Please enter your first name."
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    label="Last Name"
                    id="signup-form-lastName"
                    name="lastName"
                    type="lastName"
                    placeholder="Please enter your last name."
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <Form.Input
                  label="Email"
                  id="signup-form-email"
                  icon="mail"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Username"
                  id="signup-form-username"
                  icon="user"
                  iconPosition="left"
                  name="username"
                  type="username"
                  placeholder="Username"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  id="signup-form-password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <p style={{ marginBottom: '-5px', marginTop: '5px', fontSize: '13px' }}><strong>Upload profile picture</strong></p>
                <Form.Input
                  style={{ marginTop: '10px' }}
                  type='file' onChange={(event) => {
                    uploadImg(event.target.files);
                  }}
                />
                <Form.Input
                  label="Bio"
                  id="bio"
                  control={TextArea}
                  name="bio"
                  placeholder="Bio"
                  type="bio"
                  onChange={this.handleChange}
                />
                <Form.Button id="signup-form-submit" content="Submit"/>
              </Segment>
            </Form>
            <Message>
              Already have an account? Login <Link to="/signin">here</Link>
            </Message>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Registration was not successful"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/* Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
