import { Dispatch } from "react";
import {
  addNewPost,
  getAllPosts,
  setSelectedPost,
  updatePost,
} from "../../../services/post-api-service";
import { PostActions, PostActionTypes } from "../../reducers/postReducer/types";
import { toast } from "react-toastify";

export const GetAllPosts = () => {
  return async (dispatch: Dispatch<PostActions>) => {
    try {
      dispatch({ type: PostActionTypes.START_REQUEST });
      const data = await getAllPosts();
      if (!data.IsSuccess) {
        dispatch({
          type: PostActionTypes.FINISH_REQUEST,
          payload: data.Message,
        });
        toast.error(data.Message);
      } else {
        dispatch({
          type: PostActionTypes.ALL_POSTS_LOADED,
          payload: data,
        });
      }
    } catch (e) {
      dispatch({
        type: PostActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};

export const AddNewPosts = (newPost: any) => {
  return async (dispatch: Dispatch<PostActions>) => {
    try {
      dispatch({ type: PostActionTypes.START_REQUEST });
      const data = await addNewPost(newPost);
      if (!data.IsSuccess) {
        dispatch({
          type: PostActionTypes.FINISH_REQUEST,
          payload: data.Message,
        });
        toast.error(data.Message);
      } else {
        dispatch({
          type: PostActionTypes.ALL_POSTS_LOADED,
          payload: data,
        });
        toast.success(data.Message);
      }
    } catch (e) {
      dispatch({
        type: PostActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};

export const UpdatePost = (post: any) => {
  return async (dispatch: Dispatch<PostActions>) => {
    try {
      dispatch({ type: PostActionTypes.START_REQUEST });
      const data = await updatePost(post);
      if (!data.IsSuccess) {
        dispatch({
          type: PostActionTypes.FINISH_REQUEST,
          payload: data.Message,
        });
        toast.error(data.Message);
      } else {
        dispatch({
          type: PostActionTypes.POST_UPDATED,
          payload: data.Message,
        });
        setSelectedPost(post);
        toast.success(data.Message);
      }
    } catch (e) {
      dispatch({
        type: PostActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};
