import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomModal = ({ visible, onClose, title, children }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>        
          <Text style={styles.errHeader}>An error has occurred</Text>         
          {title ? <Text style={styles.title}>{title}</Text> : null}    
          <View>{children}</View>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

 const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    elevation: 5,
  },
  errHeader: {
    fontSize: 16,
    textAlign:'center',
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 6,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CustomModal;
