import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, Image, ScrollView, ActivityIndicator, Modal, } from 'react-native';
import { retrieveProducts, destroyProducts } from '../../API/product';
import { router } from 'expo-router';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await retrieveProducts();
        console.log('Fetched products:', JSON.stringify(response.data, null, 2));
        setProducts(response.data);
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDestroyProduct = async (productId) => {
    try {
      await destroyProducts(productId);
      setProducts((prev) => prev.filter((item) => item.id !== productId));
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  const openActionModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navContainer}>
        <Pressable style={styles.item} onPress={() => router.push('../../pages/add_category')}>
          <Text>Category</Text>
        </Pressable>
        <Pressable style={styles.item} onPress={() => router.push('../../pages/add_bundles')}>
          <Text>Bundles</Text>
        </Pressable>
      </View>
      <View style={styles.navContainer}>
        <Pressable style={styles.item} onPress={() => router.push('../../pages/add_addons')}>
          <Text>Add-Ons</Text>
        </Pressable>
        <Pressable style={styles.item} onPress={() => router.push('../../pages/add_sizes')}>
          <Text style={styles.text}>Sizes</Text>
        </Pressable>
      </View>

    
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Category</Text>
          <Text style={styles.headerText}>Name</Text>
          <Text style={styles.headerText}>Image</Text>
          <Text style={styles.headerText}>Price</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#e11d48" style={styles.loader} />
        ) : products.length === 0 ? (
          <Text style={styles.emptyText}>No products available.</Text>
        ) : (
          products.map((item) => (
            <Pressable
              key={item.id}
              style={styles.tableRow}
              onPress={() => openActionModal(item)}
            >
              <Text style={styles.rowText}>{item.category?.name || 'N/A'}</Text>
              <Text style={styles.rowText}>{item.name}</Text>
              <Image
                
                style={styles.productImage}
              />
              <Text style={styles.rowText}>₱{item.price}</Text>
            </Pressable>
          ))
        )}
      </View>

     
      <Modal visible={isModalVisible} animationType="slide" transparent onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Manage Product</Text>

            <Pressable
              style={styles.modalButton}
              onPress={() => {
                closeModal();
                router.push({
                  pathname: '/pages/update_product',
                  params: { id: selectedProduct.id },
                });
              }}
            >
              <Text style={styles.modalButtonText}>Update Product</Text>
            </Pressable>

            <Pressable
              style={[styles.modalButton, { backgroundColor: '#dc2626' }]}
              onPress={() => {
                setModalVisible(false);
                setShowConfirmModal(true);
              }}
            >
              <Text style={[styles.modalButtonText, { color: '#fff' }]}>Delete Product</Text>
            </Pressable>

            <Pressable onPress={closeModal}>
              <Text style={{ marginTop: 10, color: '#555' }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>


      <Modal
        visible={showConfirmModal}
        animationType="fade"
        transparent
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Are you sure?</Text>
            <Text style={{ textAlign: 'center', marginBottom: 20 }}>
              Do you really want to delete this product?
            </Text>

            <Pressable
              style={[styles.modalButton, { backgroundColor: '#dc2626' }]}
              onPress={() => {
                setShowConfirmModal(false);
                handleDestroyProduct(selectedProduct.id);
              }}
            >
              <Text style={[styles.modalButtonText, { color: '#fff' }]}>Yes, Delete</Text>
            </Pressable>

            <Pressable
              style={[styles.modalButton, { backgroundColor: '#ccc' }]}
              onPress={() => setShowConfirmModal(false)}
            >
              <Text style={[styles.modalButtonText, { color: '#333' }]}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e11d48',
    padding: 10,
  },
  navContainer: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  item: {
    width: '45%',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    height: 80,
    borderRadius: 8,
  },
  text: {
    fontSize: 15,
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'space-between',
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowText: {
    flex: 1,
    fontSize: 13,
    color: '#000',
    textAlign: 'center',
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
    flex: 1,
    alignSelf: 'center',
  },
  loader: {
    marginVertical: 30,
    alignSelf: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#fff',
    marginVertical: 20,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Products;
