import styled from 'styled-components';
import Login from './components/Login';

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

function App() {
  return (
    <Wrapper>
      <Container>
        <Content>Content</Content>
        <SideBar>
          <Login />
        </SideBar>
      </Container>
    </Wrapper>
  );
}

export default App;
