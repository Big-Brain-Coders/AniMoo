import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import Axios from 'axios';
import FormData from 'form-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Stuffs } from '../../api/stuff/Stuff';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  displayName: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddStuff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: '',
    };
  }

  // On submit, insert the data.
  submit(data, formRef) {
    const { displayName } = data;
    const owner = Meteor.user().username;
    const image = this.state.imageURL;
    Stuffs.collection.insert({ displayName, image, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;

    const formStyle = {
      width: '500px',
      marginLeft: '310px',
    };

    const uploadImg = (files) => {
      const data = new FormData();
      data.append('file', files[0]);
      data.append('cloud_name', 'glarita');
      data.append('upload_preset', 'animoo');
      Axios.post('https://api.cloudinary.com/v1_1/glarita/image/upload', data).then((r) => {
        console.log(r.data.url);
        this.setState({ imageURL: r.data.url });
      });
    };
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Profile Information</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment style={formStyle}>
              <TextField name='displayName'/>
              <p style={{ marginBottom: '-5px', marginTop: '5px', fontSize: '13px' }}><strong>Upload profile picture</strong><strong style={{ color: 'red' }}> *</strong></p>
              <input
                style={{ marginTop: '10px' }}
                type='file' onChange={(event) => {
                  uploadImg(event.target.files);
                }}
              />
              <SubmitField
                style={{ marginTop: '10px' }} value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddStuff;
