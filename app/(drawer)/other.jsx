import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView,  FlatList, SectionList, Pressable } from 'react-native';
import { retrieveCategory } from '../../API/category';
import { retrieveBundles } from '../../API/bundle';
import { retrieveSizes } from '../../API/size';
import { retrieveAddOns } from '../../API/addons';
import { router, useFocusEffect  } from 'expo-router';
import OthersContainer from '@/components/OthersContainer';
import AddItem from '@/components/AddItem';


export default function Other() {
  const [categories, setCategories] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [addons, setAddOns] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

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

      setLoading(false);
    
    } catch (error) {
      console.error('Error Fetching Data', error);
    }
  };

  useFocusEffect(
    useCallback(()=>{
      fetchData();
    }, [])
  )

  const sections = [
    { title: 'Categories', data: categories },
    { title: 'Bundles', data: bundles },
    { title: 'AddOns', data: addons },
    { title: 'Sizes', data: sizes },
  ];

  return (
    <ScrollView style={styles.main} nestedScrollEnabled={true}>

      <View style={styles.navContainer}>
        <AddItem
          handleAction={()=>router.push('../pages/category')}
          title='Category'
        />
        <AddItem
          handleAction={()=>router.push('../pages/bundles')}
          title='Bundles'
        />
      </View>

      <View style={styles.navContainer}>
        <AddItem
          handleAction={()=>router.push('../pages/sizes')}
          title='Sizes'
        />
        <AddItem
          handleAction={()=>router.push('../pages/addons')}
          title='Addons'
        />
      </View>

      
      <OthersContainer
        header='Categories'
        loading={loading}
        data={categories}
      />
      <OthersContainer
        header='Addons'
        loading={loading}
        data={addons}
      />
      <OthersContainer
        header='Sizes'
        loading={loading}
        data={sizes}
      />
      <OthersContainer
        header='Bundles'
        loading={loading}
        data={bundles}
      />
  
      {/* <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <Pressable style={styles.row}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Divider />
          </Pressable>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.headerText}>{title}</Text>
        )}
        contentContainerStyle={{ padding: 10 }}
      /> */}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#e11d48',
    paddingTop:30,
    padding:10
  },
  navContainer: {
    flexDirection: 'row',
    gap:20,
    paddingHorizontal:10,
    justifyContent: 'center',
    marginBottom: 20,
  },
  
});
