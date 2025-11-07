import { useSignUp, useOAuth } from '@clerk/clerk-expo'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { makeRedirectUri } from 'expo-auth-session'

WebBrowser.maybeCompleteAuthSession()

export default function Register() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const { isLoaded, signUp, setActive } = useSignUp()
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      const redirectUrl = makeRedirectUri({
        scheme: 'gencoach',
        path: '/oauth-native-callback'
      })
      
      const { createdSessionId, setActive: setActiveSession } = await startOAuthFlow({ redirectUrl })
      
      if (createdSessionId && setActiveSession) {
        await setActiveSession({ session: createdSessionId })
        router.replace("/(tabs)")
      }
    } catch (error: any) {
      console.error("Google OAuth error:", error)
      Alert.alert("Error", "Failed to sign in with Google")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateAccount = async () => {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    try {
      setLoading(true)
      if (!isLoaded) return

      await signUp.create({
        emailAddress: email.trim(),
        password: password,
        firstName: fullName.split(' ')[0],
        lastName: fullName.split(' ').slice(1).join(' ') || undefined,
      })

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" })

      Alert.alert(
        "Verification Required",
        "Please check your email for a verification code",
        [
          {
            text: "OK",
            onPress: () => router.push({
              pathname: "/(auth)/verify-email",
              params: { email }
            } as any)
          }
        ]
      )
    } catch (error: any) {
      console.error("Sign up error:", error)
      Alert.alert("Error", error.errors?.[0]?.message || "Failed to create account")
    } finally {
      setLoading(false)
    }
  }

  return (
    <LinearGradient
      colors={["#000000", "#001a0d", "#003319"]}
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
        <Text style={styles.title}>Grow With Guidance</Text>

        <View style={styles.toggleContainer}>
          <TouchableOpacity 
            style={[styles.toggleButton, styles.inactive]}
            onPress={() => router.push('/(auth)/SignIn')}
          >
            <Text style={styles.toggleTextInactive}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.toggleButton, styles.active]}>
            <Text style={styles.toggleTextActive}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#7f7f7f" style={styles.icon} />
          <TextInput 
            style={styles.input}
            placeholder="Enter Your Full Name"
            placeholderTextColor="#7f7f7f"
            value={fullName}
            onChangeText={setFullName}
            editable={!loading}
          />
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
            placeholder="Create A Password"
            placeholderTextColor="#7f7f7f"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />
        </View>

        <TouchableOpacity
          style={[styles.createButton, loading && styles.buttonDisabled]}
          onPress={handleCreateAccount}
          activeOpacity={0.8}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#003e1d" />
          ) : (
            <>
              <Text style={styles.createButtonText}>Create Account</Text>
              <Ionicons name="sparkles" size={18} color="#003e1d" style={{ marginLeft: 8 }} />
            </>
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
    color: '#6b8577',
    fontSize: 14,
    marginTop: 8,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(0, 30, 15, 0.5)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1.5,
    borderColor: '#1a3d2e',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    backgroundColor: '#00ff88',
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
    backgroundColor: 'rgba(10, 30, 20, 0.6)',
    borderRadius: 30,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#2d5a45',
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
  createButton: {
    backgroundColor: '#00ff88',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    flexDirection: 'row',
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  createButtonText: {
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
    backgroundColor: '#2d5a45',
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
    backgroundColor: 'rgba(10, 30, 20, 0.6)',
    paddingVertical: 14,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#2d5a45',
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
    width: 70,
    height: 70,
    backgroundColor: '#00ff88',
    position: "absolute",
    opacity: 0.4,
  },
})
