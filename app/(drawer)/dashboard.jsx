import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { BarChart, PieChart, LineChart } from 'react-native-chart-kit'
import { router } from 'expo-router'
import  { retrieveTransactions } from '../../API/transactions'

function Dashboard() {
  const [ transactions, setTransactions ] = useState([]);
  
  const hourlySalesData = {
    labels : ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'],
    datasets: [{
      data: [120, 150, 170, 200, 250, 210, 190, 230, 300],
      strokeWidth: 2,
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, 
      },
    ],
  };

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
        .then((transactionRes) => {
 
          setTransactions(transactionRes.data);
          console.log('Transactions:', transactionRes);
        })
        .catch((error) => {
          console.error('Error fetching transactions:', error);
        });
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
          <LineChart
            data={hourlySalesData}
            width={325}
            height={300}
              chartConfig={{
                backgroundColor: '#e26a',
                backgroundGradientFrom:'#e11d48',
                backgroundGradientTo: '#ffa726',
                decimalPlaces:0,
                color:(opacity = 1 ) => `rgba(255,255,255, ${opacity})`,
                style:{ borderRadius: 16 },
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
        </View>

      <View style={styles.container3}>
              <Text style={styles.title}>Monthly Revenue</Text>
              <BarChart
                data={Bardata}
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
                  marginVertical: 8,
                  borderRadius: 16,
                  paddingRight: 20,
                }}
                
              />
            </View>
      <View style={styles.sideContainer}>
        <View style={styles.revcontainer}>
          <Text style={styles.title}>Transaction History</Text>
              <ScrollView>
                {transactions.map((item) => (
                  <View key={item.id} style={styles.row}>
                    <Text style={styles.cell}>Invoice #:{item.invoice_number}</Text>
                    <Text style={styles.cell}>Total: ₱{item.total}</Text>
                  </View>
                ))}
              </ScrollView>
        </View>
              
              <View style={styles.revcontainer}>
                <Text style={styles.title}>Daily Revenue Summary</Text>
                <ScrollView>
                </ScrollView>
              </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor:'#e11d48',
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
  sideContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom: 30,
  },
  revcontainer:{
    flex: 1,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    height: 200, 
  }
});


export default Dashboard;
