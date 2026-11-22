import {
  clearAuthSession,
  getAuthSession,
  logoutApi,
  UserData,
} from "@/src/services/authService";
import { tabStyles } from "@/src/styles/tabStyles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfilScreen() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAuthSession().then((session) => {
      if (session) setUser(session.user);
    });
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const session = await getAuthSession();
      if (session) {
        await logoutApi(session.token);
      }
      await clearAuthSession();
      router.replace("/login");
    } catch {
      await clearAuthSession();
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={tabStyles.screenContainer}
      contentContainerStyle={tabStyles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={tabStyles.card}>
        <View style={tabStyles.profileAvatar}>
          <Ionicons name="people" size={30} color="#2563EB" />
        </View>
        <Text style={tabStyles.sectionTitle}>Profil Pengguna</Text>
        <Text style={tabStyles.sectionSubtitle}>
          {user?.name || "Loading..."}
        </Text>
        <Text style={[tabStyles.sectionSubtitle, { marginTop: 4 }]}>
          {user?.email || ""}
        </Text>
        {user?.no_hp && (
          <Text style={[tabStyles.sectionSubtitle, { marginTop: 4 }]}>
            {user.no_hp}
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={tabStyles.logoutButton}
        activeOpacity={0.8}
        onPress={handleLogout}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#DC2626" />
        ) : (
          <>
            <Ionicons name="log-out-outline" size={20} color="#DC2626" />
            <Text style={tabStyles.logoutButtonText}>Keluar dari Akun</Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
