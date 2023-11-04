import { VIEW_ENTRY_ROUTE, HOME_ROUTE } from './constants';

export type RootPropsList = {
  [HOME_ROUTE]: undefined;
  [VIEW_ENTRY_ROUTE]: { id: string; itemName: string };
};
