import React, { Text, View } from "react-native";

export default function QuestionArea({ body }) {
  const placeholderText4Testing =
    "Millegi oluline koostisosa, olemuslik, iseloomulik osa või üksikasi.";

  return (
    <View className="bg-gray-100 p-4 rounded-md mx-4">
      <Text className="text-center text-2xl font-light">{body || placeholderText4Testing}</Text>
    </View>
  );
}
