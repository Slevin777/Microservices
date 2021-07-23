import { observer } from "mobx-react-lite";
import { useState } from "react";
import SessionStore from "../../store/sessionStore";
import Account from "./Account";
import Login from "./Login";

const AccountDetails = observer(() => {
  const [session] = useState(SessionStore);

  if (session?.currentSession?.user)
    return <Account session={session?.currentSession} />;

  return <Login />;
});

export default AccountDetails;
