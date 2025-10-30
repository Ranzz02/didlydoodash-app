import Chats from "@/components/chats/chats/Chats";
import List from "@/components/chats/lists/List";

export default function ChatsPage() {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: "flex",
      }}
    >
      <List />
      <Chats />
    </div>
  );
}
