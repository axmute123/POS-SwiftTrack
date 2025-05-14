import React, {useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator} from 'react-native';
import { retrieveCategory } from '../../API/category'
import { retrieveBundles } from '../../API/bundle' 
import { retrieveSizes } from '../../API/size'
import { retrieveAddOns } from '../../API/addons'

const { height } = Dimensions.get('window');

export default function Other() {
  
  const [ categories, setCategories ] = useState([]);
  const [ bundles, setBundles] = useState([]);
  const [ addons, setAddOns] = useState([]);
  const [ sizes,  setSizes ] = useState([]);
  const [ loading, setLoading ] = useState(true);


  useEffect(()=>{
    const fetchData = async () => {
      try{
        const categoryRes = await retrieveCategory();
        const bundleRes = await retrieveBundles ();
        const addOnsRes = await retrieveAddOns ();
        const sizeRes = await retrieveSizes ();
        setCategories(categoryRes.data);
        setBundles(bundleRes.data);
        setAddOns(addOnsRes.data);
        setSizes(sizeRes.data);
       
      }catch (error){
        console.error('Error Fetching Data', error);
      }finally{
        setLoading(false);
      }
    };
    fetchData();

  }, [])

   if (loading) {
      return (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color="#1e3a8a" />
        </View>
      );
    }
  return (

  
    <View style={styles.container}>
      
      <View style={styles.box}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.boxText}>Category</Text>
           {categories.map((item)=>(
            <Text key={item.id} style={{fontStyle:'italic'}}> {item.name}</Text>
           ))}
          
        </ScrollView>
      </View>

      
      <View style={styles.box}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.boxText}>Bundle</Text>
          {bundles.map((item)=>(
            <Text key={item.id} style={{fontStyle:'italic'}}> {item.name}</Text>
           ))}
          
        </ScrollView>
      </View>


      <View style={styles.box}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.boxText}>AddOns</Text>
          {addons.map((item)=>(
            <Text key={item.id} style={{fontStyle:'italic'}}> {item.name}</Text>
           ))}
         
        </ScrollView>
      </View>

      <View style={styles.box}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.boxText}>Size</Text>
          {sizes.map((item)=>(
            <Text key={item.id} style={{fontStyle:'italic'}}> {item.name}</Text>
           ))}
          
        </ScrollView>
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
    // alignItems: 'center',
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
  loaderBox:{
    flex:1,
    justifyContent:'center',
    alignItems:'center '
  }
});
