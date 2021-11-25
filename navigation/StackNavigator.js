import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { View } from 'react-native';
import Welcome from '../components/Welcome';
import Home from '../components/Home';
import Contact from '../components/Contact';
import About from '../components/About';
import Settings from '../components/Settings';

const Stack = createStackNavigator();

const HeaderRight = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
                onPress={() => {
                    navigation.dispatch(DrawerActions.openDrawer());
                }}>
                <Icon
                    name="menu" size={40}
                    iconStyle={{ color: 'white' }}
                />
            </TouchableOpacity>
        </View>
    );
}

const screenOptionStyle = {
    gestureEnabled: true,
    headerStyle: {
        backgroundColor: '#fff700',
        height: 100,
    },
    headerTitleStyle: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 30
    },
    headerTitleAlign: 'center',
    headerTintColor: '#fff',
    headerMode: 'float',
};

function WelcomeStackNavigator() {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name='Welcome' component={Welcome} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
}

function HomeStackNavigator() {

    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name='Home' component={Home} options={{ title: 'Home', headerLeft: ({}) => <HeaderRight /> }} />
        </Stack.Navigator>
    );
}

function AboutStackNavigator() {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name='About Us' component={About} options={{ title: 'About Us', headerLeft: ({}) => <HeaderRight /> }} />
        </Stack.Navigator>
    );
}


function ContactStackNavigator() {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name='Contact Us' component={Contact} options={{ title: 'Contact Us', headerLeft: ({}) => <HeaderRight /> }} />
        </Stack.Navigator>
    );
}

function SettingsStackNavigator() {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name='Settings' component={Settings} options={{ title: 'Settings', headerLeft: ({}) => <HeaderRight /> }} />
        </Stack.Navigator>
    );
}

export { WelcomeStackNavigator, AboutStackNavigator, HomeStackNavigator, SettingsStackNavigator, ContactStackNavigator };