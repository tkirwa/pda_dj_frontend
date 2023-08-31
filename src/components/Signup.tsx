import React from 'react'
import { Button, Form } from 'semantic-ui-react'
// import { Checkbox } from 'semantic-ui-react'

const SignupForm = () => (
  <Form>
    <Form.Field>
      <label>Username</label>
      <input placeholder='Username' />
    </Form.Field>
    <Form.Field>
      <label>Email (Optional)</label>
      <input placeholder='email' disabled/>
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input type='password' placeholder='Password' />
    </Form.Field>
    {/* <Form.Field>
      <Checkbox label='I agree to the Terms and Conditions' />
    </Form.Field> */}
    <Button type='submit'>Sign Up</Button>
  </Form>
)

export default SignupForm