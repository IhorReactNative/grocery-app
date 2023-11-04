import React from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { EntityProps } from '../types';
import { StatusLabel } from './StatusLabel';
import { PrioritySlider } from './PrioritySlider';
import { Divider, Switch } from '../../../components';

type Keys = keyof EntityProps;

interface Props extends EntityProps {
  isNameError: boolean;
  onChange: (field: Keys, value: EntityProps[Keys]) => void;
  onAdd: () => void;
  saving: boolean;
}

export const EntityEditing: React.FC<Props> = ({ onChange, inStock, priority, name, onAdd, isNameError, saving }) => {
  const onChangeName = (value: string) => onChange('name', value);
  const onToggleStock = () => {
    onChange('inStock', !inStock);
  };

  const onChangePriority = (value: number) => onChange('priority', value);

  return (
    <View>
      <View>
        <Text style={[styles.fieldLabel, styles.errorMessage]}>{isNameError ? 'Item name must be filled' : ''}</Text>
        <TextInput
          autoCorrect={false}
          value={name}
          onChangeText={onChangeName}
          placeholder="Entity name"
          style={styles.input}
        />
      </View>

      <Divider />

      <View>
        <Text style={styles.fieldLabel}>Priority: {priority}</Text>
        <PrioritySlider onChange={onChangePriority} defaultValue={5} maxValue={5} minValue={1} />
      </View>

      <Divider />

      <View>
        <View style={styles.row}>
          <Text style={styles.fieldLabel}>Availability: </Text>
          <StatusLabel inStock={inStock} />
        </View>
        <Switch onValueChange={onToggleStock} value={inStock} style={styles.switch} />
      </View>

      <Divider />

      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} disabled={saving} onPress={onAdd}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldLabel: {
    fontSize: 14,
  },
  switch: {
    marginTop: 5,
  },
  addButtonContainer: {
    alignItems: 'flex-end',
  },
  addButton: {
    backgroundColor: '#29c953',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorMessage: {
    color: '#ff1521',
  },
});
