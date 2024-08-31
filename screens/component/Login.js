import React, { useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Image,
  ActivityIndicator
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios'
import { Feather } from '@expo/vector-icons';

const Login = () => {
  const nav = useNavigation();
  useLayoutEffect(() => {
    nav.setOptions({
      headerShown: false,
    });
  });

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (key, value) => {
    setFormData(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://microbserver.onrender.com/user/login', formData);
      if(response.status === 200){
        nav.navigate("Homescreen", { name: response.data.name })
      
    }
    } catch (error) {
      // Handle error
      console.error('Error submitting form:', error);
      Alert.alert('Login failed');
    } finally {
      setLoading(false); 
    }
  };

  const togglePasswordVisibility = () => {
    setFormData(prevState => ({
      ...prevState,
      showPassword: !prevState.showPassword
    }));
  };

  return (
    <>
    <View className="flex-1">
      <ImageBackground
      source={require("../assets/background.jpg")}
      resizeMode="cover"
      className="flex-1"
    >
       <View className="h-36 mt-12 flex-row align-middle justify-center">
        <View className="h-36 w-36">
        <Image
          source={require("../assets/MicrobFl.png")}
          resizeMode="cover"
          style={{ height: 280, width: 280, marginLeft: -70, marginTop: -50 }}
        />
        </View>
      </View>
      <View className="mt-14">
        <Text className="text-4xl font-bold ml-3 text-slate-200">Welcome Back!</Text>
        <Text className="text-2xl font-extrabold mt-14 text-center text-slate-200">Login Here</Text>
      </View>
      <View className="mt-4 ml-8">
        <Text className="font-semibold ml-1 text-lg text-slate-200">Email</Text>
        <View className="h-14 w-80 bg-slate-300 rounded-t-md border-solid border-slate-900 mt-2 border-b-2">
          <TextInput style={style.input} 
        placeholder="Email"
        value={formData.email}
        onChangeText={text => handleInputChange('email', text)}/>
        </View>
      </View>
      <View className="mt-10 ml-8">
        <Text className="font-semibold ml-1 text-lg text-slate-200">Password</Text>
        <View className="h-14 w-80 bg-slate-300 rounded-t-md border-solid border-slate-900 mt-2 border-b-2">
          <TextInput style={style.input} 
        placeholder="Password"
        value={formData.password}
        onChangeText={text => handleInputChange('password', text)}
        secureTextEntry={!formData.showPassword}/>
        <TouchableOpacity onPress={togglePasswordVisibility} style={{marginTop: -8, marginLeft: 270}}>
          <Feather name={formData.showPassword ? 'eye' : 'eye-off'} size={24} color="black" />
        </TouchableOpacity>
        </View>
      </View>
      <View className="mt-6">
        <Text className="ml-8 font-semibold text-blue-600">
          Forgot password
        </Text>
        
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <TouchableOpacity
            onPress={handleSubmit}
          >
            <View className="h-12 w-64 border-solid border-2 border-blue-700 mx-20 rounded-2xl mt-10 flex justify-center">
                <Text className="text-center font-bold text-blue-500 text-xl">Login</Text>
              </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => {
            nav.navigate("SignUp");
          }}
        >
        <View className="h-12 mt-2 flex justify-center">
            <Text className="text-center font-semibold text-lg text-slate-200">New User?<Text className="text-blue-700 text-lg">SignUp</Text></Text>
          </View>
        </TouchableOpacity>
      </View>
      </ImageBackground>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  input: {
    top: 22,
    fontSize: 18,
    marginLeft: 8,
    fontWeight: "400",
  }
});

export default Login;
