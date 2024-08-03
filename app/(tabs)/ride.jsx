import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, SafeAreaView, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
// import axios from 'axios'; // Use this when we create a Flask server for data endpoints

const { width, height } = Dimensions.get('window');
const vh = height * 0.01;
const vw = width * 0.01;

const DayButton = ({ title, onPress, isSelected }) => (
    <TouchableOpacity 
      style={[styles.dayButton, isSelected && styles.selectedDayButton]} 
      onPress={onPress}
    >
      <Text style={[styles.dayButtonText, isSelected && styles.selectedDayButtonText]}>{title}</Text>
    </TouchableOpacity>
);

const ride = () => {
	const [destination, onChangeDest] = useState("");
	const [from, onChangeFrom] = useState("");
    const [day, onChangeDay] = useState(null); // 1 - 7, Sun - Sat
    const [time, onChangeTime] = useState("00:00"); // Using Military time 
    const [amPm, onChangeAmPm] = useState("AM");
    const [haveCar, onChangeHaveCar] = useState(""); // Yes <-> No, I was worried about logic errors with TouchableOpacity
    const [date, setDate] = useState(new Date()); // Used later for time selection after researched
    const days = ['S', 'M', 'T', 'W', 'Th', 'F', 'S'];

    // Needs to be implemented, could be JSON object
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            destination: destination,
            from: from,
            day: day,
            time: time,
            amPm: amPm,
            haveCar: haveCar,
        }
    }

	return (
		<SafeAreaView style={styles.container}>

            {/* Location Selection Component */}

			<Text style={styles.title}>Find a Carpool</Text>
			<View style={styles.inputContainer}>
				<View style={styles.inputWrapper}>
					<FontAwesome6 name="magnifying-glass" size={24} color="#6E6B6B" style={styles.icon} />
					<TextInput
						style={styles.locInput}
						placeholder="Where to?"
						placeholderTextColor="#6E6B6B"
						value={destination}
						onChangeText={onChangeDest}
					/>
				</View>
				<View style={styles.inputWrapper}>
					<FontAwesome6 name="magnifying-glass" size={24} color="#6E6B6B" style={styles.icon} />
					<TextInput
						style={styles.locInput}
						placeholder="Where from?"
						placeholderTextColor="#6E6B6B"
						value={from}
						onChangeText={onChangeFrom}
					/>
				</View>
			</View>

            {/* Weekday Component */}

            <Text style={styles.subTitle}>When do you need to be there?</Text>
            <View style={styles.weekdayContainer}>
                {days.map((d, index) => (
                    <DayButton
                        key={index}
                        title={d}
                        onPress={() => onChangeDay(index + 1)}
                        isSelected={day === index + 1}
                    />
                ))}
            </View>

            {/* Time Selection Component */}

            <View style={styles.timeContainer}>
                <Text style={styles.subTitle}>Time:</Text>
                <View style={styles.timePickerContainer}>
                    {/* onChangeTime, create function for modal or inline time selection.
                      * This current time button is interim placeholder
                      */}
                    <TouchableOpacity onPress={() => onChangeTime(time)} style={styles.timePickerButton}>
                        <Text style={styles.timePicker}>{time}</Text>
                    </TouchableOpacity>

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={[styles.buttons, amPm === 'AM' && styles.activeButtons]}
                            onPress={() => onChangeAmPm('AM')}
                        >
                            <Text style={[styles.buttonsText, amPm === 'AM' && styles.activeButtonsText]}>AM</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.buttons, amPm === 'PM' && styles.activeButtons]}
                            onPress={() => onChangeAmPm('PM')}
                        >
                            <Text style={[styles.buttonsText, amPm === 'PM' && styles.activeButtonsText]}>PM</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Do You Have Car Component */}
            {/* Yes, I resued the stylesheet from time selection's components */}

            <View style={styles.timeContainer}>
                <Text style={styles.subTitle}>Do you have a car?:</Text>
                <View style={styles.timePickerContainer}>
                    {/* onChangeTime, create function for modal or inline time selection.
                      * This current time button is interim placeholder
                      */}

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={[styles.buttons, haveCar === "Yes" && styles.activeButtons]}
                            onPress={() => onChangeHaveCar('Yes')}
                        >
                            <Text style={[styles.buttonsText, haveCar === "Yes" && styles.activeButtonsText]}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.buttons, haveCar === "No" && styles.activeButtons]}
                            onPress={() => onChangeHaveCar('No')}
                        >
                            <Text style={[styles.buttonsText, haveCar === "No" && styles.activeButtonsText]}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Handle Submit */}

            {/* Separating Line */}

            {/* List of users (Make scrollable)*/}

		</SafeAreaView>
	);
};

export default ride;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5',
	},
	title: {
		marginTop: 7 * vh,
		marginLeft: 6 * vw,
		color: "#5A5A5A",
		textAlign: "left",
		fontWeight: "bold",
		fontSize: 4 * vh,
		marginBottom: 3 * vh,
	},
    subTitle: {
		marginLeft: 5 * vw,
		color: "#5A5A5A",
		textAlign: "left",
		fontWeight: "bold",
		fontSize: 2.8 * vh,
		marginBottom: 1 * vh,
	},
	inputContainer: {
		alignItems: 'center',
        marginTop: -2 * vh,
	},
	inputWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: "#D9D9D9",
		borderRadius: 3 * vh,
		marginBottom: 2 * vh,
		width: 90 * vw,
	},
	icon: {
		marginLeft: 4 * vw,
	},
	locInput: {
		flex: 1,
		height: 6.5 * vh,
		fontSize: 2.5 * vh,
		fontWeight: "bold",
		color: "#6E6B6B",
		paddingLeft: 2 * vw,
	},
    weekdayContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5 * vw,
        marginBottom: 2 * vh,
        marginTop: 0.5 * vh,
      },
    dayButton: {
        width: 10 * vw,
        height: 10 * vw,
        borderRadius: 3 * vw,
        backgroundColor: '#D9D9D9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedDayButton: {
        backgroundColor: '#6E6B6B',
    },
    dayButtonText: {
        color: '#6E6B6B',
        fontSize: 2.5 * vh,
        fontWeight: 'bold',
    },
    selectedDayButtonText: {
        color: 'white',
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2 * vh,
        paddingHorizontal: 0 * vw,
        justifyContent: 'space-between',
    },
    timePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 3 * vh,
        paddingHorizontal: 2 * vw,
        paddingVertical: -0.5 * vh,
        flex: 1,
        justifyContent: 'flex-end',
    },
    timePickerButton: {
        height: 6 * vh,
        backgroundColor: '#D9D9D9',
        borderRadius: 3 * vh,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 2 * vw,
        paddingHorizontal: 5 * vw,
    },
    timePicker: {
        fontSize: 2.5 * vh,
        fontWeight: "bold",
        color: "#6E6B6B",
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttons: {
        width: 18 * vw,
        height: 6 * vh,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C4C4C4',
        borderRadius: 2.5 * vh,
        marginLeft: 2 * vw,
    },
    activeButtons: {
        backgroundColor: '#6E6B6B',
    },
    buttonsText: {
        fontSize: 2 * vh,
        fontWeight: 'bold',
        color: '#6E6B6B',
    },
    activeButtonsText: {
        color: 'white',
    },
    
});