import React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const Done = ({ ...props }) => {
  return (
    <TouchableOpacity style={{ marginHorizontal: 8 }} {...props}>
      <Text style={{ fontSize: 16 }}>Done</Text>
    </TouchableOpacity>
  );
};

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      DoneButtonComponent={Done}
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.navigate("Login")}
      pages={[
        {
          backgroundColor: "#a6e4d0",
          image: <Image source={require("../assets/onboarding-img1.png")} />,
          title: "Achive Your IIT Goal",
          subtitle:
            "A social media app for the IIT Aspirants",
        },
        {
          backgroundColor: "#fdeb93",
          image: <Image source={require("../assets/onboarding-img2.png")} />,
          title: "Clear Your Thoughts Regarding IIT",
          subtitle: "Solve each other's confusion regarding IIT",
        },
        {
          backgroundColor: "#e9bcbe",
          image: <Image source={require("../assets/onboarding-img3.png")} />,
          title: "Become The Star",
          subtitle: "Let The Spot Light Capture You",
        },
      ]}
    />
  );
};
export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
