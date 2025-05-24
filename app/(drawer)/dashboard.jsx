import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BarChart, PieChart, LineChart } from 'react-native-chart-kit';
import { router } from 'expo-router';
import { retrieveTransactions, fetchHourlySales, retrieveRevenue} from '../../API/transactions';
import Other from './other';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [hourlySalesData, setHourlySalesData] = useState({
    labels: [],
    datasets: [{data: [] }],
  });
    const [ barData , setBarData ] = useState({
    labels: [],
    datasets: [],  
  });

  const coffeeData = [
    { name: 'Latte', population: 30, color: '#ff9e3e', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Cappuccino', population: 25, color: '#8fbc8f', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Espresso', population: 15, color: '#bbaeff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Americano', population: 10, color: '#9fd4c7', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Mocha', population: 20, color: '#bc8ff2', legendFontColor: '#7F7F7F', legendFontSize: 15 }
  ];

  const Bardata = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99],
      },
    ],
  };

    useEffect(() => {
     
      retrieveTransactions()
        .then((res) => {
          const allTransactions = res.data;

          const completedTotal = allTransactions
            .filter(item => item.status === 'completed')
            .reduce((sum, item) => sum + Number(item.total || 0), 0);

          setTransactions(allTransactions);
          setTotalCompleted(completedTotal);
        })
        .catch((error) => {
          console.error('Error fetching transactions:', error);
        });

      
      const refreshChart = () => {
        fetchHourlySales()
          .then((hourlySales) => {
            if (!hourlySales) return;

            const hourlySalesData = {
              labels: ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"],
              datasets: [
                {
                  data: [
                    hourlySales["9AM"] || 0,
                    hourlySales["10AM"] || 0,
                    hourlySales["11AM"] || 0,
                    hourlySales["12PM"] || 0,
                    hourlySales["1PM"] || 0,
                    hourlySales["2PM"] || 0,
                    hourlySales["3PM"] || 0,
                    hourlySales["4PM"] || 0,
                    hourlySales["5PM"] || 0,
                  ],
                  strokeWidth: 2,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                },
              ],
            };

            setHourlySalesData(hourlySalesData);
          })
          .catch((error) => {
            console.error('Error fetching hourly sales data:', error);
          });
      };

      refreshChart(); 

    
      const interval = setInterval(() => {
        const now = new Date();
        if (now.getHours() === 0 && now.getMinutes() === 0) {
          refreshChart(); 
        }
      }, 60000); 

      
      const fetchRevenue = async () => {
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
          });
        }
      };

      fetchRevenue();

      return () => clearInterval(interval); 
    }, []);


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container2}>
        <Text style={styles.title}>Top Coffee Products Sales</Text>
        <PieChart
          data={coffeeData}
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
        {hourlySalesData.datasets.length > 0 && (
      <LineChart
            data={hourlySalesData}
            width={325}
            height={300}
            chartConfig={{
              backgroundColor: '#e26a',
              backgroundGradientFrom: '#e11d48',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
              style: { borderRadius: 16 },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            withHorizontalLabels={true}
            xLabelsOffset={10}
            decorator={() => {}}
            yAxisLabel=""
            yAxisSuffix=""
            fromZero={true}
            verticalLabelRotation={45}
          />
        )}

      </View>

      <View style={styles.container3}>
        <Text style={styles.title}>Monthly Revenue</Text>

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
              // marginVertical: 8,
              borderRadius: 16,
              // paddingRight: 5,

            }}
          />
        ) : (
          <Text>Loading chart data...</Text>
        )}
      </View>


      <View style={styles.sideContainer}>
        <View style={styles.revcontainer}>
          <Text style={styles.title}>Transaction History</Text>
          <ScrollView>
            {transactions.map((item) => (
              <View key={item.id} style={styles.row}>
                <Text style={styles.cell}>Invoice #: {item.invoice_number}</Text>
                <Text style={styles.cell}>Total: ₱{item.total}</Text>
                <Text style={styles.cell}>Change ₱{item.cash}</Text>
                <View style={styles.divider}></View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.revcontainer}>
          <Text style={styles.title}>Total of Sales</Text>
          <View style={styles.totalBox}>
            <Text style={styles.totalAmount}>
              ₱ {new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(totalCompleted))}
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
    height: 200,
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
});

export default Dashboard;
