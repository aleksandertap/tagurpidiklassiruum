// src/components/common/Modal.jsx
import React from "react";
import { FlatList, Modal as RNModal, StyleSheet, Text, View } from "react-native";
import { Button } from "./Button";

const Modal = ({ showHistory, showGuide, wrongGuesses, data, onClose, isVisible }) => {
  const historyData = data.filter((item) => item.active === false);
  const correctCount = historyData.length;

  const renderNotActiveItem = ({ item }) => (
    <View className="mb-5 text-center">
      <View className="flex-row justify-center items-center gap-2">
        <View className="w-full h-px bg-black" />
        <Text className="text-2xl">
          {item.word.charAt(0).toUpperCase() + item.word.slice(1)}
        </Text>
        <View className="w-full h-px bg-black" />
      </View>
      <Text className="text-base">{item.definition}</Text>
    </View>
  );

  return (
    <RNModal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <View style={styles.modalOverlay}>
        <View className="p-6 bg-white rounded-lg shadow-lg justify-between items-center w-4/5">
          {showGuide && (
            <View className="mb-4 items-center">
              <Text className="text-2xl font-bold">Tagurpidi klassiruum</Text>
              <Text className="text-base mb-4">Õpi eesti keele sõnu mänguliselt</Text>
              <View className="gap-2">
                <Text className="text-2xl">* Ekraanil on sõna seletus</Text>
                <Text className="text-2xl">* Kirjuta õige sõna ja vajuta "OK"</Text>
                <Text className="text-2xl">* Ajalugu asub üleval paremal</Text>
                <Text className="text-2xl">* Juhendit saab taas kuvada üleval vasakul</Text>
              </View>
            </View>
          )}
          {showHistory && (
            <View className="mb-4 items-center">
              <Text className="text-2xl">Õigeid vastuseid</Text>
              <Text className="text-2xl font-bold">{correctCount}</Text>
              <Text className="text-2xl">Valesid vastuseid</Text>
              <Text className="text-2xl font-bold">{wrongGuesses}</Text>
              <View className="w-full h-80">
                <FlatList
                  data={historyData}
                  renderItem={renderNotActiveItem}
                  keyExtractor={(item, index) => item.word + index}
                  contentContainerStyle={{ width: "100%" }}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
          )}
          <Button style="normal" title="Sulge" onPress={onClose} />
        </View>
      </View>
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(118,41,0,0.5)", // rgba vorm, 0.5 = 50% läbipaistvus
    justifyContent: "center",
    alignItems: "center",
  },
});
