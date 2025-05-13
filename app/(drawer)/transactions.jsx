import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { retrieveTransactions } from '../../API/transactions';
import { getpaymentMethod } from '../../API/payment_method';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([retrieveTransactions(), getpaymentMethod()])
      .then(([transactionsRes, paymentMethodsRes]) => {
        setTransactions(transactionsRes.data);
        setPaymentMethods(paymentMethodsRes.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getPaymentMethodName = (id) => {
    const method = paymentMethods.find(m => m.id === id);
    return method ? method.name : 'Unknown';
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading Transactions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>

      <View style={[styles.row, styles.header]}>
        <Text style={[styles.cell, styles.headerText]}>Invoice</Text>
        <Text style={[styles.cell, styles.headerText]}>Payment Method</Text>
        <Text style={[styles.cell, styles.headerText]}>Total</Text>
        <Text style={[styles.cell, styles.headerText]}>Cash</Text>
        <Text style={[styles.cell, styles.headerText]}>Change</Text>
      </View>

      <ScrollView>
        {transactions.map((item) => (
          <View key={item.id} style={styles.row}>
            <Text style={styles.cell}>Invoice #: {item.invoice_number}</Text>
            <Text style={styles.cell}>
              Payment Method: {getPaymentMethodName(item.payment_method)}
            </Text>
            <Text style={styles.cell}>Total: ${item.total}</Text>
            <Text style={styles.cell}>Cash: ${item.cash}</Text>
            <Text style={styles.cell}>Change: ${item.change}</Text>
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
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    fontSize: 12,
  },
  header: {
    backgroundColor: '#f0f0f0',
  },
  headerText: {
    fontWeight: 'bold',
  },
});

export default Transactions;
