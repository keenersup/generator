import React from 'react';
import { Button, Form, Message } from "semantic-ui-react";
import { AccountFormWrapper } from "./styled/AccountFormWrapper";
import { AccountSubmitButtonWrapper } from "./styled/AccountSubmitButtonWrapper";


const RegisterForm = ({ onSubmit, loading, input, errorList, reset }) => {
  return (
    <AccountFormWrapper>
      <Form onSubmit={onSubmit} loading={loading}>
        <Form.Input
          label='Username'
          placeholder='Username'
          type='text'
          {...input.username}
        />
        <Form.Input
          label='Email'
          placeholder='Email'
          type='text'
          {...input.email}
        />
        <Form.Input
          label='Password'
          placeholder='Password'
          type='password'
          {...input.password}
        />
        <Form.Input
          label='ConfirmPassword'
          placeholder='ConfirmPassword'
          type='password'
          {...input.confirmPassword}
        />
        <AccountSubmitButtonWrapper>
          <Button type='reset' compact primary onClick={reset} negative>
            Reset
          </Button>
          <Button type='submit' compact primary positive>
            Register
          </Button>
        </AccountSubmitButtonWrapper>
      </Form>
      {errorList.length > 0 && (
        <Message
          error
          header='Something Wrong'
          list={errorList}
        />
      )}
    </AccountFormWrapper>
  );
}

export default RegisterForm;