import { GraphQLResolveInfo } from 'graphql';
import { ChatModelSuccessResponse, MessageModelSuccessResponse, UserModelSuccessResponse, SignUpModelSuccessResponse, LogInModelSuccessResponse } from '../types/servicesRest';
import { MyContext } from '../index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AcceptFriendshipInput = {
  userToAccept?: InputMaybe<Scalars['ID']>;
  userToAcceptEmail?: InputMaybe<Scalars['String']>;
  userToAcceptUsername?: InputMaybe<Scalars['String']>;
};

export type AcceptFriendshipResponse = {
  __typename?: 'AcceptFriendshipResponse';
  friendAdded?: Maybe<User>;
};

export type AddParticipantsInput = {
  chatId: Scalars['ID'];
  participants: Array<ParticipantInput>;
};

export type AddParticipantsResponse = {
  __typename?: 'AddParticipantsResponse';
  chatModified: Chat;
};

export type Chat = {
  __typename?: 'Chat';
  avatar?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastActionDate: Scalars['String'];
  lastMessage?: Maybe<Message>;
  messages: Array<Message>;
  name: Scalars['String'];
  participants: Array<ChatUser>;
  phrase: Scalars['String'];
  type: ChatType;
  viewerAsChatUser: ChatUser;
};

export enum ChatType {
  Group = 'GROUP',
  Individual = 'INDIVIDUAL'
}

export type ChatUser = UserInterface & {
  __typename?: 'ChatUser';
  admin: Scalars['Boolean'];
  avatar?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  individualChat?: Maybe<Chat>;
  name: Scalars['String'];
  participantSince: Scalars['String'];
  phrase: Scalars['String'];
  status: Status;
  username: Scalars['String'];
};

export type CreateGroupChatInput = {
  avatar?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  participants: Array<ParticipantInput>;
  phrase: Scalars['String'];
};

export type CreateMessageInput = {
  chatId: Scalars['ID'];
  content: Scalars['String'];
  sentAt: Scalars['String'];
  sentById: Scalars['ID'];
};

export type CreateMessageResponse = {
  __typename?: 'CreateMessageResponse';
  error?: Maybe<Error>;
  message?: Maybe<Message>;
  success: Scalars['Boolean'];
};

export type Error = {
  __typename?: 'Error';
  code?: Maybe<Scalars['Int']>;
  reason: Scalars['String'];
};

export type FriendRequest = {
  __typename?: 'FriendRequest';
  sentAt: Scalars['String'];
  user: User;
};

export type FriendshipRequestReceivedSubscriptionResponse = {
  __typename?: 'FriendshipRequestReceivedSubscriptionResponse';
  accepterUser: User;
  requesterUser: User;
};

export type FriendshipResponseReceivedSubscriptionResponse = {
  __typename?: 'FriendshipResponseReceivedSubscriptionResponse';
  accept: Scalars['Boolean'];
  accepterUser?: Maybe<User>;
  requesterUser?: Maybe<User>;
};

export type GetMessagesInput = {
  chatId?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['ID']>;
};

export type GetOrCreateChatResponse = {
  __typename?: 'GetOrCreateChatResponse';
  chat: Chat;
  created?: Maybe<Scalars['Boolean']>;
};

export type GetOrCreateIndividualChatInput = {
  userId: Scalars['String'];
};

export type GetUserInput = {
  userId: Scalars['ID'];
};

export type LeaveGroupChatInput = {
  chatId: Scalars['ID'];
};

export type LeaveGroupChatResponse = {
  __typename?: 'LeaveGroupChatResponse';
  chatId: Scalars['String'];
  success: Scalars['Boolean'];
};

export type LogInResponse = {
  __typename?: 'LogInResponse';
  success: Scalars['Boolean'];
};

export type LogOutResponse = {
  __typename?: 'LogOutResponse';
  success: Scalars['Boolean'];
};

export type Message = {
  __typename?: 'Message';
  chat: Chat;
  content: Scalars['String'];
  id: Scalars['ID'];
  sentAt: Scalars['String'];
  sentBy: ChatUser;
};

