import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
};

const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  // we are using pathname so know which url path the user is in so that we 
  // redirect the user back to the same pathname after logging in
  const { pathname } = useLocation();

  // we are getting the currentUser from auth0
  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} className="bg-orange-500 flex-1">
        Log in to check out
      </Button>
    );
  }

  if (isAuthLoading || !currentUser || isLoading) {
    return <LoadingButton />;
  }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={disabled} className="bg-orange-500 flex-1">
                Go to checkout
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
                <UserProfileForm
                currentUser={currentUser}
                onSave={onCheckout}
                isLoading={isGetUserLoading}
                title="Confirm Deliery Details"
                buttonText="Continue to payment"
                />
            </DialogContent>
        </Dialog>
    );
};

export default CheckoutButton;


// dialog is basically a modal in react
// trigger is what triggers the dialog

// to get the currentUser we simply use the getUser api to get the current user by 
// using the jwt token sent by auth0 which is then decrypted and we use it to get 
// the current user based on the id