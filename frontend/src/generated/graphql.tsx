import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};


export type LoginInput = {
  phonenumber: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  logout: Scalars['Boolean'];
  login: UserResponse;
  register: UserResponse;
  editSub: Sub;
  deleteSub: Scalars['Boolean'];
  createSub: Sub;
};


export type MutationLoginArgs = {
  inputs: LoginInput;
};


export type MutationRegisterArgs = {
  inputs: LoginInput;
};


export type MutationEditSubArgs = {
  inputs?: Maybe<SubInputs>;
  id: Scalars['String'];
};


export type MutationDeleteSubArgs = {
  _id: Scalars['String'];
};


export type MutationCreateSubArgs = {
  inputs: SubInputs;
};

export type MyError = {
  __typename?: 'MyError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type PaginatedSubs = {
  __typename?: 'PaginatedSubs';
  subs: Array<Sub>;
  more: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  findOneSub: Sub;
  findSubs: PaginatedSubs;
};


export type QueryFindOneSubArgs = {
  id: Scalars['String'];
};


export type QueryFindSubsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type Sub = {
  __typename?: 'Sub';
  _id: Scalars['String'];
  user: User;
  userId: Scalars['String'];
  name: Scalars['String'];
  amount?: Maybe<Scalars['Float']>;
  startDate?: Maybe<Scalars['String']>;
  frequency?: Maybe<Scalars['Int']>;
  color: Scalars['String'];
  notification: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type SubInputs = {
  name?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Float']>;
  startDate?: Maybe<Scalars['String']>;
  frequency?: Maybe<Scalars['Float']>;
  color?: Maybe<Scalars['String']>;
  notification?: Maybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  phonenumber: Scalars['String'];
  subscription: Sub;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<MyError>>;
  user?: Maybe<User>;
};

export type CreateSubMutationVariables = Exact<{
  inputs: SubInputs;
}>;


export type CreateSubMutation = (
  { __typename?: 'Mutation' }
  & { createSub: (
    { __typename?: 'Sub' }
    & Pick<Sub, 'userId' | 'name' | 'amount'>
  ) }
);

export type DeleteSubMutationVariables = Exact<{
  _id: Scalars['String'];
}>;


export type DeleteSubMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteSub'>
);

export type EditSubMutationVariables = Exact<{
  id: Scalars['String'];
  inputs?: Maybe<SubInputs>;
}>;


export type EditSubMutation = (
  { __typename?: 'Mutation' }
  & { editSub: (
    { __typename?: 'Sub' }
    & Pick<Sub, '_id' | 'name' | 'amount' | 'startDate' | 'frequency' | 'color' | 'notification'>
  ) }
);

export type LoginMutationVariables = Exact<{
  inputs: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'MyError' }
      & Pick<MyError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, '_id' | 'phonenumber'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  inputs: LoginInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'MyError' }
      & Pick<MyError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, '_id' | 'phonenumber'>
    )> }
  ) }
);

export type FindOneSubQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type FindOneSubQuery = (
  { __typename?: 'Query' }
  & { findOneSub: (
    { __typename?: 'Sub' }
    & Pick<Sub, 'name' | 'amount' | 'startDate' | 'frequency' | 'color' | 'notification'>
  ) }
);