export type MessageCreatedSubscriptionResponse = {
  __typename?: 'MessageCreatedSubscriptionResponse';
  message?: Maybe<Message>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptFriendship: AcceptFriendshipResponse;
  addParticipants: AddParticipantsResponse;
  createGroupChat: GetOrCreateChatResponse;
  createMessage: CreateMessageResponse;
  getOrCreateIndividualChat: GetOrCreateChatResponse;
  leaveGroupChat: LeaveGroupChatResponse;
  login: LogInResponse;
  logout: LogOutResponse;
  rejectFriendship: RejectFriendshipResponse;
  removeFriendship: RemoveFriendshipResponse;
  removeParticipant: RemoveParticipantResponse;
  requestFriendship: RequestFriendshipResponse;
  setLanguage: SetLanguageResponse;
  signup: SignUpResponse;
};


export type MutationAcceptFriendshipArgs = {
  input: AcceptFriendshipInput;
};


export type MutationAddParticipantsArgs = {
  input?: InputMaybe<AddParticipantsInput>;
};


export type MutationCreateGroupChatArgs = {
  input: CreateGroupChatInput;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


export type MutationGetOrCreateIndividualChatArgs = {
  input: GetOrCreateIndividualChatInput;
};


export type MutationLeaveGroupChatArgs = {
  input: LeaveGroupChatInput;
};


export type MutationLoginArgs = {
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


export type MutationRejectFriendshipArgs = {
  input: RejectFriendshipInput;
};


export type MutationRemoveFriendshipArgs = {
  input: RemoveFriendshipInput;
};


export type MutationRemoveParticipantArgs = {
  input?: InputMaybe<RemoveParticipantInput>;
};


export type MutationRequestFriendshipArgs = {
  input: RequestFriendshipInput;
};


export type MutationSetLanguageArgs = {
  input?: InputMaybe<SetLanguageInput>;
};


export type MutationSignupArgs = {
  input?: InputMaybe<SignUpInput>;
};

export type ParticipantInput = {
  admin: Scalars['Boolean'];
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  chats: Array<Chat>;
  friendshipRequestsReceived: Array<FriendRequest>;
  messages: Array<Message>;
  user: User;
  viewer?: Maybe<User>;
};


export type QueryMessagesArgs = {
  input: GetMessagesInput;
};


export type QueryUserArgs = {
  input: GetUserInput;
};

export type RejectFriendshipInput = {
  userToReject?: InputMaybe<Scalars['ID']>;
  userToRejectEmail?: InputMaybe<Scalars['String']>;
  userToRejectUsername?: InputMaybe<Scalars['String']>;
};

export type RejectFriendshipResponse = {
  __typename?: 'RejectFriendshipResponse';
  friendRejected: User;
};

export type RemoveFriendshipInput = {
  userToRemoveEmail?: InputMaybe<Scalars['String']>;
  userToRemoveId?: InputMaybe<Scalars['ID']>;
  userToRemoveUsername?: InputMaybe<Scalars['String']>;
};

export type RemoveFriendshipResponse = {
  __typename?: 'RemoveFriendshipResponse';
  userRemoved: User;
};

export type RemoveParticipantInput = {
  chatId: Scalars['ID'];
  participantId: Scalars['ID'];
};

export type RemoveParticipantResponse = {
  __typename?: 'RemoveParticipantResponse';
  chatId: Scalars['ID'];
  participantId: Scalars['ID'];
  success: Scalars['Boolean'];
};

export type RequestFriendshipInput = {
  userToAdd?: InputMaybe<Scalars['ID']>;
  userToAddEmail?: InputMaybe<Scalars['String']>;
  userToAddUsername?: InputMaybe<Scalars['String']>;
};

export type RequestFriendshipResponse = {
  __typename?: 'RequestFriendshipResponse';
  friendAdded?: Maybe<User>;
};

export type SetLanguageInput = {
  language: Scalars['String'];
};

export type SetLanguageResponse = {
  __typename?: 'SetLanguageResponse';
  language: Scalars['String'];
  success: Scalars['Boolean'];
};

export type SignUpInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type SignUpResponse = {
  __typename?: 'SignUpResponse';
  success: Scalars['Boolean'];
};

export enum Status {
  Offline = 'OFFLINE',
  Online = 'ONLINE'
}

export type Subscription = {
  __typename?: 'Subscription';
  friendshipRequestReceived?: Maybe<FriendshipRequestReceivedSubscriptionResponse>;
  friendshipResponseReceived?: Maybe<FriendshipResponseReceivedSubscriptionResponse>;
  messageCreated?: Maybe<MessageCreatedSubscriptionResponse>;
};

export type User = UserInterface & {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  chat?: Maybe<Chat>;
  chats: Array<Chat>;
  email: Scalars['String'];
  friends: Array<User>;
  id: Scalars['ID'];
  individualChat?: Maybe<Chat>;
  name: Scalars['String'];
  phrase: Scalars['String'];
  settings?: Maybe<UserSettings>;
  status: Status;
  username: Scalars['String'];
};


export type UserChatArgs = {
  chatId?: InputMaybe<Scalars['String']>;
};

export type UserInterface = {
  avatar?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  phrase: Scalars['String'];
  status: Status;
  username: Scalars['String'];
};

export type UserSettings = {
  __typename?: 'UserSettings';
  language?: Maybe<Scalars['String']>;
};

export type Viewer = UserInterface & {
  __typename?: 'Viewer';
  avatar?: Maybe<Scalars['String']>;
  chat?: Maybe<Chat>;
  chats: Array<Chat>;
  email: Scalars['String'];
  friends: Array<User>;
  id: Scalars['ID'];
  name: Scalars['String'];
  phrase: Scalars['String'];
  settings?: Maybe<UserSettings>;
  status: Status;
  username: Scalars['String'];
};


export type ViewerChatArgs = {
  chatId?: InputMaybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AcceptFriendshipInput: AcceptFriendshipInput;
  AcceptFriendshipResponse: ResolverTypeWrapper<Omit<AcceptFriendshipResponse, 'friendAdded'> & { friendAdded?: Maybe<ResolversTypes['User']> }>;
  AddParticipantsInput: AddParticipantsInput;
  AddParticipantsResponse: ResolverTypeWrapper<Omit<AddParticipantsResponse, 'chatModified'> & { chatModified: ResolversTypes['Chat'] }>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Chat: ResolverTypeWrapper<ChatModelSuccessResponse>;
  ChatType: ChatType;
  ChatUser: ResolverTypeWrapper<ChatModelSuccessResponse>;
  CreateGroupChatInput: CreateGroupChatInput;
  CreateMessageInput: CreateMessageInput;
  CreateMessageResponse: ResolverTypeWrapper<Omit<CreateMessageResponse, 'message'> & { message?: Maybe<ResolversTypes['Message']> }>;
  Error: ResolverTypeWrapper<Error>;
  FriendRequest: ResolverTypeWrapper<Omit<FriendRequest, 'user'> & { user: ResolversTypes['User'] }>;
  FriendshipRequestReceivedSubscriptionResponse: ResolverTypeWrapper<Omit<FriendshipRequestReceivedSubscriptionResponse, 'accepterUser' | 'requesterUser'> & { accepterUser: ResolversTypes['User'], requesterUser: ResolversTypes['User'] }>;
  FriendshipResponseReceivedSubscriptionResponse: ResolverTypeWrapper<Omit<FriendshipResponseReceivedSubscriptionResponse, 'accepterUser' | 'requesterUser'> & { accepterUser?: Maybe<ResolversTypes['User']>, requesterUser?: Maybe<ResolversTypes['User']> }>;
  GetMessagesInput: GetMessagesInput;
  GetOrCreateChatResponse: ResolverTypeWrapper<Omit<GetOrCreateChatResponse, 'chat'> & { chat: ResolversTypes['Chat'] }>;
  GetOrCreateIndividualChatInput: GetOrCreateIndividualChatInput;
  GetUserInput: GetUserInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LeaveGroupChatInput: LeaveGroupChatInput;
  LeaveGroupChatResponse: ResolverTypeWrapper<LeaveGroupChatResponse>;
  LogInResponse: ResolverTypeWrapper<LogInModelSuccessResponse>;
  LogOutResponse: ResolverTypeWrapper<LogOutResponse>;
  Message: ResolverTypeWrapper<MessageModelSuccessResponse>;
  MessageCreatedSubscriptionResponse: ResolverTypeWrapper<Omit<MessageCreatedSubscriptionResponse, 'message'> & { message?: Maybe<ResolversTypes['Message']> }>;
  Mutation: ResolverTypeWrapper<{}>;
  ParticipantInput: ParticipantInput;
  Query: ResolverTypeWrapper<{}>;
  RejectFriendshipInput: RejectFriendshipInput;
  RejectFriendshipResponse: ResolverTypeWrapper<Omit<RejectFriendshipResponse, 'friendRejected'> & { friendRejected: ResolversTypes['User'] }>;
  RemoveFriendshipInput: RemoveFriendshipInput;
  RemoveFriendshipResponse: ResolverTypeWrapper<Omit<RemoveFriendshipResponse, 'userRemoved'> & { userRemoved: ResolversTypes['User'] }>;
  RemoveParticipantInput: RemoveParticipantInput;
  RemoveParticipantResponse: ResolverTypeWrapper<RemoveParticipantResponse>;
  RequestFriendshipInput: RequestFriendshipInput;
  RequestFriendshipResponse: ResolverTypeWrapper<Omit<RequestFriendshipResponse, 'friendAdded'> & { friendAdded?: Maybe<ResolversTypes['User']> }>;
  SetLanguageInput: SetLanguageInput;
  SetLanguageResponse: ResolverTypeWrapper<SetLanguageResponse>;
  SignUpInput: SignUpInput;
  SignUpResponse: ResolverTypeWrapper<SignUpModelSuccessResponse>;
  Status: Status;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<UserModelSuccessResponse>;
  UserInterface: ResolversTypes['ChatUser'] | ResolversTypes['User'] | ResolversTypes['Viewer'];
  UserSettings: ResolverTypeWrapper<UserSettings>;
  Viewer: ResolverTypeWrapper<Omit<Viewer, 'chat' | 'chats' | 'friends'> & { chat?: Maybe<ResolversTypes['Chat']>, chats: Array<ResolversTypes['Chat']>, friends: Array<ResolversTypes['User']> }>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AcceptFriendshipInput: AcceptFriendshipInput;
  AcceptFriendshipResponse: Omit<AcceptFriendshipResponse, 'friendAdded'> & { friendAdded?: Maybe<ResolversParentTypes['User']> };
  AddParticipantsInput: AddParticipantsInput;
  AddParticipantsResponse: Omit<AddParticipantsResponse, 'chatModified'> & { chatModified: ResolversParentTypes['Chat'] };
  Boolean: Scalars['Boolean'];
  Chat: ChatModelSuccessResponse;
  ChatUser: ChatModelSuccessResponse;
  CreateGroupChatInput: CreateGroupChatInput;
  CreateMessageInput: CreateMessageInput;
  CreateMessageResponse: Omit<CreateMessageResponse, 'message'> & { message?: Maybe<ResolversParentTypes['Message']> };
  Error: Error;
  FriendRequest: Omit<FriendRequest, 'user'> & { user: ResolversParentTypes['User'] };
  FriendshipRequestReceivedSubscriptionResponse: Omit<FriendshipRequestReceivedSubscriptionResponse, 'accepterUser' | 'requesterUser'> & { accepterUser: ResolversParentTypes['User'], requesterUser: ResolversParentTypes['User'] };
  FriendshipResponseReceivedSubscriptionResponse: Omit<FriendshipResponseReceivedSubscriptionResponse, 'accepterUser' | 'requesterUser'> & { accepterUser?: Maybe<ResolversParentTypes['User']>, requesterUser?: Maybe<ResolversParentTypes['User']> };
  GetMessagesInput: GetMessagesInput;
  GetOrCreateChatResponse: Omit<GetOrCreateChatResponse, 'chat'> & { chat: ResolversParentTypes['Chat'] };
  GetOrCreateIndividualChatInput: GetOrCreateIndividualChatInput;
  GetUserInput: GetUserInput;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  LeaveGroupChatInput: LeaveGroupChatInput;
  LeaveGroupChatResponse: LeaveGroupChatResponse;
  LogInResponse: LogInModelSuccessResponse;
  LogOutResponse: LogOutResponse;
  Message: MessageModelSuccessResponse;
  MessageCreatedSubscriptionResponse: Omit<MessageCreatedSubscriptionResponse, 'message'> & { message?: Maybe<ResolversParentTypes['Message']> };
  Mutation: {};
  ParticipantInput: ParticipantInput;
  Query: {};
  RejectFriendshipInput: RejectFriendshipInput;
  RejectFriendshipResponse: Omit<RejectFriendshipResponse, 'friendRejected'> & { friendRejected: ResolversParentTypes['User'] };
  RemoveFriendshipInput: RemoveFriendshipInput;
  RemoveFriendshipResponse: Omit<RemoveFriendshipResponse, 'userRemoved'> & { userRemoved: ResolversParentTypes['User'] };
  RemoveParticipantInput: RemoveParticipantInput;
  RemoveParticipantResponse: RemoveParticipantResponse;
  RequestFriendshipInput: RequestFriendshipInput;
  RequestFriendshipResponse: Omit<RequestFriendshipResponse, 'friendAdded'> & { friendAdded?: Maybe<ResolversParentTypes['User']> };
  SetLanguageInput: SetLanguageInput;
  SetLanguageResponse: SetLanguageResponse;
  SignUpInput: SignUpInput;
  SignUpResponse: SignUpModelSuccessResponse;
  String: Scalars['String'];
  Subscription: {};
  User: UserModelSuccessResponse;
  UserInterface: ResolversParentTypes['ChatUser'] | ResolversParentTypes['User'] | ResolversParentTypes['Viewer'];
  UserSettings: UserSettings;
  Viewer: Omit<Viewer, 'chat' | 'chats' | 'friends'> & { chat?: Maybe<ResolversParentTypes['Chat']>, chats: Array<ResolversParentTypes['Chat']>, friends: Array<ResolversParentTypes['User']> };
};

export type AcceptFriendshipResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AcceptFriendshipResponse'] = ResolversParentTypes['AcceptFriendshipResponse']> = {
  friendAdded?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddParticipantsResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AddParticipantsResponse'] = ResolversParentTypes['AddParticipantsResponse']> = {
  chatModified?: Resolver<ResolversTypes['Chat'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Chat'] = ResolversParentTypes['Chat']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastActionDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  participants?: Resolver<Array<ResolversTypes['ChatUser']>, ParentType, ContextType>;
  phrase?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ChatType'], ParentType, ContextType>;
  viewerAsChatUser?: Resolver<ResolversTypes['ChatUser'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatUserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ChatUser'] = ResolversParentTypes['ChatUser']> = {
  admin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  individualChat?: Resolver<Maybe<ResolversTypes['Chat']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  participantSince?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phrase?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateMessageResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CreateMessageResponse'] = ResolversParentTypes['CreateMessageResponse']> = {
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ErrorResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = {
  code?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  reason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FriendRequestResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['FriendRequest'] = ResolversParentTypes['FriendRequest']> = {
  sentAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FriendshipRequestReceivedSubscriptionResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['FriendshipRequestReceivedSubscriptionResponse'] = ResolversParentTypes['FriendshipRequestReceivedSubscriptionResponse']> = {
  accepterUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  requesterUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FriendshipResponseReceivedSubscriptionResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['FriendshipResponseReceivedSubscriptionResponse'] = ResolversParentTypes['FriendshipResponseReceivedSubscriptionResponse']> = {
  accept?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  accepterUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  requesterUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetOrCreateChatResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['GetOrCreateChatResponse'] = ResolversParentTypes['GetOrCreateChatResponse']> = {
  chat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType>;
  created?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LeaveGroupChatResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['LeaveGroupChatResponse'] = ResolversParentTypes['LeaveGroupChatResponse']> = {
  chatId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LogInResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['LogInResponse'] = ResolversParentTypes['LogInResponse']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LogOutResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['LogOutResponse'] = ResolversParentTypes['LogOutResponse']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  chat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sentAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sentBy?: Resolver<ResolversTypes['ChatUser'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageCreatedSubscriptionResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['MessageCreatedSubscriptionResponse'] = ResolversParentTypes['MessageCreatedSubscriptionResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  acceptFriendship?: Resolver<ResolversTypes['AcceptFriendshipResponse'], ParentType, ContextType, RequireFields<MutationAcceptFriendshipArgs, 'input'>>;
  addParticipants?: Resolver<ResolversTypes['AddParticipantsResponse'], ParentType, ContextType, Partial<MutationAddParticipantsArgs>>;
  createGroupChat?: Resolver<ResolversTypes['GetOrCreateChatResponse'], ParentType, ContextType, RequireFields<MutationCreateGroupChatArgs, 'input'>>;
  createMessage?: Resolver<ResolversTypes['CreateMessageResponse'], ParentType, ContextType, RequireFields<MutationCreateMessageArgs, 'input'>>;
  getOrCreateIndividualChat?: Resolver<ResolversTypes['GetOrCreateChatResponse'], ParentType, ContextType, RequireFields<MutationGetOrCreateIndividualChatArgs, 'input'>>;
  leaveGroupChat?: Resolver<ResolversTypes['LeaveGroupChatResponse'], ParentType, ContextType, RequireFields<MutationLeaveGroupChatArgs, 'input'>>;
  login?: Resolver<ResolversTypes['LogInResponse'], ParentType, ContextType, Partial<MutationLoginArgs>>;
  logout?: Resolver<ResolversTypes['LogOutResponse'], ParentType, ContextType>;
  rejectFriendship?: Resolver<ResolversTypes['RejectFriendshipResponse'], ParentType, ContextType, RequireFields<MutationRejectFriendshipArgs, 'input'>>;
  removeFriendship?: Resolver<ResolversTypes['RemoveFriendshipResponse'], ParentType, ContextType, RequireFields<MutationRemoveFriendshipArgs, 'input'>>;
  removeParticipant?: Resolver<ResolversTypes['RemoveParticipantResponse'], ParentType, ContextType, Partial<MutationRemoveParticipantArgs>>;
  requestFriendship?: Resolver<ResolversTypes['RequestFriendshipResponse'], ParentType, ContextType, RequireFields<MutationRequestFriendshipArgs, 'input'>>;
  setLanguage?: Resolver<ResolversTypes['SetLanguageResponse'], ParentType, ContextType, Partial<MutationSetLanguageArgs>>;
  signup?: Resolver<ResolversTypes['SignUpResponse'], ParentType, ContextType, Partial<MutationSignupArgs>>;
};

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  chats?: Resolver<Array<ResolversTypes['Chat']>, ParentType, ContextType>;
  friendshipRequestsReceived?: Resolver<Array<ResolversTypes['FriendRequest']>, ParentType, ContextType>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<QueryMessagesArgs, 'input'>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'input'>>;
  viewer?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type RejectFriendshipResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['RejectFriendshipResponse'] = ResolversParentTypes['RejectFriendshipResponse']> = {
  friendRejected?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemoveFriendshipResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['RemoveFriendshipResponse'] = ResolversParentTypes['RemoveFriendshipResponse']> = {
  userRemoved?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemoveParticipantResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['RemoveParticipantResponse'] = ResolversParentTypes['RemoveParticipantResponse']> = {
  chatId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  participantId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RequestFriendshipResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['RequestFriendshipResponse'] = ResolversParentTypes['RequestFriendshipResponse']> = {
  friendAdded?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetLanguageResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['SetLanguageResponse'] = ResolversParentTypes['SetLanguageResponse']> = {
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SignUpResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['SignUpResponse'] = ResolversParentTypes['SignUpResponse']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  friendshipRequestReceived?: SubscriptionResolver<Maybe<ResolversTypes['FriendshipRequestReceivedSubscriptionResponse']>, "friendshipRequestReceived", ParentType, ContextType>;
  friendshipResponseReceived?: SubscriptionResolver<Maybe<ResolversTypes['FriendshipResponseReceivedSubscriptionResponse']>, "friendshipResponseReceived", ParentType, ContextType>;
  messageCreated?: SubscriptionResolver<Maybe<ResolversTypes['MessageCreatedSubscriptionResponse']>, "messageCreated", ParentType, ContextType>;
};

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  chat?: Resolver<Maybe<ResolversTypes['Chat']>, ParentType, ContextType, Partial<UserChatArgs>>;
  chats?: Resolver<Array<ResolversTypes['Chat']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  friends?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  individualChat?: Resolver<Maybe<ResolversTypes['Chat']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phrase?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  settings?: Resolver<Maybe<ResolversTypes['UserSettings']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserInterfaceResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UserInterface'] = ResolversParentTypes['UserInterface']> = {
  __resolveType: TypeResolveFn<'ChatUser' | 'User' | 'Viewer', ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phrase?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type UserSettingsResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UserSettings'] = ResolversParentTypes['UserSettings']> = {
  language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ViewerResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Viewer'] = ResolversParentTypes['Viewer']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  chat?: Resolver<Maybe<ResolversTypes['Chat']>, ParentType, ContextType, Partial<ViewerChatArgs>>;
  chats?: Resolver<Array<ResolversTypes['Chat']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  friends?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phrase?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  settings?: Resolver<Maybe<ResolversTypes['UserSettings']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = MyContext> = {
  AcceptFriendshipResponse?: AcceptFriendshipResponseResolvers<ContextType>;
  AddParticipantsResponse?: AddParticipantsResponseResolvers<ContextType>;
  Chat?: ChatResolvers<ContextType>;
  ChatUser?: ChatUserResolvers<ContextType>;
  CreateMessageResponse?: CreateMessageResponseResolvers<ContextType>;
  Error?: ErrorResolvers<ContextType>;
  FriendRequest?: FriendRequestResolvers<ContextType>;
  FriendshipRequestReceivedSubscriptionResponse?: FriendshipRequestReceivedSubscriptionResponseResolvers<ContextType>;
  FriendshipResponseReceivedSubscriptionResponse?: FriendshipResponseReceivedSubscriptionResponseResolvers<ContextType>;
  GetOrCreateChatResponse?: GetOrCreateChatResponseResolvers<ContextType>;
  LeaveGroupChatResponse?: LeaveGroupChatResponseResolvers<ContextType>;
  LogInResponse?: LogInResponseResolvers<ContextType>;
  LogOutResponse?: LogOutResponseResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  MessageCreatedSubscriptionResponse?: MessageCreatedSubscriptionResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RejectFriendshipResponse?: RejectFriendshipResponseResolvers<ContextType>;
  RemoveFriendshipResponse?: RemoveFriendshipResponseResolvers<ContextType>;
  RemoveParticipantResponse?: RemoveParticipantResponseResolvers<ContextType>;
  RequestFriendshipResponse?: RequestFriendshipResponseResolvers<ContextType>;
  SetLanguageResponse?: SetLanguageResponseResolvers<ContextType>;
  SignUpResponse?: SignUpResponseResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserInterface?: UserInterfaceResolvers<ContextType>;
  UserSettings?: UserSettingsResolvers<ContextType>;
  Viewer?: ViewerResolvers<ContextType>;
};

