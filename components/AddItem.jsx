import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import {Text, StyleSheet, Pressable} from 'react-native';

const AddItem = ({handleAction, title}) => {
  return (
    <Pressable style={styles.item} onPress={handleAction}>
        <Ionicons name="add-circle" size={26} color="black" />
        <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

export default AddItem


const styles = StyleSheet.create({
  item: {
    width: '50%',
    flexDirection:'row',
    alignItems: 'center',
    gap:5,
    paddingLeft:10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    height: 60,
    borderRadius: 5,
  },
  text: {
    fontSize: 15,
    fontWeight:'700'
  },

});