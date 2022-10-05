import styled from 'styled-components';

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .logo {
    width: 50px;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -1rem;
  }
  .grid {
    grid-column: 1;
    grid-row: 1 / 3;
  }

  h2 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }

  .main-img {
    display: none;

  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;
export default Wrapper;
