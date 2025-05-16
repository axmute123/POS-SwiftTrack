import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { retrieveCategory } from '../../API/category';
import { retrieveBundles } from '../../API/bundle';
import { retrieveSizes } from '../../API/size';
import { retrieveAddOns } from '../../API/addons';

const { height } = Dimensions.get('window');

export default function Other() {
  const [categories, setCategories] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [addons, setAddOns] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingBundles, setLoadingBundles] = useState(true);
  const [loadingAddOns, setLoadingAddOns] = useState(true);
  const [loadingSizes, setLoadingSizes] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryRes = await retrieveCategory();
        const bundleRes = await retrieveBundles();
        const addOnsRes = await retrieveAddOns();
        const sizeRes = await retrieveSizes();

        setCategories(categoryRes.data);
        setBundles(bundleRes.data);
        setAddOns(addOnsRes.data);
        setSizes(sizeRes.data);

        setLoadingCategories(false);
        setLoadingBundles(false);
        setLoadingAddOns(false);
        setLoadingSizes(false);
      } catch (error) {
        console.error('Error Fetching Data', error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.boxText}>Category</Text>
        {loadingCategories ? (
          <ActivityIndicator size="small" color="#d92e50" />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {categories.map((item) => (
              <Text key={item.id} style={{ fontStyle: 'italic' }}>{item.name}</Text>
            ))}
          </ScrollView>
        )}
      </View>

    
      <View style={styles.box}>
        <Text style={styles.boxText}>Bundle</Text>
        {loadingBundles ? (
          <ActivityIndicator size="small" color="#d92e50" />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {bundles.map((item) => (
              <Text key={item.id} style={{ fontStyle: 'italic' }}>{item.name}</Text>
            ))}
          </ScrollView>
        )}
      </View>

    
      <View style={styles.box}>
        <Text style={styles.boxText}>AddOns</Text>
        {loadingAddOns ? (
          <ActivityIndicator size="small" color="#d92e50" />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {addons.map((item) => (
              <Text key={item.id} style={{ fontStyle: 'italic' }}>{item.name}</Text>
            ))}
          </ScrollView>
        )}
      </View>

   
      <View style={styles.box}>
        <Text style={styles.boxText}>Size</Text>
        {loadingSizes ? (
          <ActivityIndicator size="small" color="#d92e50" />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {sizes.map((item) => (
              <Text key={item.id} style={{ fontStyle: 'italic' }}>{item.name}</Text>
            ))}
          </ScrollView>
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#e11d48',
  },
  box: {
    width: '45%',
    height: height / 2.2, 
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: 'flex-start',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 10,
  },
  boxText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  scrollContent: {
    paddingVertical: 10,
  },
});
