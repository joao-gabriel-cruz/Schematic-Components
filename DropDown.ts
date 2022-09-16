import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export type PropsDropDown = {
  title: string;
  task: {
    text: string;
  }[];
  onPress: () => void;
  isOpen: boolean;
};

export function DropDown({ onPress, isOpen, task, title }: PropsDropDown) {
  const [open, setOpen] = useState(isOpen);
  const opacity = useSharedValue(1);

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
    },

    dropInput: {
      height: 40,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#ccc",
      borderTopEndRadius: 5,
      borderTopStartRadius: 5,
    },
    dropDownContainer: {
      width: "100%",
    },
    dropDownItems: {
      width: "100%",
      opacity: 0,
    },
    dropItems: {
      width: "100%",
      height: 40,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#ccc",
      borderBottomEndRadius: 5,
      borderBottomStartRadius: 5,
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.dropDownContainer}>
        <View style={styles.dropInput}>
          <Text
            style={{
              marginLeft: 10,
            }}
          >
            {title}
          </Text>
          {!open ? (
            <Icon
              onPress={() => (
                (opacity.value = withTiming(open ? 0 : 1, { duration: 500 })),
                setOpen(!open)
              )}
              name="caretdown"
              size={20}
              color="#ccc"
              style={{
                marginHorizontal: 10,
              }}
            />
          ) : (
            <Icon
              onPress={() => (
                (opacity.value = withTiming(open ? 0 : 1, { duration: 500 })),
                setOpen(!open)
              )}
              name="caretup"
              size={20}
              color="#ccc"
              style={{
                marginHorizontal: 10,
              }}
            />
          )}
        </View>
        <Animated.View style={[styles.dropDownItems, animatedStyle]}>
          {task.length > 0 &&
            task.map((item: any, index: number) => (
              <TouchableOpacity
                style={styles.dropItems}
                key={index}
                onPress={onPress}
              >
                <View
                  style={{
                    width: "100%",
                  }}
                >
                  <Text>{item.text}</Text>
                </View>
              </TouchableOpacity>
            ))}
        </Animated.View>
      </View>
    </View>
  );
}
