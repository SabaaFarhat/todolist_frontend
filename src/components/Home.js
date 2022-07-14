import styled from 'styled-components';

function Home() {
  return (
      <WelcomWrapper>
        <h1>welcome</h1>
      </WelcomWrapper>
  );
}

const WelcomWrapper = styled.div`
  text-align: center;
  display: flex;
`;

export default Home;
