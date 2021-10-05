import { Switch, Route, NavLink } from "react-router-dom";
import styled from "@emotion/styled";

import { HomePage } from "./pages/HomePage.jsx";
import { TestPage } from "./pages/TestPage.jsx";

const StyledNavLink = styled(NavLink)`
  color: red;
  margin: 0 10px;
`;

function App() {
  return (
    <>
      <nav>
        <StyledNavLink to="/">Home</StyledNavLink>
        <StyledNavLink to="/movies">Movies</StyledNavLink>
      </nav>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/movies">
          <TestPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
