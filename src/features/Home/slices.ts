import { createSlice, SliceCaseReducers, isAnyOf } from '@reduxjs/toolkit';
import { HomeState } from './types';
import {
  addNewEntityItem,
  getEntityById,
  refreshEntitiesList,
  removeEntityItem,
  resetAddNewEntityState,
  resetRemoveEntityState,
  updateEntityItem,
} from './actions';

const initialState: HomeState = {
  entities: {
    loading: false,
    data: [],
  },
  entity: {
    adding: false,
    added: false,
    removed: false,
    removing: false,
    history: [],
    data: undefined,
    dataLoading: false,
  },
};

const { reducer: homeStore } = createSlice<HomeState, SliceCaseReducers<HomeState>, 'home'>({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // SYNC
    builder.addCase(resetAddNewEntityState, (state) => {
      state.entity.adding = false;
      state.entity.added = false;
    });

    builder.addCase(resetRemoveEntityState, (state) => {
      state.entity.removed = false;
      state.entity.removing = false;
    });

    // ASYNC
    builder.addCase(refreshEntitiesList.pending, (state) => {
      state.entities.loading = true;
    });
    builder.addCase(refreshEntitiesList.fulfilled, (state) => {
      state.entities.loading = false;
    });
    builder.addCase(refreshEntitiesList.rejected, (state) => {
      state.entities.loading = false;
    });

    builder.addCase(addNewEntityItem.pending, (state) => {
      state.entity.adding = true;
      state.entity.added = false;
    });
    builder.addCase(addNewEntityItem.fulfilled, (state) => {
      state.entity.adding = false;
      state.entity.added = true;
    });
    builder.addCase(addNewEntityItem.rejected, (state) => {
      state.entity.adding = false;
    });

    builder.addCase(removeEntityItem.pending, (state) => {
      state.entity.removing = true;
      state.entity.removed = false;
    });
    builder.addCase(removeEntityItem.fulfilled, (state) => {
      state.entity.removing = false;
      state.entity.removed = true;
    });
    builder.addCase(removeEntityItem.rejected, (state) => {
      state.entity.removing = false;
      state.entity.removed = false;
    });

    builder.addCase(getEntityById.pending, (state) => {
      state.entity.dataLoading = true;
    });
    builder.addCase(getEntityById.fulfilled, (state, action) => {
      state.entity.dataLoading = false;
      state.entity.data = action.payload.entity;
      state.entity.history = action.payload.history;
    });
    builder.addCase(getEntityById.rejected, (state) => {
      state.entity.dataLoading = false;
      state.entity.data = undefined;
      state.entity.history = [];
    });

    builder.addMatcher(
      isAnyOf(
        refreshEntitiesList.fulfilled,
        addNewEntityItem.fulfilled,
        updateEntityItem.fulfilled,
        removeEntityItem.fulfilled
      ),
      (state, action) => {
        state.entities.data = action.payload;
      }
    );
  },
});

export default homeStore;
