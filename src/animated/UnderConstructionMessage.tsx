import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

const { height, width } = Dimensions.get('window');

const UnderConstructionMessage: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-height / 2)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(500),
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.delay(4000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateY, rotate]);

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY }, { rotate: rotateInterpolate }],
        },
      ]}
    >
      <Svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <Rect x="5" y="10" width="50" height="30" fill="#FFD700" />
        <Path d="M15 45L10 55H50L45 45H15Z" fill="#FF6347" />
        <Path
          d="M10 55H50"
          stroke="#000"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <Rect x="15" y="15" width="30" height="20" fill="#FFF" />
        <Path
          d="M20 20H40V25H20V20ZM25 30H35"
          stroke="#000"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </Svg>
      <Text style={styles.text}>This feature is under construction!</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: height / 2 - 40,
    left: width / 2 - 150,
    width: 300,
    backgroundColor: '#B6DEFD',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    zIndex: 1000,
  },
  text: {
    color: '#6A0DAD',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default UnderConstructionMessage;
