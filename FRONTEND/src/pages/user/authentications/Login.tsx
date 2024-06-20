import React from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginValidation } from '../../../utils/validations/validateSchema';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { loginUser,GoogleLogin } from '../../../API/services/user/authSlice';
import { auth, signInWithPopup, provider } from '../../../firebase/firebase';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {

      const resultAction = await dispatch(loginUser(values));

      if (loginUser.fulfilled.match(resultAction)) {
        toast.success('Login successful');
        navigate('/home'); 
      } else {
        if (resultAction.payload) {
          toast.error(resultAction.payload as string);
        } else {
          toast.error('Invalid user');
        }
      }
    } catch (error) {
     console.log(error);
     
    }
  };

  const initialValue: { email: string; password: string } = {
    email: '',
    password: '',
  };

  const googleAuth = async () => {
    try {
        const result = await signInWithPopup(auth, provider)
        const user = result.user;
        console.log('Google user', user);

        await dispatch(GoogleLogin({ email: user.email, name: user.displayName, uid: user.uid })).then((response) => {
            if (response.meta.requestStatus === 'fulfilled') {
                toast.success('User signed up with Google');
                navigate('/home');
            } else {
                toast.error('User Not Found');
            }
        });
    } catch (error) {
        console.error('Error during Google signup:', error);
        toast.error('Google signup failed');
    }

}
  return (
    <div className="bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent rounded-3xl shadow-xl">
        <div className="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md z-10">
          <div className="self-start hidden lg:flex flex-col text-gray-300">
            <h1 className="my-3 font-semibold text-4xl">Welcome back</h1>
            <p className="pr-3 text-sm opacity-75">
              Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups
            </p>
          </div>
        </div>
        <div className="flex justify-center self-center z-10">
          <div className="p-12 bg-white mx-auto rounded-3xl w-96">
          
            <Formik initialValues={initialValue} validationSchema={loginValidation} onSubmit={handleSubmit}>
              {({ handleChange, values, handleSubmit, touched, errors, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <Field
                        className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                        // type="email"
                        name="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500" />
                    </div>
                    <div className="relative">
                      <Field
                        placeholder="Password"
                        type="password"
                        name="password"
                        className="text-sm text-black-200 px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-purple-400"
                        value={values.password}
                        onChange={handleChange}
                      />
                      <ErrorMessage name="password" component="div" className="text-red-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm ml-auto">
                        <a onClick={()=>navigate("/forgot")} className="text-purple-700 hover:text-purple-600">Forgot your password?</a>
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center bg-purple-800 hover:bg-purple-700 text-gray-100 p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Signing in...' : 'Sign in'}
                      </button>
                    </div>
                    <div className="mb-7">
              <div className="px-6 sm:px-0 max-w-sm">
                <button
                onClick={googleAuth}
                  type="button"
                  className="text-white w-full bg-[#9134fc] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
                >
                  <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                  </svg>
                  Sign up with Google
                </button>
              </div>
            </div>
                    <p className="text-gray-400">Don't have an account? <a href="#" className="text-sm text-purple-700 hover:text-purple-700 ml-9" onClick={()=>navigate("/signup")}>Sign Up</a></p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;