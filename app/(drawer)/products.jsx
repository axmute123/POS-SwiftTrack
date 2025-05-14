import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { retrieveProducts } from '../../API/product';
import { router } from 'expo-router';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <ScrollView style={styles.container}>

      <View style={styles.navContainer}>
        <Pressable style={styles.item} onPress={() => router.push('../../pages/add_category')}>
          <Text>Category</Text>
        </Pressable>
        <Pressable style={styles.item} onPress={() => router.push('../../pages/add_bundles')}>
          <Text>Bundles</Text>
        </Pressable>
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

        {/* Table Rows */}
        {loading ? (
          <ActivityIndicator size="large" color="#e11d48" style={styles.loader} />
        ) : products.length === 0 ? (
          <Text style={styles.emptyText}>No products available.</Text>
        ) : (
          products.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.rowText}>{item.category?.name || 'N/A'}</Text>
              <Text style={styles.rowText}>{item.name}</Text>
              <Image
                source={{
                  uri: item.image || 'N/A',
                }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <Text style={styles.rowText}>₱{item.price}</Text>
            </View>
          ))
        )}
      </View>
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
    flexWrap: 'wrap',
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
    color: '#555',
    marginVertical: 20,
    fontSize: 16,
  },
});

export default Products;
