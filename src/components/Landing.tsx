import React from 'react'
import { Header, Image } from 'semantic-ui-react'

const LandingPage = () => (
  <div style={{position: 'relative'}}>
    <Image src='https://img.freepik.com/free-photo/top-view-budget-written-note-notepad-with-pen-dark-surface-student-color-school-money-gray-college-copybook_179666-19729.jpg?w=2000' style={{width: '100%', height: 'auto'}}/>
    <div style={{position: 'absolute', top: '10%', left: '10%', color: 'white'}}>
      <h1>Convenience of Personal Budgeting System!</h1>
      <Header as='h4'>Welcome to Budgeting System</Header>
      <p>This is where you can see some information about the app.</p>
    </div>
  </div>
)

export default LandingPage
