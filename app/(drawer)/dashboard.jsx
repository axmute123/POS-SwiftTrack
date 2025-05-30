import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { BarChart, PieChart, LineChart } from 'react-native-chart-kit';
import { router } from 'expo-router';
import { retrieveTransactions, retrieveHourlySales, retrieveRevenue } from '../../API/transactions';

function Dashboard() {

  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [totalCompleted, setTotalCompleted] = useState(0);

  const [hourlySalesData, setHourlySalesData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });

  const [barData, setBarData] = useState({
    labels: [],
    datasets: [],
  });

  const [topProducts, setTopProducts] = useState( [
    { name: '', population: 0, color: '#ff9e3e', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: '', population: 0, color: '#8fbc8f', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: '', population: 0, color: '#bbaeff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: '', population: 0, color: '#9fd4c7', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: '', population: 0, color: '#bc8ff2', legendFontColor: '#7F7F7F', legendFontSize: 15 }
  ]);

  const fetchTransactions= () =>{
    if(!loading){
      retrieveTransactions().then(res => {
        const allTransactions = res?.data;
        
        const completedTotal = allTransactions
          .filter(item => item.status === 'completed')
          .reduce((sum, item) => sum + Number(item.total || 0), 0); 

        setTransactions(allTransactions);
        setTotalCompleted(completedTotal);
      })
      .catch((error) => {
        console.error('Error fetching transactions:', error);
      }).finally(()=>setLoading(false));
    }
  }

  const fetchHourlySales = () => {
    if (!loading) {
      setLoading(true);
      retrieveHourlySales().then(res=> {
        const hourlySalesData = {
          labels: res?.labels,
          datasets: [
            {
              data:res?.sales,
              strokeWidth: 2,
              color: (opacity = 1) => `rgba(255,255,255,${opacity})`
            },
          ],
        }
      setHourlySalesData(hourlySalesData);
      }).finally(() => setLoading(false));
    }
  };

  const fetchRevenue = async () => {

    if(!loading) {
      const result = await retrieveRevenue();
      
      
      if (result) {
        const monthNames = [
          "January", "February", "March", "April", "May", "June", 
          "July", "August", "September", "October", "November", "December"
        ];
        
        const labels = result.map(item => {
          const monthNumber = parseInt(item.month.split('-')[1], 10);
          return monthNames[monthNumber - 1];
        });
        
        const data = result.map(item => Number(item.revenue));
        
        setBarData({
          labels,
          datasets: [{ data }],
        }).finally(()=>setLoading(false));
      }
    }
  };

  const fetchTopProducts = () => {

  }

  useEffect(() => {
    fetchTransactions();

    fetchHourlySales();

    const interval = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        fetchHourlySales();
      }
    }, 60000);

    fetchRevenue();

    return () => clearInterval(interval);
  }, []);

      if (loading) return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#e11d48" />
          <Text style={styles.loadingText}>Fetching Data..</Text>
        </View>
      )
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container2}>

        <Text style={styles.title}>Top Coffee Products Sales</Text>
        <PieChart
          data={topProducts}
          width={300}
          height={180}
          chartConfig={{
            backgroundColor: '#e26a',
            backgroundGradientFrom: '#e11d48',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          center={[0, 0]}
          hasLegend={true}
        />
      </View>

      <View style={styles.container2}>
        <Text style={styles.title}>Hourly Sales Overview</Text>

          { hourlySalesData?.labels?.length > 0 ? (
            <LineChart
              data={hourlySalesData}
              width={325}
              height={300}
              chartConfig={{
                backgroundColor: '#e26a',
                backgroundGradientFrom: '#e11d48',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255,255,255,${opacity})`,
                style: { borderRadius: 16 },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              withHorizontalLabels={true}
              xLabelsOffset={10}
              yAxisLabel=""
              yAxisSuffix=""
              fromZero={true}
              verticalLabelRotation={45}
            />
            ): <Text> No data Available. </Text>
          }
      </View> 

      <View style={styles.container3}>
        <Text style={styles.title}>Monthly Sales</Text>
        {barData?.datasets?.[0]?.data?.length > 0 ? (
          <BarChart
            data={barData}
            width={325}
            height={200}
            chartConfig={{
              backgroundColor: '#e26a',
              backgroundGradientFrom: '#e11d48',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: { borderRadius: 16 },
            }}
            style={{
              borderRadius: 16,
            }}
          />
        ) : (
          <Text>No data Available.</Text>
        )}
      </View>

    
      <View style={styles.sideContainer}>
        <View style={styles.revcontainer}>
          <Text style={styles.title}>Transaction History</Text>
          <ScrollView style={{ height: 160 }} contentContainerStyle={{ paddingBottom: 20 }}>
            {transactions.map((item, index) => (
                <View key={item.id || index} style={styles.row}>
                  <Text style={styles.cell}>Invoice #: {item.invoice_number || 'N/A'}</Text>
                  <Text style={styles.cell}>Total: ₱{item.total ?? 0}</Text>
                  <Text style={styles.cell}>Change: ₱{item.cash ?? 0}</Text>
                  <View style={styles.divider}></View>
                </View>
              ))}
          </ScrollView>
        </View>

        <View style={styles.revcontainer}>
          <Text style={styles.title}>Total of Sales</Text>
          <View style={styles.totalBox}>
            <Text style={styles.totalAmount}>
                ₱ {isNaN(totalCompleted) ? '0.00' : new Intl.NumberFormat('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(Number(totalCompleted))}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#e11d48',
    padding: 10,
  },
  container2: {
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
  },
  container3: {
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  sideContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  revcontainer: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    // height: 200,
  },
  totalBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#09ed3f',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
  cell: {
    fontSize: 12,
  },
  row: {
    marginBottom: 5,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display:'flex',
    justifyContent: "center", 
    alignItems: "center",
    zIndex:99999
  },
  loadingText: {
    marginTop: 10, 
    fontSize: 14,
    color: "black",
  },
});

export default Dashboard;
