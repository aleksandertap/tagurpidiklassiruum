import React from 'react';
import { Alert, Modal, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ModalContent from '@/src/Components/Common/Modal';
import { GameArea } from '@/src/Components/Game/GameArea';
import Icon from '@/src/Components/Icon/Icon';
import { data } from '@/src/Globals/Data';

export default function App() {
    const insets = useSafeAreaInsets();

    // Leia aktiivne küsimus
    const activeQuestion = data.find(item => item.active) || data[0];

    const [isHistoryOpen, setHistoryOpen] = React.useState(false);
    const [isSettingsOpen, setSettingsOpen] = React.useState(false);
    const [wrongGuesses, setWrongGuesses] = React.useState(0); // Lisa state valede arvamiseks

    const handleHistoryPress = () => {
        console.log('Ajaloo nuppu vajutati!');
        setHistoryOpen(true);
    };
    const handleSettingsPress = () => {
        console.log('Seadete nuppu vajutati!');
        setSettingsOpen(true);
    };

    const handleGameComplete = (attemptWord: string, isCorrect: boolean) => {
        if (isCorrect) {
            Alert.alert("Palju õnne!", `Sa vastasid õigesti: ${attemptWord}`);
        } else {
            Alert.alert("Vale vastus!", `Sinu vastus oli ${attemptWord}. Proovi uuesti!`);
            setWrongGuesses(prev => prev + 1);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            {/* Ülemine menüüriba */}
            <View style={styles.header}>
                <Pressable onPress={() => setSettingsOpen(true)}>
                    <Icon type="settings" color="white" />
                </Pressable>

                <Pressable onPress={() => setHistoryOpen(true)}>
                    <Icon type="history" color="white" />
                </Pressable>
            </View>

            {/* Mänguala */}
            <View style={styles.gameArea}>
                <GameArea
                    questionText={activeQuestion.definition}
                    correctWord={activeQuestion.word.toUpperCase()}
                    onGameComplete={handleGameComplete}
                />
            </View>

            {/* HISTORY MODAL */}
            <Modal
                visible={isHistoryOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setHistoryOpen(false)}
            >
                <View style={styles.modalBackground}>
                    <ModalContent
                        showHistory={true}
                        showGuide={false}
                        showSettings={false}
                        wrongGuesses={wrongGuesses}
                        data={data}
                        onClose={() => setHistoryOpen(false)}
                    />
                </View>
            </Modal>

            {/* SETTINGS MODAL */}
            <Modal
                visible={isSettingsOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setSettingsOpen(false)}
            >
                <View style={styles.modalBackground}>
                    <ModalContent
                        showHistory={false}
                        showGuide={true}
                        showSettings={false}
                        wrongGuesses={wrongGuesses}
                        data={data}
                        onClose={() => setSettingsOpen(false)}
                    />
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9fafb' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 0, borderBottomColor: 'transparent' },
    titleContainer: { flex: 1, alignItems: 'center' },
    title: { fontSize: 20, fontWeight: 'bold', color: '#1f2937' },
    quizArea: { padding: 16, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
    questionText: { fontSize: 18, fontWeight: '600', color: '#111827' },
    gameArea: { flex: 1, width: '100%' },
    /* MODAL */
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#1f2937',
    },
    modalText: {
        fontSize: 16,
        color: '#374151',
        marginBottom: 20,
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: '#1f2937',
        paddingVertical: 10,
        borderRadius: 8,
    },
    closeButtonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});