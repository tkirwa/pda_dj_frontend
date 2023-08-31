import React from 'react'
import { Button, Form } from 'semantic-ui-react'
// import { Checkbox } from 'semantic-ui-react'

const LoginForm = () => (
  <Form>
    <Form.Field>
      <label>Username</label>
      <input placeholder='Username' />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input type='password' placeholder='Password' />
    </Form.Field>
    {/* <Form.Field>
      <Checkbox label='I agree to the Terms and Conditions' />
    </Form.Field> */}
    <Button type='submit'>Login</Button>
  </Form>
)

export default LoginForm