import { Path } from "api/paths";
import { AxiosResponse } from "axios";
import { baseService } from "common/services/baseService";
import { loadingActions } from "common/services/loadingService/loadingSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { modifyCharacterContainsSpecialCharacter } from "utils";
type Props = {};

const LeftWall = (props: Props) => {
  const [allHashtags, setAllHashtags] = useState<Array<string>>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllHashtag();
  }, []);

  const fetchAllHashtag = async () => {
    dispatch(loadingActions.startLoading());
    try {
      const response: AxiosResponse<Array<string>> = await baseService.GET(
        `${Path.GetAllHashTag}`
      );
      setAllHashtags(response.data as Array<string>);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(loadingActions.endLoading());
    }
  };
  return (
    <div
      className="post-wrapper max-h-screen overflow-auto scrollbar scrollbar-thumb-transparent scrollbar-track-transparent"
      style={{ position: "fixed", width: "20%", padding: "12px 24px" }}
    >
      <h1 className="font-bold mb-3">Bài viết theo Hashtag</h1>
      {allHashtags.map((ht, index) => (
        <p key={ht}>
          {index + 1}.
          <Link
            to={`/community/post/search?content=${modifyCharacterContainsSpecialCharacter(
              ht
            )}`}
            className="leading-8 cursor-pointer text-blue-500 hover:opacity-80"
          >
            {" "}
            {ht}
          </Link>
        </p>
      ))}
    </div>
  );
};

export default LeftWall;
