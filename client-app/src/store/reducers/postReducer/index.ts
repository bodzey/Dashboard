import { PostActionTypes, PostActions, PostState } from "./types";

const initialState: PostState = {
  posts: [],
  message: null,
  loading: false,
  error: null,
  singlePost: null,
  selectedPost: null,
};

const PostReducer = (state = initialState, action: PostActions): PostState => {
  switch (action.type) {
    case PostActionTypes.START_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PostActionTypes.FINISH_REQUEST:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case PostActionTypes.ALL_POSTS_LOADED:
      return {
        ...state,
        loading: false,
        posts: action.payload.Payload,
        message: action.payload.Message,
      };
    case PostActionTypes.SELECT_POST:
      return { ...state, selectedPost: action.payload };
    case PostActionTypes.POST_UPDATED:
      return {
        ...state,
        message: action.payload.Message,
        posts: action.payload.Payload,
      };
    default:
      return state;
  }
};

export default PostReducer;