export type FindSubsQueryVariables = Exact<{
  name?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type FindSubsQuery = (
  { __typename?: 'Query' }
  & { findSubs: (
    { __typename?: 'PaginatedSubs' }
    & Pick<PaginatedSubs, 'more'>
    & { subs: Array<(
      { __typename?: 'Sub' }
      & Pick<Sub, '_id' | 'userId' | 'name' | 'amount' | 'startDate' | 'frequency' | 'color' | 'notification'>
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'phonenumber'>
  )> }
);


export const CreateSubDocument = gql`
    mutation createSub($inputs: SubInputs!) {
  createSub(inputs: $inputs) {
    userId
    name
    amount
  }
}
    `;
export type CreateSubMutationFn = Apollo.MutationFunction<CreateSubMutation, CreateSubMutationVariables>;

/**
 * __useCreateSubMutation__
 *
 * To run a mutation, you first call `useCreateSubMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubMutation, { data, loading, error }] = useCreateSubMutation({
 *   variables: {
 *      inputs: // value for 'inputs'
 *   },
 * });
 */
export function useCreateSubMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubMutation, CreateSubMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubMutation, CreateSubMutationVariables>(CreateSubDocument, options);
      }
export type CreateSubMutationHookResult = ReturnType<typeof useCreateSubMutation>;
export type CreateSubMutationResult = Apollo.MutationResult<CreateSubMutation>;
export type CreateSubMutationOptions = Apollo.BaseMutationOptions<CreateSubMutation, CreateSubMutationVariables>;
export const DeleteSubDocument = gql`
    mutation deleteSub($_id: String!) {
  deleteSub(_id: $_id)
}
    `;
export type DeleteSubMutationFn = Apollo.MutationFunction<DeleteSubMutation, DeleteSubMutationVariables>;

/**
 * __useDeleteSubMutation__
 *
 * To run a mutation, you first call `useDeleteSubMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSubMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSubMutation, { data, loading, error }] = useDeleteSubMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useDeleteSubMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSubMutation, DeleteSubMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSubMutation, DeleteSubMutationVariables>(DeleteSubDocument, options);
      }
export type DeleteSubMutationHookResult = ReturnType<typeof useDeleteSubMutation>;
export type DeleteSubMutationResult = Apollo.MutationResult<DeleteSubMutation>;
export type DeleteSubMutationOptions = Apollo.BaseMutationOptions<DeleteSubMutation, DeleteSubMutationVariables>;
export const EditSubDocument = gql`
    mutation editSub($id: String!, $inputs: SubInputs) {
  editSub(id: $id, inputs: $inputs) {
    _id
    name
    amount
    startDate
    frequency
    color
    notification
  }
}
    `;
export type EditSubMutationFn = Apollo.MutationFunction<EditSubMutation, EditSubMutationVariables>;

/**
 * __useEditSubMutation__
 *
 * To run a mutation, you first call `useEditSubMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditSubMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editSubMutation, { data, loading, error }] = useEditSubMutation({
 *   variables: {
 *      id: // value for 'id'
 *      inputs: // value for 'inputs'
 *   },
 * });
 */
export function useEditSubMutation(baseOptions?: Apollo.MutationHookOptions<EditSubMutation, EditSubMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditSubMutation, EditSubMutationVariables>(EditSubDocument, options);
      }
export type EditSubMutationHookResult = ReturnType<typeof useEditSubMutation>;
export type EditSubMutationResult = Apollo.MutationResult<EditSubMutation>;
export type EditSubMutationOptions = Apollo.BaseMutationOptions<EditSubMutation, EditSubMutationVariables>;
export const LoginDocument = gql`
    mutation Login($inputs: LoginInput!) {
  login(inputs: $inputs) {
    errors {
      field
      message
    }
    user {
      _id
      phonenumber
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      inputs: // value for 'inputs'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($inputs: LoginInput!) {
  register(inputs: $inputs) {
    errors {
      field
      message
    }
    user {
      _id
      phonenumber
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      inputs: // value for 'inputs'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const FindOneSubDocument = gql`
    query findOneSub($id: String!) {
  findOneSub(id: $id) {
    name
    amount
    startDate
    frequency
    color
    notification
  }
}
    `;

/**
 * __useFindOneSubQuery__
 *
 * To run a query within a React component, call `useFindOneSubQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneSubQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneSubQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindOneSubQuery(baseOptions: Apollo.QueryHookOptions<FindOneSubQuery, FindOneSubQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneSubQuery, FindOneSubQueryVariables>(FindOneSubDocument, options);
      }
export function useFindOneSubLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneSubQuery, FindOneSubQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneSubQuery, FindOneSubQueryVariables>(FindOneSubDocument, options);
        }
export type FindOneSubQueryHookResult = ReturnType<typeof useFindOneSubQuery>;
export type FindOneSubLazyQueryHookResult = ReturnType<typeof useFindOneSubLazyQuery>;
export type FindOneSubQueryResult = Apollo.QueryResult<FindOneSubQuery, FindOneSubQueryVariables>;
export const FindSubsDocument = gql`
    query findSubs($name: String, $limit: Int, $offset: Int) {
  findSubs(name: $name, limit: $limit, offset: $offset) {
    subs {
      _id
      userId
      name
      amount
      startDate
      frequency
      color
      notification
    }
    more
  }
}
    `;

/**
 * __useFindSubsQuery__
 *
 * To run a query within a React component, call `useFindSubsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSubsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSubsQuery({
 *   variables: {
 *      name: // value for 'name'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useFindSubsQuery(baseOptions?: Apollo.QueryHookOptions<FindSubsQuery, FindSubsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindSubsQuery, FindSubsQueryVariables>(FindSubsDocument, options);
      }
export function useFindSubsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindSubsQuery, FindSubsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindSubsQuery, FindSubsQueryVariables>(FindSubsDocument, options);
        }
export type FindSubsQueryHookResult = ReturnType<typeof useFindSubsQuery>;
export type FindSubsLazyQueryHookResult = ReturnType<typeof useFindSubsLazyQuery>;
export type FindSubsQueryResult = Apollo.QueryResult<FindSubsQuery, FindSubsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    _id
    phonenumber
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;