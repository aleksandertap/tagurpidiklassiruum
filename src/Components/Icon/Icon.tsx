import { Fontisto } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

// -- colors and dimensions --
const PRIMARY_COLOR = '#FA5700';
const SHADOW_COLOR = '#E04E00';
const BOX_DIMENSION = 36;
const SHADOW_HEIGHT_OFFSET = 4;

// -- Icon komponent --
type IconProps = { // Parandatud: Suure algustähega (hea tava)
    type: 'showHistory' | 'showGuide';
    color?: string;
    onPress?: () => void;
};

const iconsMap: Record<IconProps['type'], 'history' | 'lightbulb'> = {
    showHistory: 'history',
    showGuide: 'lightbulb',
};

// See on nüüd selle faili vaikimisi eksport
export default function Icon({type, color = '#fff', onPress}: IconProps) {
    const iconName = iconsMap[type];
 return(
     <Pressable onPress={onPress}>
        {/* 1. iconContainer*/}
        <View style={styles.iconContainer}>
            {/* 2. shadowBox: darker layer, what is moved 4px down(shadow)*/}
            <View style={styles.bottomShadow} />
            {/* 3. mainBox: the main colored box with icon */}
            <View style={styles.iconBox}>
                <Fontisto name={iconName} size={24} color={color} />
            </View>
        </View>
    </Pressable>
 );
}

// KÕIK APP KOMPONENDIGA SEOTUD KOOD ON EEMALDATUD

// Stiilid jäävad alles, aga ainult need, mida Icon vajab
const styles = StyleSheet.create({
 //icon styles
 iconContainer: {
 width: BOX_DIMENSION, // Figma mõõt 36x36
 height: BOX_DIMENSION + SHADOW_HEIGHT_OFFSET,
 },
 bottomShadow: {
 //dark shadow box
 position: 'absolute',
 width: BOX_DIMENSION,
 height: BOX_DIMENSION,
 borderRadius: 8,
 backgroundColor: SHADOW_COLOR,

 // Move shadow down
 top: SHADOW_HEIGHT_OFFSET,
 left: 0,
 // removing shadow
 shadowOpacity: 0,
 elevation: 0,
 },
 iconBox: {
 //lighter box
 position: 'absolute',
 width: BOX_DIMENSION,
 height: BOX_DIMENSION,
 borderRadius: 8,
 alignItems: 'center',
 justifyContent: 'center',
backgroundColor: PRIMARY_COLOR,
 top: 0,
 left: 0,
 },
});