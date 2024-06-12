import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();

  const hasCreatedUser = useRef(false);

  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({
        auth0Id: user.sub, // auth0Id is written like that idk why
        email: user.email,
      });
      hasCreatedUser.current = true;
    }
    navigate("/");
  }, [createUser, navigate, user]);

  return <>Loading...</>;
}

// another reason we needed to put it in a new page, it is not covered
// in the auth provider as all the logic outside arent included as children
// so ir would cause an error as useAuth() wont be defined
// that is why we added a new route wih callback so that all the hooks would
// considered children and thus be recognized by the authprovider

// 1. User Authentication
// When a user attempts to log in to your application,
// they are redirected to the Auth0 login page.

// 2. Successful Authentication
// After successful authentication, Auth0 redirects the user back to
// your application with an access token and other user information.

// 3. Handling the Redirect in the onRedirectCallback Function
// In your onRedirectCallback function, you receive the user information
// and access token provided by Auth0.

// 4. Navigation to the AuthCallback Page
// Instead of directly processing the user information and access token
// in the onRedirectCallback function, you navigate the user to a dedicated page
// called AuthCallback.

// 5. Token Retrieval and User Creation Logic in AuthCallback
// In the AuthCallback component, you retrieve the access token using Auth0's SDK,
// typically via the getAccessTokenSilently method.

// 6. Call to Backend to Create User
// Once you have the access token and user information, you make a request to your
// backend server to create a new user. This request includes the user information
// and access token in the request headers.

// 7. Backend Authentication and User Creation
// Your backend server receives the request to create a new user along with
// the access token. It verifies the access token to ensure it's valid and issued
// by Auth0.

// 8. User Creation in the Backend
// If the access token is valid, your backend server proceeds to create the
// new user in the database or perform any necessary authentication or authorization
// steps.

// 9. Redirect Back to Original Route
// After the user creation process is complete, your backend server sends a
// response indicating success. The AuthCallback page then redirects the user back
// to the original route they were trying to access.

// 10. Display Success or Handle Errors
// Depending on the response from the backend, you can display a success
// message to the user or handle any errors that occurred during the user creation
// process.
