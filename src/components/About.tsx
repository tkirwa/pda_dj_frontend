import React from "react";
import { Image, Segment, Header, Label } from "semantic-ui-react";

const AboutSection: React.FC = () => {
  const skillsets = [
    "Django",
    "Django Restframework",
    "React/Next",
    "TypeScript",
    "PostgreSQL",
    "REST APIs",
    "Semantic CSS",
    "Semantic UI",
    "Tailwind CSS",
    "SQL/No-SQL Databases",
  ];

  return (
    <Segment vertical style={{ padding: "4em 0" }}>
      <Header as="h2" textAlign="center">
        About the Software Engineer
      </Header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src={require("../assets/images/se_photo.jpeg")}
          circular
          size="medium"
        />
      </div>
      <Header as="h3" textAlign="center">
        Tonny Kirwa
        </Header>
      <Header as="h4" textAlign="center">
        Software Engineer
      </Header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Label.Group
          
          >
          {skillsets.map((skill, index) => (
            <Label key={index} color="green">
              {skill}
            </Label>
          ))}
        </Label.Group>
      </div>
    </Segment>
  );
};

export default AboutSection;
