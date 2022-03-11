import { useContext, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { MonoText } from "../components/StyledText";
import { Text, View } from "../components/Themed";
import { AuthContext } from "../contexts/AuthContext";
import { todoStore } from "../store/todoStore";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const { removeToken } = useContext(AuthContext);
  const todos = todoStore((state) => state.todos);
  const todosAreLoading = todoStore((state) => state.isLoading);
  const fetchTodos = todoStore((state) => state.fetchTodos);
  const addTodo = todoStore((state) => state.addTodo);
  const removeTodo = todoStore((state) => state.removeTodo);

  useEffect(() => {
    fetchTodos();
  }, []);

  if (todosAreLoading) {
    return <MonoText>Loading</MonoText>;
  }

  return (
    <View style={styles.container}>
      {todos.map((todo) => {
        return (
          <TouchableOpacity
            key={todo._id}
            onPress={() => {
              if (!todo.draft) {
                removeTodo(todo._id);
              }
            }}
          >
            <MonoText style={{ color: todo.draft ? "red" : "black" }}>
              {todo.description}
            </MonoText>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        onPress={() =>
          addTodo("text", () => {
            console.log("WYWALILO BLAD");
            // handle toast error / handle red screen
          })
        }
      >
        <MonoText>Add todo</MonoText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => removeToken()}>
        <MonoText>Logout</MonoText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
