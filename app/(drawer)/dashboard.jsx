import React, { useState , useCallback} from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { BarChart, PieChart, LineChart } from 'react-native-chart-kit';
import { router, useFocusEffect } from 'expo-router';
import { retrieveDailyTransactions, retrieveHourlySales, retrieveRevenue, retrieveTopProducts } from '../../API/transactions';

function Dashboard() {
  const screenWidth = Dimensions.get('window').width - 40;
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  const [hourlySalesData, setHourlySalesData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });

  const [barData, setBarData] = useState({
    labels: [],
    datasets: [],
  });

  const [topProducts, setTopProducts] = useState( [
    { name: '', population: 0, color: '', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: '', population: 0, color: '', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: '', population: 0, color: '', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: '', population: 0, color: '', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: '', population: 0, color: '', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ]);

  const fetchTransactions= () =>{
    if(!loading){
      retrieveDailyTransactions().then(res => {
        if (res?.ok) {
          setTransactions(res?.data);
          const total = res?.data?.reduce((sum, tx) => {
            return sum + parseFloat(tx.total);
          }, 0);
          setTotalSales(total);
        }else console.log(res)
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

  const fetchRevenue = () => {
    if(!loading) {
      setLoading(true);
      retrieveRevenue().then(res=>{
        console.log(res)
        if (res) {
          const data = res.map(item => item?.total_sales);
          const labels = res?.map(item=>item?.month);
          setBarData({
            labels,
            datasets: [{ data }],
          })
        } else console.log('error') 
        .finally(()=>setLoading(false));
      });   
    }
  };

  const colors = ['#E1541D', '#AAE11D', '#1DE1B6', '#541DE1', '#E11DAA'];

  const fetchTopProducts = () => {
    if (!loading) {
      setLoading(true);
      retrieveTopProducts().then(res=>{
        if(res?.ok){
          const data = res.data.map((item, index) => ({
            name: item.name,
            population: parseInt(item.total_qty),
            color: colors[index % colors.length],
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
          }));           
          setTopProducts(data);
        } else console.log(res);
      }).finally(()=>setLoading(false))
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
      fetchHourlySales();
      fetchTopProducts();
      fetchRevenue();
    }, [])
  )


  const onRefresh = useCallback(() => {
    fetchTransactions();
    fetchHourlySales();
    fetchTopProducts();
    fetchHourlySales();
    fetchRevenue();
  }, []);

  if (loading) return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#e11d48" />
      <Text style={styles.loadingText}>Fetching Data..</Text>
    </View>
  )

  return (
    <ScrollView 
      contentContainerStyle={styles.main}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefresh} />
      }
      nestedScrollEnabled={true}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Top Products of the Month</Text>
        <PieChart
          data={topProducts}
          width={screenWidth}
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

      <View style={styles.container}>
        <Text style={styles.title}>Hourly Sales Overview</Text>

          { hourlySalesData?.labels?.length > 0 ? (
            <LineChart
              data={hourlySalesData}
              width={screenWidth}
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

      <View style={styles.container}>
        <Text style={styles.title}>Monthly Sales</Text>
        {barData?.datasets?.[0]?.data?.length > 0 ? (
          <BarChart
            data={barData}
            width={screenWidth}
            height={300}
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
   
    <View style={styles.transactions}>
      <Text style={styles.title}>Transaction History</Text>
      <ScrollView 
        style={{ height: 160}} 
        nestedScrollEnabled={true}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {transactions?.length > 0 ? (
          transactions.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>Time: {item?.updated_at ?? 0}</Text>
              <Text style={styles.cell}>Invoice #: {item?.invoice_number || 'N/A'}</Text>
              <Text style={styles.cell}>Total: ₱{item?.total ?? 0}</Text>
              <Text style={styles.cell}>Cash: ₱{item?.cash ?? 0}</Text>
              <Text style={styles.cell}>Change: ₱{item?.change ?? 0}</Text>
              <View style={styles.divider}></View>
            </View>
          ))
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 60, color: '#999' }}>
            No data available.
          </Text>
        )}
      </ScrollView>
    </View>

        <View style={[styles.transactions, {height:'auto', marginBottom:35}]}>
          <Text style={styles.title}>Total Sales of the Day</Text>
          <View style={styles.totalBox}>
            <Text style={styles.totalAmount}>
                ₱ {isNaN(totalSales) ? '0.00' : new Intl.NumberFormat('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(Number(totalSales))}
            </Text>
          </View>
        </View>
  
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#e11d48',
    padding: 10,
  },
  container: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    alignSelf:'flex-start'
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
  transactions: {
    width:'100%',
    backgroundColor:'#fff',
    marginBottom:20,
    height:'300px',
    borderRadius:8,
    padding:10
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
});

export default Dashboard;
