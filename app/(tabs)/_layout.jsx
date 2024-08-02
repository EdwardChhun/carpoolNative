import React from 'react'
import { Text, View } from 'react-native'
import { Tabs } from 'expo-router'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

const TabLayout = () => {
    return (
        <Tabs screenOptions={{ 
            headerShown: false,
            tabBarActiveTintColor:"#53AF2F",
            tabBarInactiveTintColor:"black"
            }}>
            <Tabs.Screen name='ride'
                options={{
                    tabBarLabel: 'Ride',
                    tabBarIcon: ({ color }) => <FontAwesome6 name="car-side" size={24} color={color} />
                }}
            />
            <Tabs.Screen name='messages'
                options={{
                    tabBarLabel: 'Messages',
                    tabBarIcon: ({ color }) => <Ionicons name="mail" size={24} color={color} />
                }}
            />
            <Tabs.Screen name='profile'
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />
                }}
            />
        </Tabs>
    )
}

export default TabLayout;
