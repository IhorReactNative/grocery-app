import React from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { StyleSheet } from 'react-native';

interface Props {
  defaultValue: number;
  minValue: number;
  maxValue: number;
  onChange: (value: number) => void;
}

export const PrioritySlider: React.FC<Props> = ({ defaultValue, minValue, maxValue, onChange }) => {
  const onChangeSlider = (values: number[]) => {
    const [value] = values;
    onChange(value);
  };

  return (
    <MultiSlider
      selectedStyle={styles.selectedBg}
      unselectedStyle={styles.defaultBg}
      values={[defaultValue]}
      containerStyle={styles.container}
      trackStyle={styles.trackStyle}
      touchDimensions={styles.touchDimesions}
      sliderLength={280}
      step={1}
      min={minValue}
      max={maxValue}
      onValuesChange={onChangeSlider}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
  },
  trackStyle: {
    height: 10,
    backgroundColor: 'red',
  },
  touchDimesions: {
    height: 40,
    width: 40,
    borderRadius: 20,
    slipDisplacement: 40,
  },
  defaultBg: {
    backgroundColor: '#dedede',
  },
  selectedBg: {
    backgroundColor: '#29c953',
  },
});
