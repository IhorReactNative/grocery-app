import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, ImageProps, Image, StyleSheet } from 'react-native';

interface Props {
  icon: ImageProps;
  button: TouchableOpacityProps;
}

export const HeaderNavigationButton: React.FC<Props> = ({ icon, button }) => (
  <TouchableOpacity style={styles.container} {...button}>
    <Image resizeMode="contain" style={styles.image} {...icon} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    padding: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
