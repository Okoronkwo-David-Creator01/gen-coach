import { useSignUp } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'

export default function VerifyEmail() {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)

  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()
  const { email } = useLocalSearchParams()

  const handleVerify = async () => {
    if (!code.trim()) {
      Alert.alert("Error", "Please enter the verification code")
      return
    }

    try {
      setLoading(true)
      if (!isLoaded) return

      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: code.trim(),
      })

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId })
        router.replace("/(tabs)")
      } else {
        Alert.alert("Error", "Verification failed. Please try again.")
      }
    } catch (error: any) {
      console.error("Verification error:", error)
      Alert.alert("Error", error.errors?.[0]?.message || "Invalid verification code")
    } finally {
      setLoading(false)
    }
  }

  const handleResendCode = async () => {
    try {
      setLoading(true)
      if (!isLoaded) return

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" })
      Alert.alert("Success", "Verification code resent to your email")
    } catch (error: any) {
      console.error("Resend error:", error)
      Alert.alert("Error", error.errors?.[0]?.message || "Failed to resend code")
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
        <Ionicons name="mail-outline" size={60} color="#00ff99" style={{ alignSelf: 'center', marginBottom: 20 }} />
        
        <Text style={styles.title}>Verify Your Email</Text>
        <Text style={styles.description}>
          We've sent a verification code to{'\n'}
          <Text style={styles.email}>{email}</Text>
        </Text>

        <View style={styles.inputContainer}>
          <Ionicons name="key-outline" size={20} color="#7f7f7f" style={styles.icon} />
          <TextInput 
            style={styles.input}
            placeholder="Enter verification code"
            placeholderTextColor="#7f7f7f"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            maxLength={6}
            editable={!loading}
          />
        </View>

        <TouchableOpacity
          style={[styles.verifyButton, loading && styles.buttonDisabled]}
          onPress={handleVerify}
          activeOpacity={0.8}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#003e1d" />
          ) : (
            <Text style={styles.verifyButtonText}>Verify Email</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resendButton}
          onPress={handleResendCode}
          disabled={loading}
        >
          <Text style={styles.resendButtonText}>Didn't receive code? Resend</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          disabled={loading}
        >
          <Ionicons name="arrow-back" size={20} color="#b3ffcb" />
          <Text style={styles.backButtonText}>Back to Sign Up</Text>
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
    marginBottom: 12,
  },
  description: {
    color: '#7f7f7f',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  email: {
    color: '#00ff99',
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 30,
    marginBottom: 20,
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
    fontSize: 16,
    letterSpacing: 4,
    textAlign: 'center',
  },
  verifyButton: {
    backgroundColor: '#00ff99',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  verifyButtonText: {
    color: '#003e1d',
    fontWeight: '700',
    fontSize: 15,
  },
  resendButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  resendButtonText: {
    color: '#00ff99',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    paddingVertical: 10,
  },
  backButtonText: {
    color: '#b3ffcb',
    fontSize: 14,
    marginLeft: 8,
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
