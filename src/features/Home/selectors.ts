import { RootState } from '../App/redux';
import { createSelector } from '@reduxjs/toolkit';
import { orderBy, sortBy } from 'lodash';

export const selectAllEntities = createSelector(
  (state: RootState) => state.home,
  (state) => state.entities.data
);

export const selectRefreshEntities = createSelector(
  (state: RootState) => state.home,
  (state) => ({ loading: state.entities.loading, data: sortBy(state.entities.data, ['priority', 'name']) })
);

export const selectAddNewEntityState = createSelector(
  (state: RootState) => state.home,
  (state) => ({
    added: state.entity.added,
    adding: state.entity.adding,
  })
);

export const selectRemoveEntityState = createSelector(
  (state: RootState) => state.home,
  (state) => ({
    removed: state.entity.removed,
    removing: state.entity.removing,
  })
);

export const selectEntityView = createSelector(
  (state: RootState) => state.home,
  (state) => ({
    loading: state.entity.dataLoading,
    entity: state.entity.data,
    history: orderBy(state.entity.history, [(o) => new Date(o.updatedAt)], ['desc']),
  })
);
