import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

import PostCard from "../components/PostCard";

import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";

import { Container } from "../styles/FeedStyles";

const Question = ({item}) => {
    const [posts, setPosts] = useState(null);

    const fetchPosts = async () => {
    try {
        const list = [];

        await firestore()
        .collection("posts")
        .orderBy("postTime", "desc")
        .get()
        .then((querySnapshot) => {
            // console.log('Total Posts: ', querySnapshot.size);

            querySnapshot.forEach((doc) => {
            const { userId, post, postImg, postTime, likes, comments } =
                doc.data();
            list.push({
                id: doc.id,
                userId,
                userName: "Test Name",
                userImg:
                "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
                postTime: postTime,
                post,
                postImg,
                liked: false,
                likes,
                comments,
            });
            });
        });

        setPosts(list);

        if (loading) {
        setLoading(false);
        }

        console.log("Posts: ", posts);
    } catch (e) {
        console.log(e);
    }
    };

    useEffect(() => {
    fetchPosts();
    }, []);

}