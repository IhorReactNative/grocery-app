import React from 'react';
import { StyleSheet, TouchableOpacity, View, TouchableWithoutFeedback, Text } from 'react-native';
import { ENTITY_STATUS, EntityProps, EntityUpdateProps, NavigateToEntityProps } from '../types';
import { Divider, Paragraph, Switch, Title } from '../../../components';
import moment from 'moment';
import { StatusLabel } from './StatusLabel';

interface Props extends Omit<EntityProps, 'priority'> {
  onNavigate?: (data: NavigateToEntityProps) => void;
  onToggleAvailability: (data: EntityUpdateProps) => void;
  onRemoveItem: (id: string) => void;
  priority?: number;
}

export const EntityPreview: React.FC<Props> = (props) => {
  const { id, name, status, inStock, updatedAt, priority, onToggleAvailability, onNavigate, onRemoveItem } = props;

  const handleNavigate = () => onNavigate && onNavigate({ id, name });

  const handleRemove = () => onRemoveItem(id);

  const handleToggleAvailability = () => {
    const nextToggleState = !inStock;
    onToggleAvailability({
      id,
      inStock: nextToggleState,
      status: nextToggleState ? ENTITY_STATUS.have : ENTITY_STATUS.runOut,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity disabled={!onNavigate} onPress={handleNavigate}>
        <View style={styles.row}>
          <Title>{name}</Title>
          <StatusLabel inStock={inStock} />
        </View>
        {updatedAt ? (
          <Paragraph style={styles.text}>{moment(updatedAt).format('YYYY/MM/DD HH:mm:ss')}</Paragraph>
        ) : null}
      </TouchableOpacity>

      <Divider />
      <View style={styles.row}>
        <TouchableWithoutFeedback style={styles.button} onPress={handleToggleAvailability}>
          <Switch value={inStock} />
        </TouchableWithoutFeedback>
        <TouchableOpacity style={[styles.button, styles.buttonRemove]} onPress={handleRemove}>
          <Text style={styles.buttonRemoveText}>REMOVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
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
  text: {
    fontStyle: 'italic',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'tomato',
  },
  buttonRemove: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'tomato',
    borderRadius: 8,
  },
  buttonRemoveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
