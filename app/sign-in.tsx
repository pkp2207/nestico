import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'; // Import router for navigation
import images from '@/constants/images';
import icons from '@/constants/icons';
import { login, testAuth } from '@/lib/appwrite';
import * as WebBrowser from 'expo-web-browser';
import { useGlobalContext } from '@/lib/global-provider';
import { getCurrentUser } from '@/lib/appwrite';
// Initialize WebBrowser
WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { refetch } = useGlobalContext();

  // Check for existing session on component mount
  useEffect(() => {
    const checkSession = async () => {
      const session = await testAuth();
      if (session) {
        console.log("Existing session found, redirecting");
        router.replace("/"); // Replace with your main screen route
      }
    };

    checkSession();
  }, []);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      console.log("Starting login process...");
      const result = await login();

      if (result) {
        console.log("Login successful, checking user data");

        // Double-check that we can get the user data
        try {
          const user = await getCurrentUser();
          console.log("Retrieved user data:", user ? JSON.stringify(user) : "No user data");

          if (user) {
            console.log("User authenticated, navigating to main screen");
            await refetch({});
            router.replace("/"); // Replace with your main screen route
          } else {
            console.log("Got success result but no user data");
            Alert.alert('Authentication Issue', 'Login succeeded but user data is missing.');
          }
        } catch (userError) {
          console.error("Error getting user after login:", userError);
          Alert.alert('Authentication Issue', 'Login succeeded but failed to retrieve user data.');
        }
      } else {
        console.log("Login failed");
        Alert.alert('Authentication Failed', 'Unable to complete login. Please try again.');
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <Image source={images.onboarding} className='w-full h-4/6' resizeMode='contain' />
        <View className='px-10'>
          <Text className='text-base text-center uppercase font-rubik text-black-200'>Welcome to PKP-Nestico</Text>
          <Text className='text-3xl font-rubik-bold text-black-300 text-center mt-2'>Let's get you Closer to {'\n'}
            <Text className='text-primary-300'>Your Ideal Home</Text>
          </Text>
          <Text className='text-lg font-rubik text-black-200 text-center mt-12'>
            Login to PKP-Nestico with Google
          </Text>

          <TouchableOpacity
            onPress={handleLogin}
            className='bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5'
            disabled={isLoading}
          >
            <View className='flex flex-row items-center justify-center'>
              <Image source={icons.google} className='w-5 h-5' resizeMode='contain' />
              <Text className='text-lg font-rubik-medium text-black-300 ml-2'>
                {isLoading ? 'Connecting...' : 'Continue with Google'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn