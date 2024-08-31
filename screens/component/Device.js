import React, {useLayoutEffect} from 'react';
import { Image, ScrollView, View, StyleSheet, ImageBackground, Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const Device = () => {
  const nav = useNavigation();
  useLayoutEffect(() => {
    nav.setOptions({
      headerShown: false,
    });
  });
  
  return (
    <>
    <View className="flex-1">
    <ImageBackground
        source={require("../assets/background.jpg")}
        resizeMode="cover"
        className="flex-1"
      >
    <ScrollView>
      
      <View className="h-36 bg-black">
        <Text className="font-bold text-4xl ml-6 w-44 text-slate-200">Lets Upload your latest Findings!</Text>
      </View>
      <View className="h-36 bg-black flex-row mt-4">
        <View className="h-32 w-5/12 bg-yellow-400 ml-4">
          <Image 
          source={require("../Microbdv/leaf 200px.jpg")}
          style={style.image}/>
        </View>
        <View className="h-32 w-5/12 bg-yellow-400 ml-4">
        <Image 
          source={require("../Microbdv/leaf 400px.jpg")}
          style={style.image}/>
        </View>
      </View>

      <View className="h-36 bg-black flex-row mt-4">
        <View className="h-32 w-5/12 bg-yellow-400 ml-4">
          <Image 
          source={require("../Microbdv/leaf image.jpeg")}
          style={style.image}/>
        </View>
        <View className="h-32 w-5/12 bg-yellow-400 ml-4">
        <Image 
          source={require("../Microbdv/leafy.jpg")}
          style={style.image}/>
        </View>
      </View>
      
    </ScrollView>
    </ImageBackground>
    </View>
    </>
  );
};


const style = StyleSheet.create({
  image: {
    flex: 1, // Take up all available space
    width: undefined, // Remove fixed width
    height: undefined, // Remove fixed height
    resizeMode: "cover",
  },
})
export default Device;
