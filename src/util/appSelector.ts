import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@/types";

export const createAppSelector = createSelector.withTypes<RootState>()