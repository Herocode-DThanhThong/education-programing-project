import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IRootReducer } from "redux/rootReducer";
import { ChatStateType, Conversation, MessageRequest } from "types/ChatType";

const initialState: ChatStateType = {
  allConversation: null,
  currentConversation: null,
  messageError: null,
};
const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    setAllConversation: (
      state,
      action: PayloadAction<Conversation[]>
    ): void => {
      Object.assign(state, {
        allConversation: action.payload,
        messageError: null,
      });
    },
    getDetailConversationRequest: (
      state,
      action: PayloadAction<{ userIdOne: number; userIdTwo: number }>
    ): void => {
      Object.assign(state, {});
    },
    getDetailConversationSuccess: (
      state,
      action: PayloadAction<Conversation>
    ): void => {
      Object.assign(state, {
        currentConversation: action.payload,
        messageError: null,
      });
    },
    getDetailConversationFailure: (
      state,
      action: PayloadAction<string>
    ): void => {
      Object.assign(state, {
        currentConversation: null,
        messageError: action.payload,
      });
    },
    getDetailConversationByIdRequest: (
      state,
      action: PayloadAction<string>
    ): void => {
      Object.assign(state, {});
    },
    getDetailConversationByIdSuccess: (
      state,
      action: PayloadAction<Conversation>
    ): void => {
      Object.assign(state, {
        currentConversation: action.payload,
        messageError: null,
      });
    },
    getDetailConversationByIdFailure: (
      state,
      action: PayloadAction<string>
    ): void => {
      Object.assign(state, {
        currentConversation: null,
        messageError: action.payload,
      });
    },
    refreshConversation: (
      state,
      action: PayloadAction<string | undefined>
    ): void => {
      Object.assign(state, {});
    },
    removeConversation: (state): void => {
      Object.assign(state, {
        currentConversation: null,
        messageError: null,
      });
    },
    sendMessageRequest: (
      state,
      action: PayloadAction<{
        messageRequest: MessageRequest;
        sendMessageToReceiver: () => void;
      }>
    ): void => {
      Object.assign(state, {});
    },
    sendMessageSuccess: (
      state,
      action: PayloadAction<MessageRequest>
    ): void => {
      Object.assign(state, {});
    },
    sendMessageFailure: (state, action: PayloadAction<string>): void => {
      Object.assign(state, {
        messageError: null,
      });
    },
  },
});

export const chatActions = chatSlice.actions;
export const allConversation = (
  state: IRootReducer
): Array<Conversation> | null => state.chatReducer.allConversation;
export const currentConversation = (state: IRootReducer): Conversation | null =>
  state.chatReducer.currentConversation;
export const chatMessageError = (state: IRootReducer): string | null =>
  state.chatReducer.messageError;

export default chatSlice.reducer;
