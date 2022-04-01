import React, { useContext, useState } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import SocialButton from "../components/SocialButton";
// import { NavigationContext } from "react-navigation";
import { AuthContext } from "../navigation/AuthProvider";
// import { AuthContext } from "../navigation/AuthProvider";
const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState();
  const { register } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create An Account</Text>
      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />
      <FormInput
        labelValue={confirmPassword}
        onChangeText={(confirmPassword) => setconfirmPassword(confirmPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Sign Up"
        onPress={() => register(email, password)}
      />
      <View style={styles.textPrivate}>
        <Text>By resgistering , you confirm that you accept our</Text>
        <TouchableOpacity
          onPress={() => alert("This Is Our Terms And Conditions")}
        >
          <Text style={(styles.color_textPrivate, { color: "#e88832" })}>
            Terms Of Service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <Text style={(styles.color_textPrivate, { color: "#e88832" })}>
          Privacy Policy
        </Text>
      </View>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text
          style={styles.navButtonText}
          onPress={() => navigation.navigate("Login")}
        >
          Already Have An Account? Login Here!
        </Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 15 }}>
        Note: Go To Profile Screen And Then Edit Your Profile With All The
        Necesary Details Needed
      </Text>
    </View>
  );
};
export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontFamily: "Kufam-SemiBoldItalic",
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f",
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
    fontFamily: "Lato-Regular",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 35,
    justifyContent: "center",
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: "400",
    fontFamily: "Lato-Regular",
    color: "grey",
  },
});
