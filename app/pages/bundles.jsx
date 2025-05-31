import React, { useState, useEffect } from 'react';
import { View, Text , TextInput , StyleSheet , Pressable , Alert , ActivityIndicator , ScrollView ,TouchableOpacity,} from 'react-native';
import { storeBundles } from '@/API/bundle';
import { retrieveProducts } from '@/API/product';
import { router } from 'expo-router';

export default function Bundles() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);
 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await retrieveProducts();
        setProducts(result.data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }finally{
        setInitialLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const toggleProductSelection = (productId) => {
    setSelectedProducts((prevSelected) => {
      const alreadySelected = prevSelected.includes(productId);
      const newSelection = alreadySelected
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId];

      if (!alreadySelected && !quantities[productId]) {
        setQuantities((prev) => ({ ...prev, [productId]: '1' }));
      }

      return newSelection;
    });
  };

  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: value.replace(/[^0-9]/g, ''),
    }));
  };

  const handleAddBundle = async () => {
    if (!name || !price || selectedProducts.length === 0) {
      Alert.alert('Validation Error', 'Please fill in all fields and select at least one product');
      return;
    }

    const bundleData = {
      name,
      price,
      products: selectedProducts.map((productId) => ({
        product_id: productId,
        quantity: parseInt(quantities[productId]) || 1,
      })),
    };

    setLoading(true);

    try {
      const result = await storeBundles(bundleData);
      setName('');
      setPrice('');
      setSelectedProducts([]);
      setQuantities({});
      Alert.alert('Success', 'Bundle saved successfully');
      console.log('Saved bundle', result);
    } catch (error) {
      console.error('API Error', error);
      Alert.alert('Error', 'Failed to save bundle');
    } finally {
      setLoading(false);
      router.push('/(drawer)/other');
    }
  };
 

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          placeholder="Bundle Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Price</Text>
        <TextInput
          placeholder="Bundle Price"
          keyboardType="numeric"
          style={styles.input}
          value={price}
          onChangeText={setPrice}
        />
      </View>

            <View style={styles.inputGroup}>
                  <Text style={styles.label}>Select Products & Set Quantity</Text>

              {initialLoading ? (
                <View style={styles.productLoadingContainer}>
                  <ActivityIndicator size="small" color="#d92e50" />
                  <Text style={{ marginTop: 8, fontSize: 14, color: '#555' }}>Loading products...</Text>
                </View>
              ) : products.length > 0 ? (
                products.map((product) => {
                  const isSelected = selectedProducts.includes(product.id);
                  return (
                    <View key={product.id} style={styles.checkboxContainer}>
                        <TouchableOpacity
                          style={styles.checkboxTouchable}
                          onPress={() => toggleProductSelection(product.id)}
                          activeOpacity={0.7}
                          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                          <View style={[styles.checkbox, isSelected && styles.checked]}>
                            {isSelected && <Text style={styles.checkmark}>✓</Text>}
                          </View>
                          <Text style={styles.checkboxLabel}>
                            {product.name} - ₱{product.price}
                          </Text>
                        </TouchableOpacity>

                        {isSelected && (
                          <TextInput
                            style={styles.quantityInput}
                            keyboardType="numeric"
                            placeholder="Qty"
                            value={quantities[product.id]}
                            onChangeText={(value) => handleQuantityChange(product.id, value)}
                          />
                        )}
                      </View>
                  );
                })
              ) : (
                <Text>No products available</Text>
              )}
          </View>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && { opacity: 0.8 },
          loading && { backgroundColor: '#a0c4ff' },
        ]}
        onPress={handleAddBundle}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Add Bundle</Text>
        )}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#444',
    marginBottom: 6,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      flexWrap: 'wrap',
      paddingVertical: 6,
    },

  checkboxTouchable: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      paddingVertical: 10, 
    },

  checkbox: {
      width: 36,
      height: 36,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: '#e11d48',
      marginRight: 10,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },

  checked: {
      backgroundColor: '#e11d48',
    },

  checkmark: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },

  checkboxLabel: {
      fontSize: 16,
      color: '#333',
      flexShrink: 1,
    },

  quantityInput: {
      width: 60,
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 6,
      paddingHorizontal: 8,
      marginLeft: 10,
      backgroundColor: '#fff',
      textAlign: 'center',
    },
  button: {
    backgroundColor: '#e11d48',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
