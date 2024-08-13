import React from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const { width, height } = Dimensions.get('window');
const vh = height * 0.01;
const vw = width * 0.01;

const convertDay = (day) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const adjustedDay = (day - 1 + 7) % 7;
    return days[adjustedDay];
};

const RideObject = ({ origin, destination, day, arrival, members, onPress}) => {
    const dayOfWeek = convertDay(day);

    // sets hour, minute, amPm from 24h to 12h clock
    const hour = (Math.floor(arrival) > 12) ? (Math.floor(arrival) - 12) : Math.floor(arrival);
    const roundMin = Math.round((arrival - Math.floor(arrival))*60);
    const minute = roundMin < 10 ? `0${roundMin}` : roundMin;
    const amPm = (Math.floor(arrival) >= 12) ? "pm" : "am";

    return ( 
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <View style={styles.userContainer}>
                    <FontAwesome6 name="user" size={25}/> 
                    <Text style={styles.members}> {members[0].name} </Text>
                </View>

                <View style={styles.locationContainer}>
                    <Text style={styles.locationContent}> 
                        {origin.short}
                        <Text> </Text> <FontAwesome6 name="arrow-right" size={12}/> <Text> </Text>
                        {destination.short}
                    </Text>
                </View>

                <View style={styles.timeContainer}>
                    <Text>Arrive {dayOfWeek} by {hour}:{minute}{amPm} </Text>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <FontAwesome6 name="arrow-right" size={4 * vh} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        marginVertical: .6 * vh,
        marginHorizontal: 5 * vw,
        backgroundColor: '#fff',
        borderRadius: 2 * vh,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    infoContainer: {
        flex: 3,
        padding: 2 * vh,
    },
    userContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    members:{
        fontWeight: 'bold',
        fontSize: 5 * vw,
        marginLeft: 1 * vw,
    },
    locationContainer: {
        marginTop: 1 * vh,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    locationContent: {
        fontWeight: 'bold',
    },
    timeContainer: {
        marginTop: 0.5 * vh,
        flexDirection: 'column',
    },
    button: {
        flex: 1,
        backgroundColor: '#007AFF',
        borderTopRightRadius: 2 * vh,
        borderBottomRightRadius: 2 * vh,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RideObject;