import {
  View,
  Text,
  FlatList,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import PostCard from "../components/PostCard";
import { firebase } from "@react-native-firebase/auth";
import moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";

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
} from "../styles/FeedStyles";

const Comment = (props) => {
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState("");
  const [text, setText] = useState("");
  const [question, setQuestion] = useState({});
  const [userData, setUserData] = useState(null);
  const list = [];
  const userList = [];
  const [userName, setUserName] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [currentImg, setCurrentImg] = useState(null);
  useEffect(() => {
    getUser(firebase.auth().currentUser.uid);
    getCurUserImg();
    if (props.route.params.postId !== postId) {
      firestore()
        .collection("posts")
        .doc(props.route.params.postId)
        .collection("comments")
        .get()
        .then((snapshot) => {
          let comments = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setComments(comments);
        });
      setPostId(props.route.params.postId);
      // This is a sample Text
      // The post part
      firestore()
        .collection("posts")
        .doc(props.route.params.postId)
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            //  console.log(documentSnapshot.data());
            list.push({
              id: documentSnapshot.data().id,
              userId: documentSnapshot.data().userId,
              userName: "User",
              userImg:
                "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
              postTime: documentSnapshot.data().postTime,
              post: documentSnapshot.data().post,
              title: documentSnapshot.data().title,
              postImg: documentSnapshot.data().postImg,
              liked: false,
              likes: null,
              comments: null,
            });
            setQuestion(list);
            // console.log(typeof question);
          }
        });
      // setPostId(props.route.params.postId);

      setPostId(props.route.params.postId);

      // User Part

      // setPosts(list);
    }
  }, [props.route.params.postId]);
  console.log("here is your property  ", userData);
  console.log("The Comments", comments);

  // console.log("This are the quesions 2:   " + question.post);

  const getUser = (authUid) => {
    firestore()
      .collection("users")
      .doc(authUid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("User Data", documentSnapshot.data().fname);
          setUserName(documentSnapshot.data().name);
          setUserImg(documentSnapshot.data().userImg);
          return documentSnapshot.data().fname;
        }
      });
  };

  const onCommentSend = () => {
    if (text != "") {
      firestore()
        .collection("posts")
        .doc(props.route.params.postId)
        .collection("comments")
        .add({
          creator: firebase.auth().currentUser.uid,
          text,
          fName: userName,
          userImg,
        });
    } else {
      alert("Please Write Something");
    }
  };

  const getCurUserImg = () => {
    firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setCurrentImg(documentSnapshot.data().userImg);
          return documentSnapshot.data().userImg;
        }
      });
  };

  return (
    <ScrollView>
      <View style={styles.Question}>
        <FlatList
          data={question}
          renderItem={({ item }) => <PostCard item={item} />}
        />
      </View>
      <View style={styles.addCom}>
        <UserImg
          source={{
            uri: currentImg
              ? currentImg ||
                "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg"
              : "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
          }}
        />
        <TextInput
          placeholder="Add Answer..."
          onChangeText={(text) => setText(text)}
          multiline={true}
          style={styles.input}
        />
        <TouchableOpacity
          style={{ paddingTop: 13 }}
          onPress={() => onCommentSend()}
        >
          <Ionicons name="send-sharp" size={25} />
        </TouchableOpacity>
      </View>
      <Divider />
      <View>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={comments}
          style={{ marginTop: 15 }}
          renderItem={({ item }) => (
            <>
              <Card>
                <UserInfo>
                  <UserImg
                    source={{
                      uri: item
                        ? item.userImg ||
                          "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg"
                        : "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
                    }}
                  />
                  <UserInfoText>
                    <TouchableOpacity>
                      <UserName>{item.fName}</UserName>
                    </TouchableOpacity>
                  </UserInfoText>
                </UserInfo>
                <PostText>{item.text}</PostText>
              </Card>
              <Divider />
            </>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  addCom: {
    margin: 10,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Question: {
    marginBottom: 15,
  },
  input: {
    borderRadius: 5,
    backgroundColor: "#fff",
    width: 260,
  },
});

export default Comment;
