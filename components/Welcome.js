import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  TextInput,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import {
  receiveSignup,
  requestSignup,
  signupError,
} from "../redux/ActionCreators";
import { Alert, SignUpPrompt } from "./Alert";
import { Video } from "expo-av";
import AppLoading from "expo-app-loading";
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";
import { baseUrl } from "../redux/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Welcome() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmpassword, setconfirmPassword] = React.useState("");
  const [showPass, setShowPass] = React.useState(true);
  const [signUpPromptVisible, setSignUpPromptVisible] = React.useState(false);
  const [alertVisible, setAlertVisible] = React.useState(false);

  const dispatch = useDispatch();
  const creds = { username: username, password: password };
  const video = React.useRef(null);

  const handleSignup = () => {
    setSignUpPromptVisible(true);

    dispatch(requestSignup(creds));

    return fetch(baseUrl + "users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else if (!response.ok) {
            setSignUpPromptVisible(false);
            alert("ERROR:" + " " + "Failed to load response!");
          } else {
            setSignUpPromptVisible(false);
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          throw error;
        }
      )
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          AsyncStorage.setItem("token", response.token);
          AsyncStorage.setItem("creds", JSON.stringify(creds));
          AsyncStorage.setItem("id", response.id);

          setSignUpPromptVisible(false);
          dispatch(receiveSignup(response));
        } else {
          setSignUpPromptVisible(false);
          var error = new Error("Error " + response.status);
          error.response = response;
          throw error;
        }
      })
      .catch((error) => {
        dispatch(signupError(error.message));
        setSignUpPromptVisible(false);
      });
  };

  const handleGoogleLogin = () => {
    // dispatch(googleLogin())
  };

  const handleMetaLogin = () => {
    // dispatch(metaLogin())
  };

  const handleAlert = () => {
    setAlertVisible(true);
  };

  const handleAlertConfirm = () => {
    setAlertVisible(false);
  };

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: "https://mbluxury1.s3.amazonaws.com/2020/09/18141509/home-video-2020.mp4",
          }}
          resizeMode="cover"
          rate={1}
          shouldPlay={true}
          isLooping={true}
          volume={1}
          muted={true}
        />
        <View style={styles.welcomeWrapper}>
          <Text style={styles.welcomeText}>Create an account</Text>
          <Text style={styles.welcomeSubText}>
            Fill the details and create an account.
          </Text>
          <View style={styles.buttonWrapper}>
            <View style={styles.textInput}>
              <TextInput
                style={styles.transparent}
                placeholder="Username/Email ID"
                placeholderTextColor="#f4f4f4"
                onChangeText={(username) => setUsername(username)}
                value={username}
              />
            </View>
            <View style={styles.textInput}>
            <TextInput
                style={styles.transparent}
                placeholder="Password"
                placeholderTextColor="#f4f4f4"
                onChangeText={(password) => setPassword(password)}
                value={password}
                secureTextEntry={showPass}
              />
            </View>
            <View style={styles.textInput}>
            <TextInput
                style={styles.transparent}
                placeholder="Confirm Password"
                placeholderTextColor="#f4f4f4"
                onChangeText={(confirmpassword) =>
                setconfirmPassword(confirmpassword)
              }
                value={confirmpassword}
                secureTextEntry={showPass}
              />
            </View>
            <TouchableHighlight
              onPress={
                password !== confirmpassword ? handleAlert : handleSignup
              }
              style={styles.solid}
            >
              <Text style={styles.solidText}>Continue</Text>
            </TouchableHighlight>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ color: "white" }}>or sign in with</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableHighlight
              onPress={handleMetaLogin}
              style={{ marginTop: 20 }}
            >
              <Image
                source={require("../assets/images/meta.png")}
                style={{ width: 30, height: 30 }}
              ></Image>
            </TouchableHighlight>
            <TouchableHighlight onPress={handleGoogleLogin}>
              <Image
                source={require("../assets/images/google.png")}
                style={{ width: 75, height: 70 }}
              ></Image>
            </TouchableHighlight>
          </View>

          <SignUpPrompt
            message={"😀 Signup in Progress. . ."}
            visible={signUpPromptVisible}
          />

          <Alert
            title={"❌ Signup Error"}
            message={"Wrong password combination"}
            visible={alertVisible}
            onConfirm={handleAlertConfirm}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  buttons: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeWrapper: {
    padding: 20,
    marginTop: 30,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Roboto_400Regular",
    color: "#f4f4f4",
    margin: 10,
    textAlign: "left",
    letterSpacing: 3,
  },
  welcomeSubText: {
    fontFamily: "Roboto_400Regular",
    letterSpacing: 3,
    color: "#f4f4f4",
    textAlign: "left",
    margin: 10,
  },
  buttonWrapper: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 50,
  },
  solid: {
    width: 250,
    backgroundColor: "#fff700",
    padding: 15,
    justifyContent: "center",
    marginBottom: 20,
    borderRadius: 24,
  },
  solidText: {
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 3,
    fontFamily: "Roboto_400Regular",
    color: "#666",
  },
    transparent: {
    width: 250,
    height: 50,
    padding: 15,
    justifyContent: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderRadius: 24,
    borderColor: "#fff700",
    fontWeight: "bold",
    fontFamily: "Roboto_400Regular",
    letterSpacing: 3,
    backgroundColor: "transparent",
    color: "#fff"
  },
  textInput: {
       marginBottom: 20,
  },
  wrapper: {
    zIndex: 9,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
  loadingView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  loadingText: {
    color: "#4682B4",
    fontSize: 14,
    fontWeight: "bold",
  },
});
