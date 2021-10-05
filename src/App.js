import { Switch, Route, NavLink } from "react-router-dom";
import styled from "@emotion/styled";

import HomePage from "./pages/HomePage.jsx";
import { TestPage } from "./pages/TestPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";

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
        <Route path="/movies" exact>
          <TestPage />
        </Route>
        <Route path="/movies/:filmId">
          <MovieDetails />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
