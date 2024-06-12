import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGIN_USER } from '../graphql/mutations';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
    navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleLogin = async () => {
        if (!validateEmail(email)) {
            setEmailError('Invalid email format');
            return;
        } else {
            setEmailError('');
        }

        try {
            const { data } = await loginUser({ variables: { email, password } });
            await AsyncStorage.setItem('token', data?.loginUser?.token);
            navigation.navigate('RoomList');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.welcomeText}>Welcome back</Text>
                    <Text style={styles.subtitleText}>Log in and stay in touch with everyone!</Text>
                </View>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="e-mail address"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>
                            {showPassword ? (
                                <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" >
                                    <Path d="M10.4733 2.26051L9.47131 3.96559C6.026 3.81793 2.53147 5.48082 0.186545 8.93668C-0.059549 9.29879 -0.0630646 9.79098 0.179514 10.1636C1.20959 11.7211 2.46819 12.8988 3.84279 13.725L3.34709 14.6215C2.64397 15.9433 4.50373 17.0086 5.29475 15.75L12.4209 3.38903C13.103 2.26051 11.419 0.892934 10.4733 2.26051Z" fill="#BFC1CC" />
                                    <Path d="M17.8173 8.9297C16.6677 7.20001 15.2439 5.93087 13.6935 5.10118L12.6599 6.89415C13.7287 7.50235 14.7728 8.37774 15.7572 9.54493C13.6865 11.9602 11.3732 13.1555 9.04936 13.1555L7.91733 15.1207C11.556 15.5109 15.3388 13.8445 17.8138 10.1567C18.0599 9.79454 18.0599 9.29532 17.8173 8.9297Z" fill="#BFC1CC" />
                                    <Path d="M9.17911 12.9163C12.5963 12.5647 12.7194 9.25654 11.9986 8.02959L9.17911 12.9163Z" fill="#BFC1CC" />
                                </Svg>
                            ) : (
                                <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" >
                                    <Path d="M6.36663 11.1059C4.32406 8.39883 6.76038 4.86563 9.9807 5.77969C7.33695 7.36524 10.5959 10.698 12.2201 8.01563C13.2397 11.9566 8.3846 13.7496 6.36663 11.1059Z" fill="#BFC1CC" />
                                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M17.8139 9.60465C13.3526 16.2386 4.64787 16.3582 0.179514 9.60817C-0.0630646 9.23903 -0.059549 8.74684 0.186545 8.38473C4.6549 1.80348 13.3104 1.61012 17.8174 8.3777C18.06 8.74332 18.06 9.23903 17.8139 9.60465ZM2.23967 8.99293C6.48655 4.1484 11.6018 4.08512 15.7572 8.99293C11.6018 13.834 6.46545 13.7707 2.23967 8.99293Z" fill="#BFC1CC" />
                                </Svg>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.footerContainer}>
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
                        {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.loginButtonText}>Log in</Text>}
                    </TouchableOpacity>
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                    {error && <Text style={styles.errorText}>{error.message}</Text>}

                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.signUpText}>Don't have an account? <Text style={styles.signUpLinkText}>Sign up</Text></Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B6DEFD',
        padding: 20,
    },
    headerContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 30,
        marginTop: 100,
    },
    formContainer: {
        flex: 2,
    },
    footerContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 10,
    },
    welcomeText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#6A0DAD',
        marginBottom: 20,
    },
    subtitleText: {
        fontSize: 25,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 20,
        marginBottom: 20,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    passwordInput: {
        flex: 1,
        borderRadius: 14,
        paddingVertical: 20,
    },
    iconContainer: {
        padding: 5,
    },
    loginButton: {
        backgroundColor: '#6A0DAD',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginVertical: 10,
    },
    signUpText: {
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 20,
    },
    signUpLinkText: {
        color: '#6A0DAD',
        fontWeight: 'bold',
    },
});

export default LoginScreen;