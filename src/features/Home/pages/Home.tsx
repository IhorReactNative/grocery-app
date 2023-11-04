import React, { useEffect, useMemo, useState } from 'react';
import { View, FlatList, ListRenderItem, RefreshControl, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { VIEW_ENTRY_ROUTE } from '../../App/navigation/constants';
import { useAppDispatch, useAppSelector } from '../../App/redux';
import { ENTITY_STATUS, EntityProps, EntityUpdateProps, NavigateToEntityProps } from '../types';
import { selectAddNewEntityState, selectRefreshEntities } from '../selectors';
import {
  addNewEntityItem,
  refreshEntitiesList,
  removeEntityItem,
  resetAddNewEntityState,
  updateEntityItem,
} from '../actions';
import { EntityPreview, EmptyList } from '../components';
import { Divider, ModalWindow } from '../../../components';
import { ModalAddNewEntity } from '../modals';

type FilterState = ENTITY_STATUS | 'all';

const FILTERS_OPTIONS: FilterState[] = ['all', ...Object.values(ENTITY_STATUS)];

export const Home = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const entities = useAppSelector(selectRefreshEntities);
  const addNewEnityState = useAppSelector(selectAddNewEntityState);
  const [modalAddNewEntityVisible, setModalAddNewEntityVisible] = useState(false);
  const [appliedFilter, setAppliedFilter] = useState<FilterState>('all');

  useEffect(() => {
    if (addNewEnityState.added) {
      dispatch(resetAddNewEntityState());
      onHideAddNewEntityModal();
    }
  }, [addNewEnityState]);

  useEffect(() => {
    if (addNewEnityState.added) {
      dispatch(resetAddNewEntityState());
      onHideAddNewEntityModal();
    }
  }, [addNewEnityState]);

  const onRefresh = () => dispatch(refreshEntitiesList());

  useEffect(() => {
    onRefresh();
  }, []);

  // @ts-ignore
  const navigateToEntity = (props: NavigateToEntityProps) => {
    if (props.name && props.id) {
      // @ts-ignore
      navigation.navigate(VIEW_ENTRY_ROUTE, { id: props.id, itemName: props.name });
    }
  };

  const addNewEntity = (props: EntityProps) => {
    dispatch(addNewEntityItem(props));
    onHideAddNewEntityModal();
  };

  const toggleAvailability = (props: EntityUpdateProps) => dispatch(updateEntityItem(props));

  const removeItem = (id: string) => dispatch(removeEntityItem({ id }));

  const renderItem: ListRenderItem<EntityProps> = ({ item }) => (
    <EntityPreview
      {...item}
      onNavigate={navigateToEntity}
      onToggleAvailability={toggleAvailability}
      onRemoveItem={removeItem}
    />
  );

  const onHideAddNewEntityModal = () => setModalAddNewEntityVisible(false);
  const onShowAddNewEntityModal = () => setModalAddNewEntityVisible(true);

  const onApplyFilter = (option: FilterState) => setAppliedFilter(option);

  const entitiesList = useMemo(
    () => entities.data.filter((entity) => (appliedFilter !== 'all' ? entity.status === appliedFilter : true)),
    [entities.data, appliedFilter]
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.addButton} onPress={onShowAddNewEntityModal}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        <View style={styles.filtersContainer}>
          {FILTERS_OPTIONS.map((option, idx, array) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.filterButton,
                idx === 0 && styles.filterButtonFirst,
                idx === array.length - 1 && styles.filterButtonLast,
                option === appliedFilter && styles.filterButtonSelected,
              ]}
              onPress={() => onApplyFilter(option)}
            >
              <Text>{option.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Divider color={'#29c953'} marginBottom={20} marginTop={0} />

      <FlatList
        refreshControl={<RefreshControl refreshing={entities.loading} onRefresh={onRefresh} />}
        data={entitiesList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<EmptyList />}
        keyboardShouldPersistTaps="handled"
        ItemSeparatorComponent={() => <Divider />}
      />

      <ModalWindow
        onClose={onHideAddNewEntityModal}
        visible={modalAddNewEntityVisible}
        content={<ModalAddNewEntity action={addNewEntity} saving={addNewEnityState.adding} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#29c953',
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    padding: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#dedede',
    backgroundColor: '#dedede',
    borderRightColor: '#fff',
  },
  filterButtonSelected: {
    backgroundColor: '#fff',
  },
  filterButtonFirst: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  filterButtonLast: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderRightColor: '#dedede',
  },
});
