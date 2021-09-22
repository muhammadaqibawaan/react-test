import React, { useEffect } from 'react';
import logo from '../../assets/logo.jpg';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Alert } from 'antd';
import * as authActions from '../../store/actions/Auth';
import { Route } from 'react-router';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();
  const AuthLoading = useSelector(state => state.auth.loading);
  const AuthError = useSelector(state => state.auth.error);
  const data = {
    userImage:
      'https://www.shifa.com.pk/wp-content/uploads/2020/10/Munir-Zafar-150x150.png',
      mrNo: 123,
      patientName: "Usman Ali",
      aptTime: '',
      arrivalTime: '08:12 AM',
      assessTime: '',
      seenTime: '04:34 AM',
      amount: '',
      address: 'Multan Punjab'
  };
  const toke =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6ImFlNTJiOGQ4NTk4N2U1OWRjYWM2MmJlNzg2YzcwZTAyMDcxN2I0MTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2hpZmZhLXRlc3QiLCJhdWQiOiJzaGlmZmEtdGVzdCIsImF1dGhfdGltZSI6MTYzMjI4OTY1NywidXNlcl9pZCI6ImNEMHJlTmlyR0dUcEZMTnBYbzFmWlhvRWJnUzIiLCJzdWIiOiJjRDByZU5pckdHVHBGTE5wWG8xZlpYb0ViZ1MyIiwiaWF0IjoxNjMyMjg5NjU3LCJleHAiOjE2MzIyOTMyNTcsImVtYWlsIjoiYXFpYkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYXFpYkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.Vpng2y4YA3rh5ceLsuS64JDReIWhjdaNkwt9XJoEeBJCIRtbtMy5pxjvcoOP0XYJMTXj9ojflkUeYXJ8JMhWvhPBXR966iECPrZlKydtWXt0Et_iqJTNNMr7PD2nmMSZwrXtDtgJGj3jek3zaQ85RgsjUbeRBr33l05poi-PN77uQB6WOHGsWk_-Cr9bFWz7qRWF1kfNM_1i61J1EUiGuppl22639obECzjtogscYAiLXROkoHYl4JyNBJcJt-zFsTyK9fvVJGjm-xOs9qwefiPC5Sm1IujT8nVLg_P_i599fMwpV8K-xVHlIakji1x-eTwEZiCphjw6sZaVNpSkxw';


  const dispatch = useDispatch();
  const onFinish = async ({ username, password }) => {
      dispatch(
        authActions.auth({
          email: username,
          password: password,
          isSignup: false,
        })
      ).then(res=>{
        console.log('error occurred... res');
        history.push('/dashboard');
      }).catch(error=>{
        console.log("error occurred...", error)
      })
  };

  useEffect(() => {
    dispatch(authActions.authFail(null));    

  }, [])

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
            label='Username'
            name='username'
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            {/* <label>Username</label> */}
            <Input
              suffix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Username'
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
              Log in
            </Button>

            <p className='text-center forgottpass'>
              Don't have an account yet?
              <Route
                render={({ history }) => (
                  <Button type='link' onClick={() => history.push('/register')}>
                    Register
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
