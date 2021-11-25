import React from "react"; 
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; 
import { Icon } from 'react-native-elements';
import { HomeStackNavigator, AboutStackNavigator, SettingsStackNavigator, ContactStackNavigator } from "./StackNavigator";


const Tab = createBottomTabNavigator(); 

const BottomTabNavigator = () => { 
    return ( 
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
            let iconName; 

            if (route.name === 'Home') {            
            iconName = focused ? 'th'  : 'th';
            
            } else if (route.name === 'About') {
            iconName = focused ? 'info' : 'info-circle';
            
            } else if (route.name === 'Contact') {
                iconName = focused ? 'address-card' : 'address-card';
            
            } else if (route.name === 'Settings') {
                iconName = focused ? 'cog' : 'cog';           
            } 
            
            return <Icon name={iconName} size={size} color={color} type='font-awesome' />;
            },
        })}    
            tabBarOptions={{          
            activeTintColor: '#fff700',
            inactiveTintColor: 'gray',
        }}    
        >
            <Tab.Screen name="Home" component={HomeStackNavigator} />
            <Tab.Screen name="About" component={AboutStackNavigator} />
            <Tab.Screen name="Contact" component={ContactStackNavigator} />           
            <Tab.Screen name="Settings" component={SettingsStackNavigator} />
        </Tab.Navigator> 
    ); 
}; 
    
export default BottomTabNavigator;

