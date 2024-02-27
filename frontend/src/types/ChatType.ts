import { UserType } from "./UserType";

export type ChatStateType = {
  allConversation: Array<Conversation> | null;
  currentConversation: Conversation | null;
  messageError: string | null;
};

export type Conversation = {
  id: string;
  userFrom: Pick<
    UserType,
    "id" | "firstName" | "lastName" | "imageUrl" | "userName"
  >;
  userTo: Pick<
    UserType,
    "id" | "firstName" | "lastName" | "imageUrl" | "userName"
  >;
  messages: Array<Message>;
};

export type Message = {
  id: string;
  content: string;
  user: Pick<
    UserType,
    "id" | "firstName" | "lastName" | "imageUrl" | "userName"
  >;
  createdDate: string;
  updatedDate: string;
};

export type MessageRequest = {
  content: string;
  user: Pick<UserType, "id" | "userName">;
  conversation: {
    id: string;
  };
};

export type MessageRealTime = {
  conversationId: string;
  userSendToUserName: string;
  action: "CHAT_PRIVATE_ACTION";
};
