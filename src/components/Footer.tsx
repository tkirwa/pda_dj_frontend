import React from 'react';
import { Segment, Container, Grid, Header, Icon } from 'semantic-ui-react';


const Footer: React.FC = () => {
  return (
    <Segment inverted vertical style={{ padding: '2em', margin: '0.8em 0 0.8em 0' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            {/* <Grid.Column width={7} style={{ padding: '0.8em' }}>
              <Header inverted as="h4">
                About Us
              </Header>
              <p>
                Our About Us page provides insight into our diverse range of services 
                and the vision behind our company. At our core, we specialize in Fintech 
                Applications, Social Media Management. We also develop Productivity Gauging 
                Systems that enable data-driven decision-making.
              </p>
            </Grid.Column> */}
            <Grid.Column width={4}>
              <Header inverted as="h4">
                Quick Links
              </Header>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </Grid.Column>
            <Grid.Column width={6}>
              <Header inverted as="h4">
                Connect with Us
              </Header>
              <a href="https://www.facebook.com">
                <Icon name="facebook" size="big" />
              </a>
              <a href="https://twitter.com/tonnykirwa">
                <Icon name="twitter" size="big" />
              </a>
              <a href="https://www.linkedin.com/in/tonny-kirwa-957ba0104/">
                <Icon name="linkedin" size="big" />
              </a>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
};

export default Footer;
