import { createSlice } from "@reduxjs/toolkit";
import { Requisition, RootState } from "@/types";
import { logout } from "@/reducers/session.reducer";
import { createAppSelector } from "@/util/appSelector";
import competenciesApi from "@/api/competencies.api";
import arcsApi from "@/api/arcs.api";

interface RequisitionsState {
  [id: string]: Requisition;
}

const requisitionsSlice = createSlice({
  name: "requisitions",
  initialState: {} as RequisitionsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.type, () => ({}))
      .addMatcher(competenciesApi.endpoints.getCompetencies.matchFulfilled, (state, action) => {
        const { competencies } = action.payload;
        competencies.forEach((competency) => {
          if (competency.requisition) {
            state[competency.requisition.id] = competency.requisition;
          }
        });
      })
      .addMatcher(arcsApi.endpoints.getARCs.matchFulfilled, (state, action) => {
        const { competencies } = action.payload;
        competencies.forEach((competency) => {
          if (competency.requisition) {
            state[competency.requisition.id] = competency.requisition;
          }
        });
      });
  }
});

// Selectors
export const selectRequisitionById = createAppSelector(
  [
    (state: RootState) => state.entities.requisitions,
    (_: RootState, id?: string) => id,
  ],
  (requisitions, id) => (id ? requisitions[id] : undefined)
);

export const selectRequisitionsByIds = createAppSelector(
  [
    (state: RootState) => state.entities.requisitions,
    (_: RootState, ids?: string[]) => ids,
  ],
  (requisitions, ids) =>
    ids ? ids.map((id) => requisitions[id]).filter((requisition) => requisition !== undefined) : []
);

export default requisitionsSlice.reducer;