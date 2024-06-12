import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Keyboard, TouchableWithoutFeedback, ScrollView, KeyboardAvoidingView, Platform, Linking } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutations';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);

  const handleSignUp = async () => {
    try {
      await registerUser({
        variables: { email, firstName, lastName, password, passwordConfirmation },
      });
      navigation.navigate('Login');
    } catch (err) {
      console.error(err);
    }
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.titleText}>Create account</Text>

            <Text style={styles.labelText}>e-mail address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.labelText}>first name</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
            />

            <Text style={styles.labelText}>last name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
            />

            <Text style={styles.labelText}>password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>
                {showPassword ? (
                  <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <Path d="M10.4733 2.26051L9.47131 3.96559C6.026 3.81793 2.53147 5.48082 0.186545 8.93668C-0.059549 9.29879 -0.0630646 9.79098 0.179514 10.1636C1.20959 11.7211 2.46819 12.8988 3.84279 13.725L3.34709 14.6215C2.64397 15.9433 4.50373 17.0086 5.29475 15.75L12.4209 3.38903C13.103 2.26051 11.419 0.892934 10.4733 2.26051Z" fill="#BFC1CC" />
                    <Path d="M17.8173 8.9297C16.6677 7.20001 15.2439 5.93087 13.6935 5.10118L12.6599 6.89415C13.7287 7.50235 14.7728 8.37774 15.7572 9.54493C13.6865 11.9602 11.3732 13.1555 9.04936 13.1555L7.91733 15.1207C11.556 15.5109 15.3388 13.8445 17.8138 10.1567C18.0599 9.79454 18.0599 9.29532 17.8173 8.9297Z" fill="#BFC1CC" />
                    <Path d="M9.17911 12.9163C12.5963 12.5647 12.7194 9.25654 11.9986 8.02959L9.17911 12.9163Z" fill="#BFC1CC" />
                  </Svg>
                ) : (
                  <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <Path d="M6.36663 11.1059C4.32406 8.39883 6.76038 4.86563 9.9807 5.77969C7.33695 7.36524 10.5959 10.698 12.2201 8.01563C13.2397 11.9566 8.3846 13.7496 6.36663 11.1059Z" fill="#BFC1CC" />
                    <Path fillRule="evenodd" clipRule="evenodd" d="M17.8139 9.60465C13.3526 16.2386 4.64787 16.3582 0.179514 9.60817C-0.0630646 9.23903 -0.059549 8.74684 0.186545 8.38473C4.6549 1.80348 13.3104 1.61012 17.8174 8.3777C18.06 8.74332 18.06 9.23903 17.8139 9.60465ZM2.23967 8.99293C6.48655 4.1484 11.6018 4.08512 15.7572 8.99293C11.6018 13.834 6.46545 13.7707 2.23967 8.99293Z" fill="#BFC1CC" />
                  </Svg>
                )}
              </TouchableOpacity>
            </View>

            <Text style={styles.labelText}>password confirmation</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={passwordConfirmation}
                onChangeText={setPasswordConfirmation}
                secureTextEntry={!showPasswordConfirmation}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPasswordConfirmation(!showPasswordConfirmation)} style={styles.iconContainer}>
                {showPasswordConfirmation ? (
                  <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <Path d="M10.4733 2.26051L9.47131 3.96559C6.026 3.81793 2.53147 5.48082 0.186545 8.93668C-0.059549 9.29879 -0.0630646 9.79098 0.179514 10.1636C1.20959 11.7211 2.46819 12.8988 3.84279 13.725L3.34709 14.6215C2.64397 15.9433 4.50373 17.0086 5.29475 15.75L12.4209 3.38903C13.103 2.26051 11.419 0.892934 10.4733 2.26051Z" fill="#BFC1CC" />
                    <Path d="M17.8173 8.9297C16.6677 7.20001 15.2439 5.93087 13.6935 5.10118L12.6599 6.89415C13.7287 7.50235 14.7728 8.37774 15.7572 9.54493C13.6865 11.9602 11.3732 13.1555 9.04936 13.1555L7.91733 15.1207C11.556 15.5109 15.3388 13.8445 17.8138 10.1567C18.0599 9.79454 18.0599 9.29532 17.8173 8.9297Z" fill="#BFC1CC" />
                    <Path d="M9.17911 12.9163C12.5963 12.5647 12.7194 9.25654 11.9986 8.02959L9.17911 12.9163Z" fill="#BFC1CC" />
                  </Svg>
                ) : (
                  <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <Path d="M6.36663 11.1059C4.32406 8.39883 6.76038 4.86563 9.9807 5.77969C7.33695 7.36524 10.5959 10.698 12.2201 8.01563C13.2397 11.9566 8.3846 13.7496 6.36663 11.1059Z" fill="#BFC1CC" />
                    <Path fillRule="evenodd" clipRule="evenodd" d="M17.8139 9.60465C13.3526 16.2386 4.64787 16.3582 0.179514 9.60817C-0.0630646 9.23903 -0.059549 8.74684 0.186545 8.38473C4.6549 1.80348 13.3104 1.61012 17.8174 8.3777C18.06 8.74332 18.06 9.23903 17.8139 9.60465ZM2.23967 8.99293C6.48655 4.1484 11.6018 4.08512 15.7572 8.99293C11.6018 13.834 6.46545 13.7707 2.23967 8.99293Z" fill="#BFC1CC" />
                  </Svg>
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp} disabled={loading}>
              {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.signUpButtonText}>Sign up</Text>}
            </TouchableOpacity>

            {error && <Text style={styles.errorText}>{error.message}</Text>}

            <Text style={styles.termsText}>
              By signing up you agree with our
              <Text style={styles.linkText} onPress={() => openLink('https://reactnative.dev/docs/getting-started')}> Terms and Conditions </Text>
              and
              <Text style={styles.linkText} onPress={() => openLink('https://reactnative.dev/docs/intro-react')}> Privacy Policy</Text>
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}>
                Already have an account? <Text style={styles.linkText}>Log in</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#b6defd',
    justifyContent: 'center',
    padding: 20,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6A0DAD',
    textAlign: 'left',
    marginBottom: 50,
  },
  labelText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 5,
    textAlign: 'left',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    borderColor: '#C5CAE9',
    borderWidth: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderColor: '#C5CAE9',
    borderWidth: 1,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
  },
  iconContainer: {
    padding: 5,
  },
  signUpButton: {
    backgroundColor: '#673AB7',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  termsText: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 10,
  },
  linkText: {
    fontWeight: 'bold',
    color: '#673AB7',
  },
  loginText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SignUpScreen;