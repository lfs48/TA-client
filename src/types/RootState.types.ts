import SessionReducer from '@/reducers/session.reducer';

export interface RootState {
  session: ReturnType<typeof SessionReducer>,
}
