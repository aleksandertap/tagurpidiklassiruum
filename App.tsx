import GameArea from "@/src/Components/GameArea";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

export default function App() {
  return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <View className="w-full h-full">
          <GameArea/>
        </View>
      </SafeAreaView>
  );
}
