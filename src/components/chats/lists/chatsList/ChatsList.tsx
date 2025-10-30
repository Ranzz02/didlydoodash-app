import { useEffect, useState } from "react";
import "./chatslist.css";
import AddChat from "./addChat/AddChat";
import { useQuery } from "react-query";
import { Chat } from "@/utils/types";
import { useOrgStore } from "@/stores/organisation";
import { toast } from "react-toastify";
import { API } from "@/services/api";
import { useNotification } from "@/context/NotificationContext";
import Tooltip from "@/components/ui/Tooltip";
import Badge from "@/components/ui/Badge";

export default function ChatsList() {
  const [addMore, setAddMore] = useState<boolean>(false);
  const [input, SetInput] = useState<string>("");
  const [chatId, selectChatId] = useState<string>();
  const { badges, resetBadge } = useNotification();
  const { organisation } = useOrgStore();

  // Fetch chats
  const {
    data: chats,
    isLoading,
    isError,
    error,
  } = useQuery<Chat[], Error>(["chats", organisation], getChats);

  const handleSelect = async (chat: Chat) => {
    const foundChat = chats?.find((item) => item.id === chat.id);

    if (foundChat) {
      selectChatId(foundChat.id);
      badges.set(foundChat.id, 0);
    }
  };

  const handleAddMore = () => {
    setAddMore(true);
  };

  const filteredChats = chats
    ? chats.filter((c) => c.name.toLowerCase().includes(input.toLowerCase()))
    : [];

  // Example: Reset badge when a chat is opened
  useEffect(() => {
    if (chatId) resetBadge(chatId); // Reset unread messages for the opened chat
  }, [chatId, resetBadge, badges]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="/icons/search.svg" alt="" />
          <input
            type="text"
            placeholder="Search"
            value={input}
            onChange={(e) => SetInput(e.target.value)}
          />
        </div>
        <Tooltip title="Add new chat">
          <img
            src="/icons/plus.svg"
            alt=""
            className="add"
            onClick={handleAddMore}
          />
        </Tooltip>
      </div>
      {filteredChats.map((chat) => (
        <Tooltip key={chat.id} title="Open chat" placement="bottom">
          <div className="item" style={{}} onClick={() => handleSelect(chat)}>
            <Badge content={badges.get(chat.id) || 0} variant="error">
              <img src="/icons/avatars/avatar-boy.svg" alt="" />
            </Badge>
            <div className="texts">
              <span>{chat.name}</span>
              {/* <p>{chat.lastMessage}</p> */}
            </div>
          </div>
        </Tooltip>
      ))}
      {addMore && <AddChat open={addMore} setOpen={setAddMore} />}
    </div>
  );
}

const getChats = async () => {
  const { organisation } = useOrgStore.getState();
  try {
    const result = await API.get(`/organisations/${organisation?.id}/chats`);
    return result.data.chats;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    toast.error(`Failed to get chats error message: ${error?.message}`, {
      position: "top-left",
    });
  }
};
