import { useSignIn } from '@clerk/clerk-expo'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { isLoaded, signIn, setActive } = useSignIn()
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      if (!isLoaded) return

      const { supportedFirstFactors } = await signIn.create({
        strategy: "oauth_google",
      })

      const googleOAuth = supportedFirstFactors?.find(
        (factor) => factor.strategy === "oauth_google"
      )

      if (googleOAuth) {
        const { externalAccount } = googleOAuth as any
        if (externalAccount) {
          await setActive({ session: externalAccount.id })
          router.replace("/(tabs)")
        }
      }
    } catch (error: any) {
      console.error("Google OAuth error:", error)
      Alert.alert("Error", error.errors?.[0]?.message || "Failed to sign in with Google")
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter your email and password")
      return
    }

    try {
      setLoading(true)
      if (!isLoaded) return

      const completeSignIn = await signIn.create({
        identifier: email.trim(),
        password: password,
      })

      if (completeSignIn.status === "complete") {
        await setActive({ session: completeSignIn.createdSessionId })
        router.replace("/(tabs)")
      } else {
        Alert.alert("Error", "Sign in failed. Please try again.")
      }
    } catch (error: any) {
      console.error("Sign in error:", error)
      Alert.alert("Error", error.errors?.[0]?.message || "Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <LinearGradient
      colors={["#001f0f", "#003e1d", "#004d26"]}
      style={styles.container}
    >
      <View style={styles.logoSection}>
        <Image 
          source={require("../../assets/images/gencoach1.png")} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.subTitle}>AI-powered learning made simple</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome Back</Text>

        <View style={styles.toggleContainer}>
          <TouchableOpacity style={[styles.toggleButton, styles.active]}>
            <Text style={styles.toggleTextActive}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.toggleButton, styles.inactive]}
            onPress={() => router.push('/(auth)/Register')}
          >
            <Text style={styles.toggleTextInactive}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={20} color="#7f7f7f" style={styles.icon} />
          <TextInput 
            style={styles.input}
            placeholder="Enter Your Email"
            placeholderTextColor="#7f7f7f"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#7f7f7f" style={styles.icon} />
          <TextInput 
            style={styles.input}
            placeholder="Enter Your Password"
            placeholderTextColor="#7f7f7f"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />
        </View>

        <TouchableOpacity 
          onPress={() => router.push('/(auth)/Forgot-Password')}
          disabled={loading}
        >
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.signInButton, loading && styles.buttonDisabled]}
          onPress={handleSignIn}
          activeOpacity={0.8}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#003e1d" />
          ) : (
            <Text style={styles.signInButtonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={[styles.googleButton, loading && styles.buttonDisabled]}
          onPress={handleGoogleSignIn}
          activeOpacity={0.8}
          disabled={loading}
        >
          <Ionicons name="logo-google" size={18} color="#b3ffcb" />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footerShapes}>
        <View style={[styles.block, { bottom: 80, left: 20, transform: [{ rotate: '45deg' }] }]} />
        <View style={[styles.block, { bottom: 120, right: 60, transform: [{ rotate: '30deg' }] }]} />
        <View style={[styles.block, { bottom: 50, right: 20, transform: [{ rotate: '60deg' }] }]} />
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 200,
    height: 60,
  },
  subTitle: {
    color: '#7f7f7f',
    fontSize: 14,
    marginTop: 8,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(0, 50, 25, 0.4)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#003e1d',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 30,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 26,
  },
  active: {
    backgroundColor: '#00ff99',
  },
  inactive: {
    backgroundColor: 'transparent',
  },
  toggleTextActive: {
    color: '#003e1d',
    fontWeight: '700',
    fontSize: 14,
  },
  toggleTextInactive: {
    color: '#7f7f7f',
    fontWeight: '600',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 30,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#003e1d',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    paddingVertical: 14,
    fontSize: 14,
  },
  forgotText: {
    color: '#00ff99',
    textAlign: 'right',
    marginBottom: 16,
    fontSize: 13,
  },
  signInButton: {
    backgroundColor: '#00ff99',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  signInButtonText: {
    color: '#003e1d',
    fontWeight: '700',
    fontSize: 15,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#003e1d',
  },
  dividerText: {
    color: '#7f7f7f',
    marginHorizontal: 12,
    fontSize: 13,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'transparent',
    paddingVertical: 14,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#003e1d',
  },
  googleButtonText: {
    color: '#b3ffcb',
    marginLeft: 10,
    fontWeight: '600',
    fontSize: 14,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  footerShapes: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 200,
  },
  block: {
    width: 60,
    height: 60,
    backgroundColor: '#00ff99',
    position: "absolute",
    opacity: 0.3,
  },
})
