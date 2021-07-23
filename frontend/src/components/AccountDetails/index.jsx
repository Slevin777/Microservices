import { observer } from "mobx-react-lite";
import { useState } from "react";
import SessionStore from "../../store/sessionStore";
import Account from "./Account";
import Login from "./Login";
import SignUp from "./SignUp";

const AccountDetails = observer(() => {
  const [session] = useState(SessionStore);
  const [isSigningUp, setIsSigningUp] = useState(false);

  if (session?.currentSession?.user)
    return <Account session={session?.currentSession} />;

  return isSigningUp ? (
    <SignUp onLogin={() => setIsSigningUp(false)} />
  ) : (
    <Login onSignUp={() => setIsSigningUp(true)} />
  );
});

export default AccountDetails;
