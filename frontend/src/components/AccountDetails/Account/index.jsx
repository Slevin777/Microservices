import styled from "styled-components";

const Wrapper = styled.div`
  color: ${(props) => props.theme.mortar};
  font-size: 0.9rem;
`;

const Email = styled.div`
  color: ${(props) => props.theme.nero};
  font-size: 1rem;
  margin-top: 0.25rem;
`;

const Account = ({ user }) => {
  return (
    <Wrapper>
      Logged in as <Email>{user?.email}</Email>
    </Wrapper>
  );
};

export default Account;
