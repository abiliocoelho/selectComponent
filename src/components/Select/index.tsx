import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Data = {
  id: number,
  title: string
}

type Props = {
  title: string;
  option: Data[];
  onSelect : (data: Data) => void
};

const { width } = Dimensions.get("window");
export function Select({ title, option, onSelect }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [titleSelect, setTitleSelect] = useState(title)
  const oldTitle = title
  
  function handleSelect(item:Data){
    setTitleSelect(item.title)
    setModalVisible(false)
  }

  function handleCancel(){
    setTitleSelect(oldTitle)
    setModalVisible(false)
  }
  
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setModalVisible(true)}
      >
        <Text numberOfLines={1} style={styles.title}>
          {titleSelect}
        </Text>
        <Icon name="chevron-down" size={28} />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView>
          <View style={styles.headerModal}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.headerBackCancel}
            >
              <Icon name="chevron-left" size={32} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Selecione</Text>
            <TouchableOpacity
              onPress={handleCancel}
              style={styles.headerButtonCancel}
            >
              <Text style={styles.headerCancel}>Cancelar</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={option}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.content} onPress={()=> {
                handleSelect(item)
                onSelect(item)
                }
                }>
                <Text>{item.title}</Text>
                { item.title === titleSelect && <Icon name="check" size={22} color="green"/>}
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: "row",
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderRadius: 8,
    borderColor: "#eee",
    borderWidth: 1,
  },
  title: {
    color: "#555",
    fontSize: 18,
    maxWidth: width - 52,
  },
  headerModal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
  },
  headerButtonCancel: {},
  headerBackCancel: {},
  headerCancel: {
    fontSize: 18,
    color: 'red'
  },
  content: {
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between"
  },
});
