import React from 'react';
import { Grid, Image, Segment, Header, Card } from 'semantic-ui-react';
import 'pure-react-carousel/dist/react-carousel.es.css';
import CardCarousel from '../components/CardCarousel';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const textbox = {
      backgroundColor: 'rgba(130,130,130, .7)',
      borderRadius: '25px',
      padding: '10px',
    };
    return (
      <div className="gray-background" id='landing-page' style={{ padding: '70px' }} stacked>
        <div>
          <Grid centered columns={1} stacked>
            <Grid.Column>
              <CardCarousel />
            </Grid.Column>
          </Grid>
        </div>
        <Grid.Column>
          <h1>Welcome to this template</h1>
          <p>Now get to work and modify this app!</p>
        </Grid.Column>
        <div>
          <div className="ui centered three column grid">
            <div className="centered column">
              <Card fluid={true} centered={true}>
                <Image src='/images/lupin.jpeg' />
                <Card.Content>
                  <Card.Header>My Neighbor Totoro</Card.Header>
                  <Card.Description>
                      Two sisters move to the country with their father in order to be
                      closer to their hospitalized mother, and discover the surrounding
                      trees are inhabited by magical spirits.
                  </Card.Description>
                </Card.Content>
              </Card>

            </div>
            <div className="column">

              <Card fluid={true} centered={true}>
                <Image src='/images/test2.jpeg' />
                <Card.Content>
                  <Card.Header>My Neighbor Totoro</Card.Header>
                  <Card.Description>
                    Two sisters move to the country with their father in order to be
                    closer to their hospitalized mother, and discover the surrounding
                    trees are inhabited by magical spirits.
                  </Card.Description>
                </Card.Content>
              </Card>

            </div>
            <div className="column" centered>

              <Card fluid={true} centered={true}>
                <Image src='/images/test2.jpeg' />
                <Card.Content>
                  <Card.Header>My Neighbor Totoro</Card.Header>
                  <Card.Description>
                    Two sisters move to the country with their father in order to be
                    closer to their hospitalized mother, and discover the surrounding
                    trees are inhabited by magical spirits.
                  </Card.Description>
                </Card.Content>
              </Card>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
