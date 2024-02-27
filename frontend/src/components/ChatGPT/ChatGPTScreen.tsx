import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Avatar } from "@mui/material";
import ChatGPTImage from "assests/images/chatgpt-logo.jpg";
import { useEffect, useRef, useState } from "react";
import ChatGPTScreenBottom from "./ChatGPTScreenBottom";
import ChatGPTScreenTop from "./ChatGPTScreenTop";
import MessageGreet from "./MessageGreet";
import MessageLoading from "./MessageLoading";
import { toast } from "react-toastify";
import { baseService } from "common/services/baseService";
import { Path } from "api/paths";
import { useAppSelector } from "common/hooks";
import { user } from "common/services/settingService/settingSlice";
import { UserType } from "types";
import axios from "axios";

type Props = {
  hideChat: () => void;
};

const ChatGPTScreen = ({ hideChat }: Props) => {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ id: String; content: String; isChatGPT: Boolean }>
  >([]);
  const [conversationDetail, setConversationDetail] = useState<{
    id: String;
    messages: Array<{ id: String; content: String; isChatGPT: Boolean }>;
    user: UserType;
  }>();
  const messageRef = useRef<HTMLDivElement | null>(null);
  const userDetailData = useAppSelector(user);
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "end",
      });
    }
  }, [messages.length]);
  useEffect(() => {
    if (userDetailData?.id) {
      fetchConversationDetail(userDetailData.id);
    }
  }, [userDetailData?.id]);
  const fetchConversationDetail = async (userId: Number) => {
    try {
      const response = await baseService.GET(
        `${Path.GetConversationChatGPTDetail}/${userId}`
      );
      setMessages(response.data.messages);
      setConversationDetail(response.data);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  const fetchCreateMessage = async (message: {
    content: String;
    isChatGPT: Boolean;
    chatGPTConversation: {
      id: String;
    };
  }) => {
    try {
      await baseService.POST(`${Path.CreateMessageChatGPT}`, message);
      fetchConversationDetail(userDetailData?.id as Number);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  const dummySendMessageChatGPT = async () => {
    return new Promise((resolve: any) => {
      setTimeout(() => {
        resolve({
          data: {
            id: "chatcmpl-123",
            object: "chat.completion",
            created: 1677652288,
            model: "gpt-3.5-turbo-0613",
            choices: [
              {
                index: 0,
                message: {
                  role: "assistant",
                  content:
                    "Stylesheet trong CSS là một tập tin hoặc khối mã CSS chứa các quy tắc và khai báo phong cách định dạng cho một trang web. Nó được sử dụng để áp dụng các thuộc tính và giá trị vào các thành phần của HTML, như font chữ, màu sắc, kích thước, căn chỉnh, hiệu ứng, v.v. Stylesheet giúp tách biệt kiểu dáng và cấu trúc của trang web, cho phép người phát triển thiết kế và tùy chỉnh giao diện một cách dễ dàng và linh hoạt.",
                },
                finish_reason: "stop",
              },
            ],
            usage: {
              prompt_tokens: 9,
              completion_tokens: 12,
              total_tokens: 21,
            },
          },
        });
      }, 5000);
    });
  };
  const sendMessageToChatGPT = async (content: string) => {
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_CHATGPT_API_KEY}`,
    };
    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content }],
      max_tokens: 512,
    };
    await fetchCreateMessage({
      content,
      isChatGPT: false,
      chatGPTConversation: {
        id: conversationDetail?.id as String,
      },
    });
    // dummy data
    setIsTyping(true);
    // dummySendMessageChatGPT()
    //   .then(async (response: any) => {
    //     await fetchCreateMessage({
    //       content: response.data.choices[0].message.content,
    //       isChatGPT: true,
    //       chatGPTConversation: {
    //         id: conversationDetail?.id as String,
    //       },
    //     });
    //     await fetchConversationDetail(userDetailData?.id as number);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     toast.error("Có lỗi xảy ra. Vui lòng thử lại");
    //   })
    //   .finally(() => {
    //     setIsTyping(false);
    //   });
    await axios
      .post(Path.ChatGPTApi, data, { headers })
      .then(async (response: any) => {
        await fetchCreateMessage({
          content: response.data.choices[0].message.content,
          isChatGPT: true,
          chatGPTConversation: {
            id: conversationDetail?.id as String,
          },
        });
        await fetchConversationDetail(userDetailData?.id as number);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Có lỗi xảy ra. Vui lòng thử lại");
      })
      .finally(() => {
        setIsTyping(false);
      });
  };
  return (
    <div className="h-[500px] w-[350px] shadow-lg">
      <div className="flex h-full flex-col flex-grow w-full bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Screen top */}
        <ChatGPTScreenTop isChatGPTTyping={isTyping} hideChat={hideChat} />

        {/* Screen content */}
        <div className="flex flex-col flex-grow h-0 px-4 overflow-auto">
          {/* Message Hello */}
          <MessageGreet />

          {messages.map((item, idx) =>
            item.isChatGPT ? (
              <div
                key={item.id as string}
                className="flex w-full mt-2 space-x-3 max-w-xs"
              >
                <div className="user-img">
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      m: 1,
                      bgcolor: "orange",
                      margin: "auto",
                    }}
                    alt="avatar"
                    src={ChatGPTImage}
                  />
                </div>

                <div
                  className={`p-3 shadow-lg border rounded-r-lg rounded-bl-lg`}
                >
                  <p className="text-sm text-left">{item.content}</p>
                </div>
              </div>
            ) : (
              <div
                key={item.id as string}
                className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end"
              >
                <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                  <div className="text-sm text-left">{item.content}</div>
                </div>

                <div className="user-img">
                  {userDetailData?.imageUrl ? (
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                      }}
                      alt="avatar"
                      src={userDetailData.imageUrl}
                    />
                  ) : (
                    <AccountCircleOutlinedIcon style={{ fontSize: "30px" }} />
                  )}
                </div>
              </div>
            )
          )}

          {/* Message loading  */}
          {isTyping && <MessageLoading />}

          <div className="my-2" ref={messageRef}></div>
        </div>

        {/* Screen bottom */}
        <ChatGPTScreenBottom
          isChatGPTTyping={isTyping}
          sendMessageToChatGPT={sendMessageToChatGPT}
        />
      </div>
    </div>
  );
};

export default ChatGPTScreen;
