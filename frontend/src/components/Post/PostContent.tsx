import { Divider } from "@mui/material";
import { PostDetailsType } from "types";
import Viewer from "react-viewer";
import { useState } from "react";

type Props = {
  post: PostDetailsType;
};

const PostContent = ({ post }: Props) => {
  const [visible, setVisible] = useState(false);
  const handleGetGalleryImage = () => {
    return post.galleryImage.map((source, idx) => ({
      src: source.url,
      alt: source.id,
    }));
  };

  return (
    <div className="post-content">
      <div
        dangerouslySetInnerHTML={{ __html: post.content }}
        className="leading-6"
      />
      {post.galleryImage.length > 0 && (
        <div className="relative">
          {post.galleryImage.length > 1 && (
            <div
              onClick={() => setVisible(true)}
              className="cursor-pointer absolute flex flex-col justify-center bg-black top-0 left-0 right-0 rounded-md bottom-0 z-[1] bg-opacity-40"
            >
              <p className="text-gray-300 text-2xl mx-auto text-center">
                +{post.galleryImage.length}
              </p>
            </div>
          )}
          <img
            style={{
              padding: 0,
            }}
            className="border rounded-md mt-2"
            src={post.galleryImage[0].url}
            alt=""
          />
          <Viewer
            visible={visible}
            onClose={() => {
              setVisible(false);
            }}
            images={handleGetGalleryImage()}
          />
        </div>
      )}
      <div className="post-count-interactive mt-2">
        <span>{post.likedUsers.length} thích</span>
        <div className="flex gap-2">
          <span>{post.comments.length} bình luận</span>
          <span>{post.sharedUsers.length} chia sẻ</span>
        </div>
      </div>
      <Divider variant="fullWidth" style={{ margin: "10px 0 0 0" }} />
    </div>
  );
};

export default PostContent;
