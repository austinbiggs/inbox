import * as React from "react";

import { AppContext } from "./context";
import { ContextHook, State } from "./types";

export const useAppContext: ContextHook = () =>
  React.useContext<State>(AppContext);
