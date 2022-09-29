import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

const CustomBotton = ({
    onPress = () => {},
    btnStyle = {},
    btnText
}) => {
    return(
        <TouchableOpacity
            onPress={onPress}
            style={{...styles.btnStyle, ...btnStyle }}
        >
            <Text>{btnText}</Text>
         
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btnStyle: {
        height: 48,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        borderWidth: 1
    }

});

export default CustomBotton;