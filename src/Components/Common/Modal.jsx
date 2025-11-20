import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Button } from "./Button"; // Eeldan, et Button komponent on olemas

const ModalContent = ({ showHistory, showGuide, showSettings, wrongGuesses, data, onClose }) => {
    const historyData = data.filter((item) => item.active === false);
    const correctCount = historyData.length;

    const renderNotActiveItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.lineContainer}>
                <View style={styles.line} />
                <Text style={styles.wordText}>{item.word.charAt(0).toUpperCase() + item.word.slice(1)}</Text>
                <View style={styles.line} />
            </View>
            <Text style={styles.definitionText}>{item.definition}</Text>
        </View>
    );

    return (
        <View style={styles.modalBox}>
            {showGuide ? (
                <View style={styles.section}>
                    <Text style={styles.title}>Tagurpidi klassiruum</Text>
                    <Text style={styles.subtitle}>Õpi eesti keele sõnu mänguliselt</Text>
                    <View style={styles.guideList}>
                        <Text style={styles.guideText}>* Ekraanil on sõna seletus</Text>
                        <Text style={styles.guideText}>* Kirjuta õige sõna ja vajuta "OK"</Text>
                        <Text style={styles.guideText}>* Ajalugu asub üleval paremal</Text>
                        <Text style={styles.guideText}>* Juhendit saab taas kuvada üleval vasakul</Text>
                    </View>
                </View>
            ) : null}
            {showHistory ? (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Õigeid vastuseid</Text>
                    <Text style={styles.countText}>{correctCount}</Text>
                    <Text style={styles.sectionTitle}>Valesid vastuseid</Text>
                    <Text style={styles.countText}>{wrongGuesses}</Text>
                    <View style={styles.historyList}>
                        <FlatList
                            data={historyData}
                            renderItem={renderNotActiveItem}
                            keyExtractor={(item, index) => item.word + index}
                            contentContainerStyle={{ width: '100%' }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            ) : null}
            {showSettings ? (
                <View style={styles.section}>
                    <Text style={styles.title}>Seaded</Text>
                    <Text style={styles.modalText}>Tulevikus tulevad siia rakenduse seaded.</Text>
                </View>
            ) : null}
            <Button style="normal" title="Sulge" onPress={onClose} />
        </View>
    );
};

const styles = StyleSheet.create({
    modalBox: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        elevation: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    section: {
        marginBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#1f2937',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        color: '#374151',
    },
    guideList: {
        gap: 10,
    },
    guideText: {
        fontSize: 16,
        color: '#374151',
    },
    sectionTitle: {
        fontSize: 18,
        color: '#1f2937',
    },
    countText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 10,
    },
    historyList: {
        width: '100%',
        height: 200,
    },
    itemContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'black',
    },
    wordText: {
        fontSize: 20,
        marginHorizontal: 10,
    },
    definitionText: {
        fontSize: 16,
        color: '#374151',
    },
    modalText: {
        fontSize: 16,
        color: '#374151',
    },
});

export default ModalContent;