import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/stores/authStore";
import { postsService } from "@/apis/services/postsService";
import { Post } from "@/apis/models/post";
import { clearAuthToken } from "@/lib/auth/getAuthToken";
import tw from "@/lib/tailwind";

export default function PostsScreen() {
  const { setIsAuthenticated } = useAuthStore();
  
  // List states
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoadingPosts(true);
    setFetchError(null);
    try {
      const { ok, data: responseData } = await postsService.fetchPosts();

      if (!ok || !responseData || responseData.success === false) {
        const errorMessage = responseData?.error || "Failed to load posts.";
        throw new Error(errorMessage);
      }

      if (responseData.success && Array.isArray(responseData.data)) {
        setPosts(responseData.data);
      } else {
        setPosts([]);
      }
    } catch (err: any) {
      setFetchError(err.message || "Failed to load posts.");
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleCreatePost = async () => {
    if (!title.trim()) {
      setSubmitError("Post content cannot be empty.");
      return;
    }
    setSubmitError(null);
    setSubmitting(true);

    try {
      const { ok, data: responseData } = await postsService.createPost(title.trim());

      if (!ok || !responseData || responseData.success === false) {
        const errorMessage = responseData?.error || "Failed to submit post.";
        throw new Error(errorMessage);
      }

      if (responseData.success && responseData.data) {
        const newPost = responseData.data;
        setPosts((prevPosts) => [newPost, ...prevPosts]);
      } else {
        throw new Error("Invalid response from server");
      }

      setTitle("");
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit post.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            await clearAuthToken();
            setIsAuthenticated(false);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderPostItem = ({ item }: { item: Post }) => (
    <View style={tw.style("bg-white rounded-xl p-4 mb-3 border border-onboarding-borderGray border-l-4 border-l-onboarding-secondary shadow-sm")}>
      <Text style={tw.style("text-[15px] font-Inter-Regular text-core-contentPrimary leading-5 mb-2")}>
        {item.title}
      </Text>
      <View style={tw.style("flex-row justify-between items-center mt-2")}>
        {item.user?.email ? (
          <Text style={tw.style("text-xs text-core-labelGray font-Inter-Medium")}>
            By: {item.user.email}
          </Text>
        ) : (
          <View />
        )}
        {item.created_at && (
          <Text style={tw.style("text-xs text-core-labelGray")}>
            {new Date(item.created_at).toLocaleDateString()}
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={tw.style("flex-1 bg-onboarding-bg")}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={tw.style("flex-row justify-between items-center px-5 py-4 border-b border-onboarding-borderGray bg-white")}>
        <Text style={tw.style("text-2xl font-Inter-Bold text-onboarding-secondary")}>My Posts</Text>
        <TouchableOpacity style={tw.style("px-4 py-2 rounded-lg bg-onboarding-tabBg border border-onboarding-borderLight")} onPress={handleLogout}>
          <Text style={tw.style("text-core-contentSecondary font-Inter-SemiBold text-sm")}>Logout</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={tw.style("flex-1")}
      >
        {/* Create Post Form */}
        <View style={tw.style("bg-white m-4 p-4 rounded-2xl border border-onboarding-borderGray shadow-sm")}>
          <Text style={tw.style("text-base font-Inter-Bold text-core-contentPrimary mb-3")}>Create a New Post</Text>
          
          {submitError && (
            <Text style={tw.style("text-onboarding-errorText text-sm font-Inter-Medium mb-2.5")}>{submitError}</Text>
          )}

          <TextInput
            style={tw.style("bg-white text-core-contentPrimary border border-onboarding-inputBorder rounded-lg px-3 py-2 text-[15px] mb-3 h-20 text-top")}
            placeholder="What's on your mind? (Required)"
            placeholderTextColor={tw.color("onboarding-placeholder")}
            multiline
            numberOfLines={4}
            value={title}
            onChangeText={setTitle}
            editable={!submitting}
          />

          <TouchableOpacity
            style={tw.style("bg-onboarding-secondary rounded-lg py-3 items-center")}
            onPress={handleCreatePost}
            disabled={submitting}
          >
            {submitting ? (
              <ActivityIndicator color={tw.color("white")} />
            ) : (
              <Text style={tw.style("text-white text-[15px] font-Inter-Bold")}>Publish Post</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Posts List */}
        <View style={tw.style("flex-1")}>
          {loadingPosts ? (
            <View style={tw.style("flex-1 justify-center items-center p-8")}>
              <ActivityIndicator size="large" color={tw.color("onboarding-primary")} />
              <Text style={tw.style("text-core-labelGray mt-3 text-[15px] font-Inter-Medium")}>Fetching posts...</Text>
            </View>
          ) : fetchError ? (
            <View style={tw.style("flex-1 justify-center items-center p-8")}>
              <Text style={tw.style("text-onboarding-errorText text-center text-[15px] font-Inter-Medium mb-3")}>{fetchError}</Text>
              <TouchableOpacity style={tw.style("bg-onboarding-tabBg border border-onboarding-borderLight px-5 py-2.5 rounded-lg")} onPress={fetchPosts}>
                <Text style={tw.style("text-core-contentSecondary font-Inter-Bold")}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : posts.length === 0 ? (
            <View style={tw.style("flex-1 justify-center items-center p-8")}>
              <Text style={tw.style("text-core-labelGray text-[15px] font-Inter-Medium text-center")}>No posts yet. Write your first post above!</Text>
            </View>
          ) : (
            <FlatList
              data={posts}
              keyExtractor={(item) => item.id}
              renderItem={renderPostItem}
              contentContainerStyle={tw.style("px-4 pb-6")}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
