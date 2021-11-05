import * as React from "react";

import { AdminContext } from "./context";
import { ContextHook, State } from "./types";

export const useAdminContext: ContextHook = () =>
  React.useContext<State>(AdminContext);
