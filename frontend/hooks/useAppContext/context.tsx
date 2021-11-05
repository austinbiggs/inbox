import * as React from "react";

import { State } from "./types";

const initialState: State = {
  id: null,
};

const AppContext = React.createContext(initialState);

export { AppContext };
