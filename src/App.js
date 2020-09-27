import React from "react";
import Pokedex from "./Pokedex";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import Pokemon from "./Pokemon";

function App() {
  return (
    <Switch>
      <Route
        path="/"
        component={Pokedex}
        render={(props) => <Pokedex {...props} />}
      />
      <Route
        path="/:pokemonId"
        component={Pokemon}
        render={(props) => <Pokemon {...props} />}
      />
    </Switch>
  );
}

export default App;
