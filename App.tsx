import React from 'react';
import { Alert, SafeAreaView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GameArea } from '@/src/Components/Game/GameArea';
import { data } from '@/src/Globals/Data';

export default function App() {
    const insets = useSafeAreaInsets();

    // Leia aktiivne küsimus
    const activeQuestion = data.find(item => item.active) || data[0];

    const handleGameComplete = (attemptWord: string, isCorrect: boolean) => {
        if (isCorrect) {
            Alert.alert("Palju õnne!", `Sa vastasid õigesti: ${attemptWord}`);
        } else {
            Alert.alert("Vale vastus!", `Sinu vastus oli ${attemptWord}. Proovi uuesti!`);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}>
            {/* Pealkiri ja ikoonid... sama kood */}

            {/* Mänguala */}
            <View style={{ flex: 1, width: '100%' }}>
                <GameArea
                    questionText={activeQuestion.definition}
                    correctWord={activeQuestion.word.toUpperCase()}
                    onGameComplete={handleGameComplete}
                />
            </View>
        </SafeAreaView>
    );
}
