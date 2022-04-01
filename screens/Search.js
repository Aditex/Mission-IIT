import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import firestore from "@react-native-firebase/firestore";
import PostCard from "../components/PostCard";
import { windowHeight, windowWidth } from "../utils/Dimentions";
import { Ionicons } from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import  FontAwesome from "react-native-vector-icons/FontAwesome";

import storage from "@react-native-firebase/storage";

import { Container } from "../styles/FeedStyles";
const Search = ({navigation, props}) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = (search) => {
    firestore()
      .collection("posts")
      .where("title", ">=", search)
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setPosts(posts);
      });
  };

  const ListHeader = () => {
    return null;
  };

  return (
    <View style={styles.input}>
      <TextInput
        style={styles.inputField}
        placeholder="Search A Query...."
        onChangeText={(search) => fetchPosts(search)}
      />
      <View style={{ marginRight: -370, marginTop:-53 }}>
        <FontAwesome5.Button
          name="search"
          size={22}
          backgroundColor="#EBEDEF"
          color="#2e64e5"
        />
      </View>

      <FlatList
        style={styles.flat}
        data={posts}
        renderItem={({ item }) => (
          <PostCard
            item={item}
            onPress={() => navigation.navigate("Comment", { postId: item.id })}
          />
        )}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  inputView: {
    paddingTop: 5,
    paddingBottom: 10,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EBEDEF",
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: "Lato-Regular",
    color: "#333",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    fontSize: 20,
    paddingTop: 5,
    paddingBottom: 10,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EBEDEF",
    borderRadius: 5,
    paddingHorizontal: 15,
    // marginRight:70,
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  flat: {
    paddingTop: 10,
    backgroundColor: "#EBEDEF",
  },
  listItem: {
    paddingBottom: 5,
    fontSize: 20,
    backgroundColor: "#E5E7E9",
  },
});
