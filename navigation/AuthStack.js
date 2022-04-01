import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignupScreen from "../screens/SignupScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";

const Stack = createStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLanch] = React.useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLanch(true);
      } else {
        setIsFirstLanch(false);
      }
    });
    // GoogleSignin.configure({
    //   webClientId:
    //     "569557042730-dskot1btos74q3p14rp0gsebruv0628u.apps.googleusercontent.com",
    // });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    routeName = "Onboarding";
  } else {
    routeName = "Login";
  }
  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "#f9fafd",
            shadowColor: "f9fafd",
            elevation: 0,
          },
        }}
      />
    </Stack.Navigator>
  );
};
export default AuthStack;
