import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
} from "react-native";

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
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
  loadingText: {
    color: "#fff700",
    fontSize: 14,
    fontWeight: "bold",
  },
  button: {
    width: 250,
    backgroundColor: "#fff700",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 24,
    marginTop: 10
  },
  buttonText: {
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 3,
    color: "#666",
  },
  alert: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 5
  }
});

export const Loading = () => {
  return (
    <View style={styles.view}>
      <ActivityIndicator size="large" color="#fff700" />
      <Text style={styles.loadingText}>Loading . . .</Text>
    </View>
  );
};

export const Alert = ({ message, title, visible, onConfirm }) => {
  return (
    <Modal visible={visible} backdropTransitionOutTiming={0}>
      <View style={styles.alert}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>{message}</Text>
        <TouchableHighlight style={styles.button} onPress={onConfirm}>
          <Text style={styles.buttonText}>OK</Text>
        </TouchableHighlight>
      </View>
    </Modal>
  );
};

export const SignUpPrompt = ({ message, visible }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.wrapper}>
        <View style={styles.view}>
          <ActivityIndicator size="large" color="#fff700" />
          <Text style={styles.loadingText}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};
