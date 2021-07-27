import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { GET_SESSION } from "./gql/queries";
import SessionStore from "./store/sessionStore";

import AccountDetails from "./components/AccountDetails";
import Listings from "./components/Listings";

const Wrapper = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 1rem;
`;

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  width: 80rem;
`;
const Content = styled.div`
  flex: 1;
  margin-right: 1rem;
`;

const SideBar = styled.div`
  flex: 0 auto;
  width: 10rem;
`;

const App = () => {
  const [initialized, setInitialized] = useState(false);

  const { loading, error, data } = useQuery(GET_SESSION);

  useEffect(() => {
    if (data?.userSession) {
      SessionStore.setSession(data.userSession);
      setInitialized(true);
    }
  }, [data]);

  if (loading) return "loading";

  return (
    <Wrapper>
      <Container>
        <Content>
          <Listings />
        </Content>
        <SideBar>
          <AccountDetails />
        </SideBar>
      </Container>
    </Wrapper>
  );
};

export default App;
