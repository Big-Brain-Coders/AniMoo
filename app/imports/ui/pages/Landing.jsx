import React from 'react';
import { Grid, Image, Card } from 'semantic-ui-react';
import 'pure-react-carousel/dist/react-carousel.es.css';
import CardCarousel from '../components/CardCarousel';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const textbox = {
      backgroundColor: 'rgb(255,255,255,.7)',
      borderRadius: '25px',
      padding: '15px',
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
        <Grid.Column style={textbox}>
          <h1>Check out AniMoo's most popular shows!</h1>
          <p>These shows were picked from AniMoo's team as their all time favorites</p>
        </Grid.Column>
        <div style={{ padding: '10px' }}>
          <div className="ui centered three column grid">
            <div className="centered column">
              <Card fluid={true} centered={true}>
                <Image src='/images/demonslayer.jpeg' />
                <Card.Content>
                  <Card.Header>Demon Slayer: Kimetsu no Yaiba</Card.Header>
                  <Card.Description>
                    A family is attacked by demons and only two members survive -
                    Tanjiro and his sister Nezuko, who is turning into a demon slowly.
                    Tanjiro sets out to become a demon slayer to avenge his family and cure his sister.
                    It has recently released a movie and has a second season will air during winter season. Nezuko is very cute.
                    < br/>
                  </Card.Description>
                </Card.Content>
              </Card>

            </div>
            <div className="column">

              <Card fluid={true} centered={true}>
                <Image src='/images/codegeass.jpeg' />
                <Card.Content>
                  <Card.Header>Code Geass: Hangyaku no Lelouch</Card.Header>
                  <Card.Description>
                    In the year 2010, the Holy Empire of Britannia is
                    establishing itself as a dominant military nation, starting with the
                    conquest of Japan. Renamed to Area 11 after its swift defeat, Japan has seen
                    significant resistance against these tyrants in an attempt to regain independence.
                    < br/> < br/>
                  </Card.Description>
                </Card.Content>
              </Card>

            </div>
            <div className="column" centered>

              <Card fluid={true} centered={true}>
                <Image src='/images/onepiece.jpeg' />
                <Card.Content>
                  <Card.Header>One Piece</Card.Header>
                  <Card.Description>
                    Gol D. Roger was known as the "Pirate King," the strongest and most infamous
                    being to have sailed the Grand Line. The capture and execution of Roger by
                    the World Government brought a change throughout the world. His last words
                    before his death revealed the
                    existence of the greatest treasure in the world, One Piece.
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
