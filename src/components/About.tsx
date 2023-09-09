import React from 'react';
import { Image, Container, Segment, Header, List } from 'semantic-ui-react';

const AboutSection = () => {
  return (
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Header as="h3" content="About Us" />
        <p>
          Our project was born from a shared passion for personal budgeting
          and financial management. We believe that managing your finances
          should be convenient and accessible to everyone. This project is a
          result of our dedication to providing a user-friendly budgeting
          system.
        </p>
        <p>
          <strong>Team Members:</strong>
        </p>
        <List horizontal>
          <List.Item>
            <List.Content>
              <List.Header>
                <a
                  href="https://www.linkedin.com/in/team-member1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </List.Header>
              <List.Description>Team Member 1</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>
                <a
                  href="https://github.com/team-member1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </List.Header>
              <List.Description>@team-member1</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>
                <a
                  href="https://twitter.com/team_member1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </List.Header>
              <List.Description>@team_member1</List.Description>
            </List.Content>
          </List.Item>
        </List>
        <List horizontal>
          <List.Item>
            <List.Content>
              <List.Header>
                <a
                  href="https://www.linkedin.com/in/team-member2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </List.Header>
              <List.Description>Team Member 2</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>
                <a
                  href="https://github.com/team-member2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </List.Header>
              <List.Description>@team-member2</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>
                <a
                  href="https://twitter.com/team_member2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </List.Header>
              <List.Description>@team_member2</List.Description>
            </List.Content>
          </List.Item>
        </List>
        {/* Add more team members as needed */}
      </Container>
    </Segment>
  );
};

export default AboutSection;
