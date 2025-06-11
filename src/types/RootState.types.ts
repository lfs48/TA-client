import sessionReducer from '@/reducers/session.reducer';
import entitiesReducer from 'reducers/entities/entities.reducer';

export interface RootState {
  entities: ReturnType<typeof entitiesReducer>,
  session: ReturnType<typeof sessionReducer>,
}
