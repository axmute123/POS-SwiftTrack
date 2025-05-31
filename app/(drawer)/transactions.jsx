import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, ScrollView, ActivityIndicator, RefreshControl} from 'react-native';
import { retrieveTransactions } from '../../API/transactions';
import { useFocusEffect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () =>{
    if (!loading) {
      setLoading(true)
      const token = await SecureStore.getItemAsync('token');  
      retrieveTransactions(token).then(res=>{
        if(res?.ok) setTransactions(res?.data);
        else console.log('error.')
      }).finally(()=>setLoading(false))
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchTransactions()
    }, [])
  )


  if (loading) return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#d92e50" />
        <Text style={styles.loadingText}>Loading Transactions...</Text>
      </View>
    );
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>

      <View style={[styles.row, styles.header]}>
        <Text style={[styles.cell, styles.headerText]}>Invoice no.</Text>
        <Text style={[styles.cell, styles.headerText]}>Status</Text>
        <Text style={[styles.cell, styles.headerText]}>Payment Method</Text>
        <Text style={[styles.cell, styles.headerText]}>Total</Text>
        <Text style={[styles.cell, styles.headerText]}>Cash</Text>
        <Text style={[styles.cell, styles.headerText]}>Change</Text>
      </View>

      <ScrollView 
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={fetchTransactions} />
        }
      >
        {transactions?.map((item) => (
          <View key={item.id} style={styles.row}>
            <Text style={styles.cell}>{item.invoice_number}</Text>
            <Text style={styles.cell}>{item?.status}</Text>
            <Text style={styles.cell}>{item?.payment_method}</Text>
            <Text style={styles.cell}> ₱{item?.total}</Text>
            <Text style={styles.cell}> ₱{item?.cash}</Text>
            <Text style={styles.cell}> ₱{item?.change}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap:2,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    fontSize: 12,
    alignItems:'center',
    justifyContent:'center'
  },
  header: {
    backgroundColor: '#f0f0f0',
  },
  headerText: {
    fontWeight: 'bold',
  },
  loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f7f7f7',
},
loadingText: {
  marginTop: 10,
  fontSize: 16,
  color: '#333',
},

});

export default Transactions;
