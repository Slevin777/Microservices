import { useMutation } from "@apollo/client";
import styled from "styled-components";
import { LOGOUT } from "../../../gql/mutations";
import SessionStore from "../../../store/sessionStore";

const Wrapper = styled.div`
  color: ${(props) => props.theme.mortar};
  font-size: 0.9rem;
`;

const Email = styled.div`
  color: ${(props) => props.theme.nero};
  font-size: 1rem;
  margin-top: 0.25rem;
`;

const LogoutButton = styled.button`
  color: blue;
  display: block;
  margin-top: 0.25rem;
`;

const Account = ({ session }) => {
  const [deleteUserSessoin] = useMutation(LOGOUT);

  const handleLogout = async (e) => {
    e.preventDefault();

    deleteUserSessoin({ variables: { sessionId: session?.id } });
    SessionStore.clearSession();
  };
  return (
    <Wrapper>
      Logged in as <Email>{session?.user?.email}</Email>
      <LogoutButton onClick={handleLogout}>Log out</LogoutButton>
    </Wrapper>
  );
};

export default Account;
