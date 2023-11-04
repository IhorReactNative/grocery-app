import React, { ReactNode } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  content?: ReactNode;
}

export const ModalWindow: React.FC<Props> = ({ visible, onClose, content }) => (
  <Modal animationType="fade" transparent={true} visible={visible}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <TouchableOpacity style={styles.closeButtonContainer} onPress={onClose}>
          <Text style={styles.closeButtonIcon}>+</Text>
        </TouchableOpacity>
        {content}
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButtonContainer: {
    position: 'absolute',
    right: 10,
    top: 5,
  },
  closeButtonIcon: {
    transform: [{ rotate: '45deg' }],
    fontSize: 30,
    fontWeight: 'bold',
  },
});
