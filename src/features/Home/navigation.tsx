import { HOME_ROUTE, VIEW_ENTRY_ROUTE } from '../App/navigation/constants';
import { Home, EntryView } from './pages';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationHeaderGoBack } from '../App/components';

export const HomeRoutes = [
  {
    name: HOME_ROUTE,
    component: Home,
    options: () => ({
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      title: 'Grocery list',
    }),
  },
  {
    name: VIEW_ENTRY_ROUTE,
    component: EntryView,
    options: (props: any) => {
      const { itemName = '' } = props.route?.params || {};
      return {
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        title: `Item: ${itemName}`,
        headerLeft: () => <NavigationHeaderGoBack />,
      };
    },
  },
];
