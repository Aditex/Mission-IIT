import React, { useContext, useEffect, useState } from "react";
import { Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Text } from "react-native";
import {
  Container,
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
  PostTitle,
} from "../styles/FeedStyles";

import { AuthContext } from "../navigation/AuthProvider";

import moment from "moment";
import { TouchableOpacity } from "react-native";
import firestore from "@react-native-firebase/firestore";

const PostCard = ({ item, onPress }) => {
  const { user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  likeIcon = item.liked ? "heart" : "heart-outline";
  likeIconColor = item.liked ? "#2e64e5" : "#333";

  if (item.likes == 1) {
    likeText = "1 Like";
  } else if (item.likes > 1) {
    likeText = item.likes + " Likes";
  } else {
    likeText = "Like";
  }

  const getUser = async () => {
    await firestore()
      .collection("users")
      .doc(item.userId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          // console.log("User Data", documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Card key={item.id}>
      <UserInfo>
        <UserImg
          source={{
            uri: userData
              ? userData.userImg ||
                "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg"
              : "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
          }}
        />
        <UserInfoText>
          <TouchableOpacity>
            <UserName>
              {userData ? userData.fname || "Test" : "Test"}{" "}
              {userData ? userData.lname || "User" : "User"}
            </UserName>
          </TouchableOpacity>
          <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostTitle>{item.title}</PostTitle>
      <PostText>{item.post}</PostText>
      {/* {item.postImg != null ? <PostImg source={{uri: item.postImg}} /> : <Divider />} */}
      {item.postImg != null ? (
        <Image
          defaultImageSource={require("../assets/default-img.jpg")}
          source={{ uri: item.postImg }}
          style={{ width: "100%", height: 250 }}
          resizeMode="cover"
        />
      ) : (
        <Divider />
      )}

      <InteractionWrapper>
        <Interaction>
          <Ionicons name="md-chatbubble-outline" size={25} color="#000" />
          <InteractionText>
            <TouchableOpacity onPress={onPress}>
              <Text>View Answers...</Text>
            </TouchableOpacity>
          </InteractionText>
        </Interaction>
      </InteractionWrapper>
    </Card>
  );
};

export default PostCard;
