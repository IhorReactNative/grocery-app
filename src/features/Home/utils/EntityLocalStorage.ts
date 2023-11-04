import AsyncStorage, { AsyncStorageStatic } from '@react-native-async-storage/async-storage';
import { EntityHistoryProps, EntityProps, EntityUpdateProps } from '../types';

export class EntitiesLocalStorage {
  private ENTITIES_KEY = 'ENTITIES_KEY';
  private ENTITY_HISTORY_KEY = 'ENTITY_HISTORY_KEY';

  constructor(public storageService: AsyncStorageStatic) {}

  private _saveEntitiesToStore = async (data: EntityProps[] = []) =>
    await this.storageService.setItem(this.ENTITIES_KEY, JSON.stringify(data));

  public getAllEntities = async (): Promise<EntityProps[]> => {
    const data = await this.storageService.getItem(this.ENTITIES_KEY);
    if (!data) {
      return [];
    }

    return JSON.parse(data);
  };

  public getEntityById = async (
    id: string
  ): Promise<
    | {
        entity: EntityProps;
        history: EntityHistoryProps[];
      }
    | undefined
  > => {
    const data = await this.storageService.getItem(this.ENTITIES_KEY);
    if (!data) {
      return undefined;
    }

    const list = JSON.parse(data) as EntityProps[];

    const entity = list.find((entity) => entity.id === id);

    if (!entity) return undefined;

    const history = await this.getAllEntityHistory(entity.id);

    return { entity, history };
  };

  public setEntity = async (entity: EntityProps): Promise<EntityProps[]> => {
    const data = await this.getAllEntities();
    data.push(entity);
    await this._saveEntitiesToStore(data);
    return data;
  };

  public updateEntity = async (newEntity: EntityUpdateProps): Promise<EntityProps[]> => {
    const data = await this.getAllEntities();

    const updatedArr = data.map((entity) => {
      if (entity.id === newEntity.id) {
        return { ...entity, ...newEntity };
      } else {
        return entity;
      }
    });

    await this._saveEntitiesToStore(updatedArr);
    return updatedArr;
  };

  public removeEntity = async (id: string): Promise<EntityProps[]> => {
    const data = await this.getAllEntities();
    const updatedArr = data.filter((entity) => entity.id !== id);
    await this._saveEntitiesToStore(updatedArr);
    return updatedArr;
  };

  public getAllEntityHistory = async (id: string): Promise<EntityHistoryProps[]> => {
    const data = await this.storageService.getItem(this.ENTITY_HISTORY_KEY);
    if (!data) return [];

    const entityRecords = JSON.parse(data)[id];
    if (!entityRecords) return [];

    return entityRecords;
  };

  public setEntityHistory = async (history: EntityHistoryProps): Promise<EntityHistoryProps[]> => {
    const data = await this.storageService.getItem(this.ENTITY_HISTORY_KEY);
    const parsedData = data ? JSON.parse(data) : {};

    let payload: Record<string, EntityHistoryProps[]>;

    if (parsedData[history.id]) {
      payload = {
        [history.id]: [...parsedData[history.id], history],
      };
    } else {
      payload = {
        [history.id]: [history],
      };
    }

    await this.storageService.setItem(this.ENTITY_HISTORY_KEY, JSON.stringify({ ...parsedData, ...payload }));
    return payload[history.id];
  };

  public removeAllEntityHistory = async (id: string): Promise<void> => {
    const data = await this.storageService.getItem(this.ENTITY_HISTORY_KEY);
    if (!data) return;

    const entityRecords = JSON.parse(data);

    if (entityRecords[id]) {
      delete entityRecords[id];
    }

    await this.storageService.setItem(this.ENTITY_HISTORY_KEY, JSON.stringify(entityRecords));
    return;
  };
}

export const EntitiesService = new EntitiesLocalStorage(AsyncStorage);
