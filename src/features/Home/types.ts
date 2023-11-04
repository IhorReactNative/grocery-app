export enum ENTITY_STATUS {
  runOut = 'run out',
  have = 'have',
}

export interface EntityProps {
  id: string;
  updatedAt?: string;
  inStock: boolean;
  status: ENTITY_STATUS;
  priority: number;
  name: string;
}

export interface EntityUpdateProps extends Omit<EntityProps, 'name' | 'priority'> {
  priority?: number;
}

export type NavigateToEntityProps = {
  id: string;
  name: string;
};

export interface EntityHistoryProps {
  id: string;
  updatedAt: string;
  changes: Array<[string, any, any]>;
}

export interface HomeState {
  entities: {
    loading: boolean;
    data: EntityProps[];
  };
  entity: {
    adding: boolean;
    added: boolean;
    removing: boolean;
    removed: boolean;
    history: EntityHistoryProps[];
    data?: EntityProps;
    dataLoading: boolean;
  };
}
