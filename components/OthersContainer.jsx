import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Pressable } from 'react-native';
import { Divider } from 'react-native-paper';


const OthersContainer = ({header, loading, data, handleAction}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.headerText}>{header}</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#d92e50" style={{marginTop:120}} />
        ) : (

        <FlatList
          data={data}
          keyExtractor={(item) => item?.id.toString()} 
          nestedScrollEnabled={true}
          renderItem={({ item }) => (
            <Pressable onPress={handleAction} style={styles.row}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Divider />
            </Pressable>
          )}
        />
         
        )}
      </View>
  )
}

export default OthersContainer


const styles = StyleSheet.create({

  container: {
    width: '100%',
    height: 350, 
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginVertical: 10,

    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  itemName:{
    fontSize:15,
    marginBottom:3,
    fontWeight:'400'
  },
  row:{
    paddingVertical:10
  }

});
