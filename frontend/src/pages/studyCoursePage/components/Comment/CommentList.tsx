import React from "react";
import CommentItem from "./CommentItem";

type Props = {};

const CommentList = (props: Props) => {
  return (
    <>
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
    </>
  );
};

export default CommentList;
