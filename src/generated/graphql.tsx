export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
}

export type Query = {
    __typename?: 'Query'
    projects?: Maybe<Array<Maybe<Project>>>
}

export type Project = {
    __typename?: 'Project'
    id?: Maybe<Scalars['ID']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
}

export type Mutations = {
    __typename?: 'Mutations'
    /** Создание проекта ГЭО */
    createProject?: Maybe<CreateProject>
}

export type MutationsCreateProjectArgs = {
    description?: Maybe<Scalars['String']>
    name: Scalars['String']
}

export type CreateProject = {
    __typename?: 'CreateProject'
    ok?: Maybe<Scalars['Boolean']>
    project?: Maybe<Project>
}
