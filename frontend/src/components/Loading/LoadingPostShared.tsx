import React from "react";

type Props = {};

export const LoadingPostShared = (props: Props) => {
  return (
    <div
      role="status"
      className="flex items-center justify-center h-56  bg-gray-300 rounded-lg animate-pulse w-full"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
