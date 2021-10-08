import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation.jsx";
// import HomePage from './pages/HomePage.jsx'
// import SearchPage from './pages/SearchPage.jsx'
// import NotFoundPage from './pages/NotFoundPage.jsx'
// import MovieDetails from './pages/MovieDetails.jsx'

const HomePage = lazy(() =>
  import("./pages/HomePage.jsx" /* webpackChunkName: "home-page" */)
);
const SearchPage = lazy(() =>
  import("./pages/SearchPage.jsx" /* webpackChunkName: "search-page" */)
);
const MovieDetails = lazy(() =>
  import("./pages/MovieDetails.jsx" /* webpackChunkName: "movie-details" */)
);

function App() {
  return (
    <>
      <header>
        <Navigation />
        <hr />
      </header>
      <Suspense fallback={<h1>LOADING...</h1>}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <SearchPage />
          </Route>
          <Route path="/movies/:filmId">
            <MovieDetails />
          </Route>
          <Route>
            {/* <NotFoundPage /> */}
            <HomePage />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
