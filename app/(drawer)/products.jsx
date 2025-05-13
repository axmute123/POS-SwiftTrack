import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Modal, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FAB } from 'react-native-paper';

function Products() {
  const [modalVisible, setModalVisible] = useState(false);
  const [product, setProduct] = useState([]);
  const [price, setPrice] = useState([]);
  const [addons, setAddons ] = useState([]);
  const [bundle, setBundle ] = useState([]);
  const [size, setSizes] = useState([]);

  const handleAddProduct = () => {
  
  };

  const handlePrice = () => {

  };

  const handleAddons = () => {

  };

  const handleBundle = () => {

  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Product</Text>


      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>Enter Product Details</Text>

              <TextInput
                style={styles.input}
                placeholder="Product Name"
                value={product}
                onChangeText={setProduct}
              />
              <TextInput
                style={styles.input}
                placeholder="Product Price"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
              />

                <View style={{margin:5, width: "100%"}}>
                     <Button title="Add Product" onPress={handleAddProduct} />
                </View>
                <View style={{margin:5, width: "100%"}}>
                      <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
                </View>

             
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

     
      <FAB
        style={styles.fab}
     
        icon="plus"
        onPress={() => setModalVisible(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6200ea',
  },
  modalOverlay: {
    flex: 1,
    width:"100%", 
    backgroundColor: 'rgba(0,0,0,0.4)',  
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  modalHeader: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    borderRadius: 5,
  },
});

export default Products;
