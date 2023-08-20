export interface PostState {
  posts: [];
  message: null | string;
  loading: boolean;
  error: null | string;
  singlePost: any;
  selectedPost: any;
}

export enum PostActionTypes {
  START_REQUEST = "START_REQUEST",
  FINISH_REQUEST = "FINISH_REQUEST",
  ALL_POSTS_LOADED = "ALL_POSTS_LOADED",
  SELECT_POST = "SELECT_POST",
  SERVER_USER_ERROR = "SERVER_USER_ERROR",
  POST_UPDATED = "POST_UPDATED",
}

interface StartRequestAction {
  type: PostActionTypes.START_REQUEST;
}

interface FinishRequestAction {
  type: PostActionTypes.FINISH_REQUEST;
  payload: any;
}

interface AllPostsActions {
  type: PostActionTypes.ALL_POSTS_LOADED;
  payload: any;
}
interface SelectPostAction {
  type: PostActionTypes.SELECT_POST;
  payload: any;
}
interface PostUpadtedAction {
  type: PostActionTypes.POST_UPDATED;
  payload: any;
}

interface ServerErrorAction {
  type: PostActionTypes.SERVER_USER_ERROR;
  payload: string;
}

export type PostActions =
  | ServerErrorAction
  | FinishRequestAction
  | AllPostsActions
  | StartRequestAction
  | SelectPostAction
  | PostUpadtedAction;
