import React from "react";
import { Image } from "semantic-ui-react";
import Footer from "./Footer";
import AboutSection from "./About";

const LandingPage: React.FC = () => {
  
  return (
    <>
      <div style={{ position: "relative" }}>
        <Image
          src="https://img.freepik.com/free-photo/top-view-budget-written-note-notepad-with-pen-dark-surface-student-color-school-money-gray-college-copybook_179666-19729.jpg?w=2000"
          style={{ width: "100%", height: "auto" }}
        />
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            color: "white",
            zIndex: 1, // Ensure it's on top of the image
          }}
        >
          <h1>Personal Budgeting with Convenience</h1>
          <h4>Welcome to Budgeting System</h4>
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            opacity: 0.75,
            zIndex: 0, // Place the layer behind the content
          }}
        />
      </div>

      <AboutSection />
      <Footer />
    </>
  );
};
export default LandingPage;
