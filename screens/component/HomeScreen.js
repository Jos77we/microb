import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import Icon3 from "react-native-vector-icons/AntDesign";
import axios from "axios";

const HomeScreen = ({ route }) => {

  const { name } = route.params;

  const nav = useNavigation();
  useLayoutEffect(() => {
    nav.setOptions({
      headerShown: false,
    });
  });

  const [photoData, setPhotoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPhoto = async () => {
      try {
        const response = await axios.get(
          "https://microbserver.onrender.com/api/latest-photos"
        );
        setPhotoData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching latest photo:", error);
        setLoading(false);
      }
    };

    fetchLatestPhoto();
  }, []);

  const navigateToChat = (userID) => {
    nav.navigate("Chat", { userID }); // Navigate to Chat screen and pass userID as params
  };
  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../assets/background.jpg")}
        resizeMode="cover"
        className="flex-1"
      >
        {/* Header section */}
        <View className="flex-row pt-14">
          <View className="h-16 w-16 rounded-full bg-blue-500 ml-4"></View>
          <View className="flex-col ml-2 mt-2">
            <Text className="text-2xl font-semibold text-white">
              Hello {name}
            </Text>
            <Text className="font-medium text-lg text-white"> Welcome Back!</Text>
          </View>
        </View>
        {/* Device connected */}
        <ScrollView contentContainerStyle={style.scrollContainer}>
          <View className=" flex-col h-32 w-11/12  mt-5 ml-4 rounded-xl" style={style.contain}>
            <View className="h-9 mt-4">
              <Text className="font-extrabold text-lg ml-6 text-slate-200">
                Device Connected
              </Text>
            </View>
            <View className="h-24">
              <View className="h-12 mt-2 flex-row">
                <View>
                  <Text className="text-lg font-bold text-slate-200 mt-4 ml-4">
                    DX-239-330
                  </Text>
                </View>
                <View className="ml-48 mt-3">
                  <TouchableOpacity onPress={() => {
              nav.navigate("Device");
            }}>
                  <Icon name="radio" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          {/* AI related images and history */}
          <View
            className="flex-1 mt-5 ml-4 rounded-xl"
            style={style.container}
          >
            <View className="h-34 mt-4">
              <Text className="font-bold text-4xl ml-6 w-44 text-slate-200">
                Explore With the Power of AI
              </Text>
            </View>
            <View className="h-20 w-11/12 border-emerald-700 border-solid border-2 mt-2 ml-4 rounded-2xl">
              <View>
                <Text className="font-semibold text-lg ml-4 text-slate-200">Recent</Text>
              </View>
              <View>
                <View className="h-10 w-44 bg-black mt-2 ml-4 rounded-3xl">
                  <Text className="text-center text-slate-200 font-semibold text-base mt-2">Uploaded new images</Text>
                </View>
              </View>
            </View>
            <Text className="font-semibold text-lg ml-4 mt-2 text-slate-200">
              Collected Samples
            </Text>

            <View className="h-80 w-11/12 mt-2 ml-4 rounded-2xl">
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View className="h-62 flex-row">
                  {loading ? (
                    <Text className='text-slate-200'>Loading...</Text>
                  ) : photoData.length > 0 ? (
                    photoData.map((photo, index) => (
                      <TouchableOpacity
                key={index}
                onPress={() => navigateToChat(photo.userID)} // Pass userID to navigateToChat function
              >
                      <View
                        key={index}
                        className="h-64 w-48 rounded-xl mt-8 ml-4"
                      >
                        <Image
                          source={{
                            uri: `data:image/jpeg;base64,${photo.image}`,
                          }}
                          style={style.image}
                          className="rounded-xl"
                        />
                        <View className="h-14">
                          <View className="mt-1">
                        <Text style={style.title} className='text-slate-200 text-center'>{photo.title}</Text>
                        </View>
                        {/* <View className="ml-40">
                        <Icon2 name="uncharted" size={22} color="black" />
                        </View> */}
                        </View>
                      </View>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text>No photos found</Text>
                  )}
                </View>
              </ScrollView>
            </View>
          </View>
          <View className="h-80 w-11/12 ml-4 mt-4 rounded-xl" style={style.contain}> 
            <Text className="p-4 font-bold text-3xl text-slate-200">Activities</Text>
            
            <View className="h-20 w-11/12 bg-black rounded-full ml-4 mt-4 flex-row justify-center">
            <Icon3 name="dotchart" size={28} color="red" style={{marginTop: 20}}/>
              <Text className="text-slate-200 text-center text-2xl mt-6 ml-3">Latest Findings</Text>
              
            </View>
            <View className="h-20 w-11/12 bg-black rounded-full ml-4 mt-4 flex-row justify-center">
            <Image
                        source={require("../assets/MicrobIC.png")}
                        resizeMode="cover"
                        style={{ marginTop: 16 }}
                      />
              <Text className="text-slate-200 text-center text-2xl mt-6 ml-3">Chat with Microb AI</Text>
            </View>
            
            
          </View>
          <View className="h-4"></View>
        </ScrollView>
        <View style={style.tabBar} className="ml-2 rounded-xl">
          {/* <TouchableOpacity
            onPress={() => {
              nav.navigate("Chat");
            }}
          >
            <Icon2 name="uncharted" size={24} color="white" />
          </TouchableOpacity> */}
        </View>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    height: 600,
    width: "92%",
    backgroundColor: 'rgba(0, 0, 0, 0.40)'
  },
  tabBar: {
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60, // Set the height of your tab bar
    width: "96%",
    backgroundColor: "brown", // Change the background color as needed
  },
  contained: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    flex: 1, // Take up all available space
    width: undefined, // Remove fixed width
    height: undefined, // Remove fixed height
    resizeMode: "cover",
  },
  contain: {
    backgroundColor: 'rgba(0, 0, 0, 0.40)',
    
  }
});

export default HomeScreen;
