import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomePage() {
  const [exploreOpen, setExploreOpen] = useState(false)
  const { user } = useUser()
  const userName = user?.firstName || user?.fullName || 'User'
  const totalCourses = 0

  const exploreItems = [
    { icon: 'document-text-outline', label: 'Doc' },
    { icon: 'language-outline', label: 'Language' },
    { icon: 'chatbubble-outline', label: 'Blog' },
    { icon: 'star-outline', label: 'Upgrade' },
    { icon: 'settings-outline', label: 'Settings' },
  ]

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#001f0f", "#003e1d", "#007900"]}
        locations={[0, 0.3, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setExploreOpen(true)} style={styles.menuButton}>
            <Ionicons name="menu" size={28} color="#b3ffcb" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>GEN COACH</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome Section */}
          <View style={styles.welcomeCard}>
            <View style={styles.welcomeHeader}>
              <Text style={styles.welcomeText}>
                Welcome back, {userName}!
              </Text>
              <Ionicons name="arrow-forward" size={20} color="#b3ffcb" />
            </View>
            <Text style={styles.welcomeSubtext}>Continue your learning</Text>
          </View>

          {/* Total Courses Section */}
          <View style={styles.statsCard}>
            <Text style={styles.statsNumber}>{totalCourses}</Text>
            <Text style={styles.statsLabel}>Total Courses</Text>
          </View>

          {/* AI Voice Chat Section */}
          <View style={styles.voiceChatCard}>
            <Ionicons name="mic-outline" size={24} color="#b3ffcb" />
            <Text style={styles.voiceChatText}>AI Voice Chat</Text>
          </View>

          {/* No Courses Section */}
          <View style={styles.emptyStateCard}>
            <Ionicons name="library-outline" size={80} color="#00ff88" style={styles.bookIcon} />
            <Text style={styles.emptyStateTitle}>No Courses Yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Create your list AI-powered course to start learning
            </Text>
            <TouchableOpacity style={styles.createButton}>
              <Text style={styles.createButtonText}>Create New Course</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Explore Sidebar Modal */}
        <Modal 
          transparent 
          visible={exploreOpen} 
          animationType="slide"
          onRequestClose={() => setExploreOpen(false)}
        >
          <TouchableOpacity 
            style={styles.modalBackdrop} 
            activeOpacity={1}
            onPress={() => setExploreOpen(false)}
          >
            <View style={styles.modalSheet}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Explore</Text>
                <TouchableOpacity onPress={() => setExploreOpen(false)}>
                  <Ionicons name="close" size={24} color="#b3ffcb" />
                </TouchableOpacity>
              </View>
              {exploreItems.map((item, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.modalItem}
                  onPress={() => {
                    setExploreOpen(false)
                    // Handle navigation for each item
                  }}
                >
                  <Ionicons name={item.icon as any} size={24} color="#b3ffcb" />
                  <Text style={styles.modalItemText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  menuButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  welcomeCard: {
    marginTop: 20,
    marginBottom: 16,
    padding: 20,
    backgroundColor: 'rgba(0, 30, 15, 0.6)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1a3d2e',
  },
  welcomeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    flex: 1,
  },
  welcomeSubtext: {
    color: '#6b8577',
    fontSize: 14,
    marginTop: 4,
  },
  statsCard: {
    backgroundColor: 'rgba(0, 30, 15, 0.6)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1a3d2e',
  },
  statsNumber: {
    color: '#fff',
    fontSize: 48,
    fontWeight: '800',
    marginBottom: 8,
  },
  statsLabel: {
    color: '#6b8577',
    fontSize: 16,
  },
  voiceChatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 30, 15, 0.6)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1a3d2e',
  },
  voiceChatText: {
    color: '#b3ffcb',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  emptyStateCard: {
    backgroundColor: 'rgba(0, 30, 15, 0.6)',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#1a3d2e',
  },
  bookIcon: {
    marginBottom: 20,
    opacity: 0.8,
  },
  emptyStateTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 12,
  },
  emptyStateSubtext: {
    color: '#6b8577',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  createButton: {
    backgroundColor: '#00ff88',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 32,
    minWidth: 200,
    alignItems: 'center',
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  createButtonText: {
    color: '#003e1d',
    fontSize: 16,
    fontWeight: '700',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: 'rgba(0, 30, 15, 0.98)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#1a3d2e',
    borderBottomWidth: 0,
    minHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a3d2e',
  },
  modalTitle: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 24,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(26, 61, 46, 0.3)',
  },
  modalItemText: {
    color: '#b3ffcb',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
  },
})
