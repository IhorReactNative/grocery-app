import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { EntityHistoryProps, EntityProps, EntityUpdateProps } from './types';
import { EntitiesService } from './utils';
import moment from 'moment';
import { CompareUtils } from '../../utils';
import { RootState } from '../App/redux';
import { selectAllEntities } from './selectors';

export const resetAddNewEntityState = createAction('home/RESET_NEW_ENTITY_STATE');
export const resetRemoveEntityState = createAction('home/RESET_REMOVE_ENTITY_STATE');

export const refreshEntitiesList = createAsyncThunk<EntityProps[], void>('home/REFRESH_ENTITES_LIST', async () => {
  return await EntitiesService.getAllEntities();
});

export const addNewEntityItem = createAsyncThunk<EntityProps[], EntityProps>('home/ADD_NEW_ENTITY', async (props) => {
  const updatedAt = moment().toISOString();
  const list = await EntitiesService.setEntity({ ...props, updatedAt });
  await EntitiesService.setEntityHistory({
    id: props.id,
    updatedAt,
    changes: [
      ['inStock', false, true],
      ['status', 'N/A', props.status],
      ['priority', 'N/A', props.priority],
    ],
  });
  return list;
});

export const updateEntityItem = createAsyncThunk<
  EntityProps[],
  {
    updateEntityView?: boolean;
  } & EntityUpdateProps
>('home/UPDATE_ENTITY', async ({ updateEntityView, ...props }, { dispatch, getState }) => {
  const updatedAt = moment().toISOString();
  const oldEntityState = selectAllEntities(getState() as RootState).find((item) => item.id === props.id);
  console.log('=== OLD', oldEntityState);
  console.log('=== NEW', props);
  // @ts-ignore
  const fieldsToUpdate = CompareUtils.getChangedFieldsAndValue(
    { priority: oldEntityState?.priority, inStock: oldEntityState?.inStock, status: oldEntityState?.status },
    { priority: props?.priority || oldEntityState?.priority, inStock: props?.inStock, status: props?.status }
  );

  const payload = { ...props, updatedAt };
  const list = await EntitiesService.updateEntity(payload);
  await EntitiesService.setEntityHistory({
    id: props.id,
    updatedAt,
    changes: fieldsToUpdate,
  });

  if (updateEntityView) {
    dispatch(getEntityById({ id: props.id }));
  }

  return list;
});

export const removeEntityItem = createAsyncThunk<
  EntityProps[],
  {
    id: string;
    updateEntityView?: boolean;
  }
>('home/REMOVE_ENTITY', async ({ id, updateEntityView }, { dispatch }) => {
  const list = await EntitiesService.removeEntity(id);
  await EntitiesService.removeAllEntityHistory(id);

  if (updateEntityView) {
    dispatch(getEntityById({ id }));
  }

  return list;
});

export const getEntityById = createAsyncThunk<
  {
    entity: EntityProps;
    history: EntityHistoryProps[];
  },
  {
    id: string;
  }
>('home/GET_ENTITY_BY_ID', async ({ id }, { rejectWithValue }) => {
  const data = await EntitiesService.getEntityById(id);

  if (data) {
    return data;
  }

  return rejectWithValue(false);
});
