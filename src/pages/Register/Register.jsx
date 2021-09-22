import React from 'react';
import logo from '../../assets/logo.jpg';
import { Form, Input, Button } from 'antd';
import { LockOutlined, MailFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'antd';
import * as authActions from '../../store/actions/Auth';
import { Route } from 'react-router';

export default function Login() {
  const AuthLoading = useSelector(state => state.auth.loading);
  const AuthError = useSelector(state => state.auth.error);

  const dispatch = useDispatch();
  const onFinish = async ({ email, password }) => {
    try {
      const authRes = await dispatch(
        authActions.auth({
          email: email,
          password: password,
          isSignup: true,
        })
      );
      console.log('authRes', authRes);
    } catch (error) {
      console.log('authRes error', error);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-component'>
        <img src={logo} alt='' className='logo' />
        <p className='login-title'>
          <b>Shifa</b> International hospitl limited
        </p>
        <div>
          {AuthError ? (
            <Alert
              description={AuthError.message}
              type='error'
              closable
              onClose={() => {}}
            />
          ) : null}
        </div>
        <Form
          name='normal_login'
          className='login-form'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete='off'
        >
          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
            <Input
              suffix={<MailFilled className='site-form-item-icon' />}
              placeholder='Email'
            />
          </Form.Item>

          <Form.Item
            name='password'
            label='Password'
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            {/* <label>Password</label> */}
            <Input
              suffix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              loading={AuthLoading}
              className='login-form-button'
            >
              Register
            </Button>

            <p className='text-center forgottpass'>
              Already have an account yet?
              <Route
                render={({ history }) => (
                  <Button type='link' onClick={() => history.push('/login')}>
                    Login
                  </Button>
                )}
              />
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
