import React from "react";
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from "@react-navigation/drawer";
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import AppLoading from 'expo-app-loading';
import { useFonts, Roboto_400Regular, } from '@expo-google-fonts/roboto';
import TabNavigator from "./TabNavigator";
import { WelcomeStackNavigator, AboutStackNavigator, ContactStackNavigator, SettingsStackNavigator } from "./StackNavigator";

export default function DrawerNavigator() {

  const auth = useSelector(state => state.auth);

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  const Drawer = createDrawerNavigator();

  const styles = StyleSheet.create({
    drawerHeader: {
      backgroundColor: '#fff700',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      marginTop: 10,
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold'
    },
    drawerHeaderSubText: {
      marginBottom: 10,
      color: "#fff"
    },
    drawerImage: {
      marginTop: 20,
      width: 80,
      height: 80,
      borderRadius: 40
    },
  });
  
  const CustomDrawerContent = (props) => {
      return (
        <DrawerContentScrollView {...props}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
              <View style={{ flex: 1 }}>
                <Image source={require('../assets/images/profile.png')} style={styles.drawerImage} />
              </View>
              <View style={{ flex: 2 }}>
                <Text style={styles.drawerHeaderText}> 👋 Welcome {auth?.user?.username} </Text> 
              </View>
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        </DrawerContentScrollView>
      );
    }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

    return (
      <Drawer.Navigator initialRouteName='Home' drawerStyle={{ backgroundColor: '#fff' }} drawerContent={props => <CustomDrawerContent {...props} />} drawerContentOptions={{ activeTintColor: '#fff700', inactiveTintColor: 'gray', }}>
        {!auth.isAuthenticated ? (
          <>
            <Drawer.Screen name="Register" component={WelcomeStackNavigator} />
          </>
        ) : (
          <>
            <Drawer.Screen name="Home" component={TabNavigator} options={{
              title: 'Home',
              drawerLabel: 'Home',
              drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='th'
                  type='font-awesome'
                  size={24}
                  color={tintColor}
                />
              )
            }}
            />
            <Drawer.Screen name="Settings" component={SettingsStackNavigator} options={{
              title: 'Settings',
              drawerLabel: 'Settings',
              drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='cog'
                  type='font-awesome'
                  size={22}
                  color={tintColor}
                />
              )
            }} />
            <Drawer.Screen name="About" component={AboutStackNavigator} options={{
              title: 'About Us',
              drawerLabel: 'About Us',
              drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='info-circle'
                  type='font-awesome'
                  size={24}
                  color={tintColor}
                />
              )
            }} />
            <Drawer.Screen name="Contact Us" component={ContactStackNavigator} options={{
              title: 'Contact Us',
              drawerLabel: 'Contact Us',
              drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='address-card'
                  type='font-awesome'
                  size={22}
                  color={tintColor}
                />
              )
            }} />
          </>
        )}
      </Drawer.Navigator>
    );
  }
}