import { useNavigate } from 'react-router-dom';
import { Formik, FormikHelpers } from 'formik';
import { FormValues, IAuth } from '../../interfaces/user.interface';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { authActions } from '../../redux/slices/authSlice';
import './sign-up.styles.scss';

type FormErrors = Pick<IAuth, 'email' | 'password'>;

const validate = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  }

  return errors;
};

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    console.log('values', values);
    const { email, password } = values;
    try {
      const user = await dispatch(authActions.login({ email, password }));
      if (user) {
        setSubmitting(false);
        navigate('/shop');
      }
    } catch (error) {
      console.log('error', error);
      setSubmitting(false);
    }
  };

  return (
    <div className='sign-up'>
      <h1>Sign In</h1>
      <div className='form-container'>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => {
            const { email } = errors;
            return (
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    type='email'
                    name='email'
                    onChange={handleChange}
                    value={values.email}
                    placeholder='Email'
                    className={'nomad-input email ' + (email ? 'error' : '')}
                  />
                </div>
                <div>
                  <input
                    type='password'
                    name='password'
                    onChange={handleChange}
                    value={values.password}
                    placeholder='Password'
                    className='nomad-input password'
                  />
                </div>
                <div className='submit-btn'>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='button is-black nomad-btn submit'
                  >
                    Submit
                  </button>
                </div>
                <div className='error-message'></div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;
