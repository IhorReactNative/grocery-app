import React, { Fragment, useEffect } from 'react';
import { Text, View, FlatList, ListRenderItem, StyleSheet } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Divider, Paragraph } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../App/redux';
import { getEntityById, removeEntityItem, resetRemoveEntityState, updateEntityItem } from '../actions';
import { RootPropsList } from '../../App/navigation/types';
import { VIEW_ENTRY_ROUTE } from '../../App/navigation/constants';
import { selectEntityView, selectRemoveEntityState } from '../selectors';
import { EntityHistoryProps, EntityUpdateProps } from '../types';
import { EntityPreview } from '../components';
import { PrioritySlider } from '../components/PrioritySlider';
import moment from 'moment';

export const EntryView: React.FC = () => {
  const navigation = useNavigation();

  const route = useRoute<RouteProp<RootPropsList, typeof VIEW_ENTRY_ROUTE>>();
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectEntityView);
  const removeEntityState = useAppSelector(selectRemoveEntityState);

  useEffect(() => {
    if (route?.params?.id) {
      dispatch(getEntityById({ id: route.params.id }));
    }
  }, []);

  useEffect(() => {
    if (removeEntityState.removed && !data.entity) {
      dispatch(resetRemoveEntityState());
      navigation.goBack();
    }
  }, [removeEntityState]);

  const renderItem: ListRenderItem<EntityHistoryProps> = ({ item }) => (
    <View style={styles.block}>
      {item?.changes &&
        item.changes.map(([fieldName, stateBefore, stateAfter], idx) => (
          <View style={styles.row} key={`${fieldName}_${idx}`}>
            <Text style={styles.historyText}>{fieldName} changed state from</Text>
            <Text style={[styles.bold, styles.historyText]}> {String(stateBefore)} </Text>
            <Text style={styles.historyText}>to</Text>
            <Text style={[styles.bold, styles.historyText]}> {String(stateAfter)} </Text>
          </View>
        ))}
      <Divider />
      <Text style={styles.italic}>{moment(item.updatedAt).format('YYYY/MM/DD HH:mm:ss')}</Text>
    </View>
  );

  const toggleAvailability = (props: EntityUpdateProps) =>
    dispatch(updateEntityItem({ ...props, updateEntityView: true }));

  const onChangePriority = (value: number) => {
    if (data.entity) {
      dispatch(updateEntityItem({ ...data.entity, priority: value, updateEntityView: true }));
    }
  };

  const removeItem = (id: string) => dispatch(removeEntityItem({ id, updateEntityView: true }));

  if (!data.entity) {
    return null;
  }

  return (
    <FlatList
      ListHeaderComponent={
        <Fragment>
          <EntityPreview
            status={data.entity.status}
            id={data.entity.id}
            onToggleAvailability={toggleAvailability}
            onRemoveItem={removeItem}
            inStock={data.entity.inStock}
            name={data.entity.name}
            updatedAt={data.entity.updatedAt}
          />

          <View style={styles.block}>
            <Paragraph>Priority: {data.entity.priority}</Paragraph>
            <PrioritySlider onChange={onChangePriority} defaultValue={data.entity.priority} maxValue={5} minValue={1} />
          </View>
        </Fragment>
      }
      data={data.history}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      keyExtractor={(item) => item.updatedAt}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 50,
  },
  block: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  historyText: {
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
});
