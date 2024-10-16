import { useState } from 'react';
import { Formik } from 'formik';
import { IAuth } from '../../interfaces/user.interface';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { authActions } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import './sign-up.styles.scss';

type FormValues = Pick<IAuth, 'firstname' | 'email' | 'password'>;

const validate = (values: IAuth) => {
  const errors: FormValues = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.firstname) {
    errors.firstname = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

const SignUp = () => {
  const [error, setError] = useState<any>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const initialValues = {
    firstname: '',
    email: '',
    password: '',
  };

  const handleSignUp = async (values: FormValues, { setSubmitting }: any) => {
    const { firstname, email, password } = values;
    try {
      await dispatch(authActions.register({ email, firstname, password }));
      navigate('/sign-in');
      setSubmitting(false);
    } catch (error) {
      console.log('error', error);
      setSubmitting(false);
      setError(error);
    }
  };

  return (
    <div className='sign-up'>
      <h1>Sign Up</h1>
      <div className='form-container'>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSignUp}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => {
            const { firstname, email, password } = errors;
            return (
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    type='text'
                    name='firstname'
                    onChange={handleChange}
                    value={values.firstname}
                    placeholder='First Name'
                    className={'nomad-input ' + (firstname ? 'error' : '')}
                  />
                </div>
                <div>
                  <input
                    type='email'
                    name='email'
                    onChange={handleChange}
                    value={values.email}
                    placeholder='Email'
                    className={'nomad-input ' + (email ? 'error' : '')}
                  />
                </div>
                <div>
                  <input
                    type='password'
                    name='password'
                    onChange={handleChange}
                    value={values.password}
                    placeholder='Password'
                    className={'nomad-input ' + (password ? 'error' : '')}
                  />
                </div>
                <div className='submit-btn'>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='button is-black nomad-btn submit'
                  >
                    Sign Up
                  </button>
                </div>
                <div className='error-message'>
                  {error && <p>{error.message}</p>}
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
