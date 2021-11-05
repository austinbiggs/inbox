import * as React from "react";

import { State } from "./types";

const initialState: State = {
  id: null,
};

export const AdminContext = React.createContext(initialState);
