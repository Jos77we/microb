import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import Typewriter from "react-native-typewriter";
import axios from "axios";

const ChatAi = () => {
  const nav = useNavigation();
  useLayoutEffect(() => {
    nav.setOptions({
      headerShown: false,
    });
  });

  const route = useRoute();
  const { userID } = route.params;

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingStarted, setTypingStarted] = useState(false);

  const [photoData, setPhotoData] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(
          `https://microbserver.onrender.com/api/selected-photo?userID=${userID}`
        );
        setPhotoData(response.data);
      } catch (error) {
        console.error("Error fetching photo:", error);
      }
    };

    fetchPhoto();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://microbserver.onrender.com/predict/get-image?userID=${userID}`
      );
      setText(response.data.prediction);
      setTypingStarted(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    fetchData();
  };

  return (
    <>
      <View className="flex-1">
        <ImageBackground
          source={require("../assets/background.jpg")}
          resizeMode="cover"
          className="flex-1"
        >
          <View className=" h-24 mt-12">
            <Text className="text-center font-extrabold text-3xl mt-10 text-white">
              Microb AI
            </Text>
          </View>
          <ScrollView>
            <View className="h-44 bg-green-900 mt-3 w-11/12 ml-4 rounded-xl">
              <View className="h-28 mt-1 w-11/12 ml-4 flex-row align-middle rounded-xl">
                <View className="h-14 w-14 bg-red-600 rounded-xl mt-3 ml-2">
                  {photoData && (
                    <Image
                      source={{
                        uri: `data:image/jpeg;base64,${photoData.image}`,
                      }}
                      style={styles.image}
                      className="rounded-xl"
                    />
                  )}
                </View>
                <View className="h-24 w-60 rounded-xl ml-3 mt-3">
                  <Text className="text-red-500 text-lg font-bold">Get a detailed analysis of the image obtained.</Text>
                  <Text className="text-white mt-3">"Present a detailed explanation of what the image is of and where it is found "</Text>
                </View>
              </View>
              <TouchableOpacity onPress={handleButtonClick}>
                <View className="h-11 w-1/3 mt-2 bg-black rounded-3xl ml-6 border-solid border-4 border-blue-900 ">
                  <Text className="text-center text-white font-semibold text-lg mt-1 ">
                    Analyze
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                padding: 20,
              }}
            >
              <View
                style={{
                  width: "100%",
                  minHeight: 150,
                  backgroundColor: "rgba(0, 0, 0, 0.40)",
                  padding: 10,
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                >
                  <View className="h-10 flex-row align-middle">
                    <View className="h-10 w-10 ml-2">
                      <Image
                        source={require("../assets/MicrobIC.png")}
                        resizeMode="cover"
                        style={{ marginTop: -5, marginLeft: -5 }}
                      />
                    </View>
                    <Text className="text-white ml-2 mt-2 text-lg font-bold">
                      Microb AI
                    </Text>
                  </View>
                  <View className="w-11/12 ml-4 mt-3">
                    {typingStarted && text ? (
                      <Typewriter
                        typing={1}
                        maxDelay={25}
                        minDelay={5}
                        style={{ fontSize: 16, color: "white" }}
                      >
                        {text}
                      </Typewriter>
                    ) : (
                      <Text
                        style={{
                          textAlign: "center",
                          fontStyle: "italic",
                          color: "white",
                        }}
                      >
                        Press the button to start typing.
                      </Text>
                    )}
                  </View>
                </ScrollView>
              </View>
              {loading && (
                <View style={{ marginTop: 10 }}>
                  <ActivityIndicator color="blue" />
                </View>
              )}
            </View>
            <View className="h-32"></View>
          </ScrollView>
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1, // Take up all available space
    width: undefined, // Remove fixed width
    height: undefined, // Remove fixed height
    resizeMode: "cover",
  },
});

export default ChatAi;
