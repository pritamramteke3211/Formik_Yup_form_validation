import { useNavigation } from '@react-navigation/native';
import { Button } from 'native-base';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const homeScreen = () => {
    const navigation = useNavigation()
    return (
        <View>
            <Text style={{fontSize: 24}}>This is Home Screen</Text>
            <Button onPress={()=> navigation.navigate('Login')}><Text style={{fontSize: 21, color:'white'}}>Logout</Text></Button>
        </View>
    )
}

export default homeScreen;

const styles = StyleSheet.create({})
