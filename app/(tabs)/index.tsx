import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import * as Speech from "expo-speech";

type Msg = { id: string; from: "user" | "ai"; text: string };

export default function HomeScreen() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [lastAiMessage, setLastAiMessage] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg: Msg = {
      id: Date.now().toString(),
      from: "user",
      text: input,
    };

    // Simple mock AI reply for now – later your team will replace this with real AI.
    const aiReply =
      "This is a sample loan advisor reply. Later this will show real AI guidance.";
    const aiMsg: Msg = {
      id: Date.now().toString() + "_ai",
      from: "ai",
      text: aiReply,
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setLastAiMessage(aiReply);
    setInput("");
  };

  const speakLast = () => {
    if (!lastAiMessage) return;

    // For now, English. Later you can switch based on selected language.
    Speech.stop();
    Speech.speak(lastAiMessage, {
      language: "en-IN",
      rate: 1.0,
      pitch: 1.0,
    });
  };

  const speakSample = (lang: "en" | "hi" | "kn") => {
    let text = "";
    let voiceLang = "en-IN";

    if (lang === "en") {
      text =
        "Hi, I am your AI loan advisor. I will explain your loan eligibility in simple steps.";
      voiceLang = "en-IN";
    } else if (lang === "hi") {
      text =
        "नमस्ते, मैं आपका एआई लोन सलाहकार हूँ। मैं आपको सरल भाषा में लोन पात्रता समझाऊँगा।";
      voiceLang = "hi-IN";
    } else if (lang === "kn") {
      text =
        "ನಮಸ್ಕಾರ, ನಾನು ನಿಮ್ಮ ಎಐ ಸಾಲ ಸಲಹೆಗಾರ. ನಾನು ನಿಮ್ಮ ಸಾಲ ಅರ್ಹತೆಯನ್ನು ಸರಳವಾಗಿ ವಿವರಿಸುತ್ತೇನೆ.";
      voiceLang = "kn-IN";
    }

    Speech.stop();
    Speech.speak(text, {
      language: voiceLang,
      rate: 1.0,
      pitch: 1.0,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Multilingual AI Loan Advisor</Text>
      <Text style={styles.subtitle}>
        Home screen with chat + text-to-speech demo
      </Text>

      <View style={styles.voiceRow}>
        <TouchableOpacity
          style={styles.langButton}
          onPress={() => speakSample("en")}
        >
          <Text style={styles.langText}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.langButton}
          onPress={() => speakSample("hi")}
        >
          <Text style={styles.langText}>हिन्दी</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.langButton}
          onPress={() => speakSample("kn")}
        >
          <Text style={styles.langText}>ಕನ್ನಡ</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.headerRow}>
        <Text style={styles.chatTitle}>Loan Chat</Text>
        <TouchableOpacity style={styles.speakBtn} onPress={speakLast}>
          <Text style={styles.speakText}>Speak last AI reply</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={{ flex: 1, width: "100%" }}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.msgBubble,
              item.from === "user" ? styles.userBubble : styles.aiBubble,
            ]}
          >
            <Text>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Type your question about loans..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    textAlign: "center",
    color: "#4b5563",
    marginBottom: 16,
  },
  voiceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  langButton: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: "#2563eb",
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: "center",
  },
  langText: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  chatTitle: { fontSize: 16, fontWeight: "700" },
  speakBtn: {
    backgroundColor: "#f97316",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  speakText: { color: "white", fontSize: 11, fontWeight: "600" },
  msgBubble: {
    marginVertical: 4,
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  userBubble: {
    backgroundColor: "#dbeafe",
    alignSelf: "flex-end",
  },
  aiBubble: {
    backgroundColor: "#e5e7eb",
    alignSelf: "flex-start",
  },
  inputRow: {
    flexDirection: "row",
    marginTop: 8,
    paddingBottom: 12,
  },
  input: {
    flex: 1,
    backgroundColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
  },
  sendBtn: {
    marginLeft: 8,
    backgroundColor: "#2563eb",
    borderRadius: 10,
    paddingHorizontal: 14,
    justifyContent: "center",
  },
  sendText: { color: "white", fontWeight: "600" },
});
