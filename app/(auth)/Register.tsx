import { useSSO } from '@clerk/clerk-expo'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function Register() {

  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { startSSOFlow } = useSSO()
  const router = useRouter();


  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy: "oauth_google" })

      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId })
        router.replace("/(tabs)")
      }
    } catch (error) {
      console.error("OAuth error:", error);
    }
  }

  return (
    <LinearGradient
      colors={["#001f0f", "#003e1d", "#007900ff"]}
      style={styles.container}>

      {/* Brand Name Section */}
      <View style={styles.brandSection}>

        <View style={styles.logoSection}>
          <Image source={require("../../assets/images/gencoach1.png")} />
        </View>

        <Text style={styles.subTitle}>AI-powered learning made simple</Text>

      </View>

      {/* Registry Form */}
      <View style={styles.borderLine}>
        <Text style={styles.borderTitle}>Grow With Guidance</Text>

        <View style={styles.toggleContainer}>

          <TouchableOpacity style={[styles.toggleButton, styles.inactive]}
            onPress={() => router.push('/(auth)/SignIn')}>
            <Text style={styles.toggleTextInactive}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.toggleButton, styles.active]}>
            <Text style={styles.toggleTextActive}>Sign Up</Text>
          </TouchableOpacity>

        </View>

        {/* Users Demographics */}

        {/* Full-Name Section */}
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#b3ffcb" style={styles.icon} />
          <TextInput style={styles.input}
            placeholder="Enter Your Full Name"
            placeholderTextColor="#b3ffcb99"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        {/* Email Section */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={20} color="#b3ffcb" style={styles.icon} />
          <TextInput style={styles.input}
            placeholder="Enter Your Email"
            placeholderTextColor="#b3ffcb99"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        {/* Password Section */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#b3ffcb" style={styles.icon} />
          <TextInput style={styles.input}
            placeholder="Create A Password"
            placeholderTextColor="#b3ffcb99"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={styles.createButton}
          onPress={handleGoogleSignIn}
          activeOpacity={0.9}>
          <Text style={styles.createButtonText}>.+. Create Account .+.</Text>
        </TouchableOpacity>

        <Text style={styles.OrText}>Or</Text>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
          activeOpacity={0.9}>
          <Ionicons name="logo-google" size={18} color="#fff" />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footerShapes}>
        <View style={[styles.block, { bottom: 50, left: 30 }]} />
        <View style={[styles.block, { bottom: 30, right: 50 }]} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 5,
  },
  subTitle: {
    color: '#b3ffcb',
    fontSize: 16,
    marginTop: 4,
    textAlign: 'center',
  },
  borderLine: {
    width: '85%',
    backgroundColor: 'rgba(0, 40, 20, 0.3)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#00f>f99'
  },
  borderTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 15,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 25,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 25,
  },
  active: {
    backgroundColor: '#00ff99',
  },
  inactive: {},
  toggleTextActive: {
    color: '#003e1d',
    fontWeight: '600',
  },
  toggleTextInactive: {
    color: '#b3ffcb'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 60, 30, 0.5)',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#fff',
    paddingVertical: 10,
  },
  createButton: {
    backgroundColor: '#00ff99',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  createButtonText: {
    color: '#003e1d',
    fontWeight: '700',
    fontSize: 16,
  },
  OrText: {
    color: '#b3ffcb99',
    textAlign: 'center',
    marginVertical: 10,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#004d1f',
    paddingVertical: 12,
    borderRadius: 25,
  },
  googleButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600'
  },
  footerShapes: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100,
  },
  block: {
    width: 50,
    height: 50,
    backgroundColor: '#00ff99',
    transform: [{ rotate: '45deg' }],
    position: "absolute",
  },
});