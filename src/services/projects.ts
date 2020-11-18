import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

interface ProjectServiceApi {
  client: ApolloClient<NormalizedCacheObject>;
  projectId: string;
}

class ProjectsAPI {
  _client: ApolloClient<NormalizedCacheObject> | null = null;

  _projectId = '';

  init({ client, projectId }: ProjectServiceApi) {
    this._client = client;
    this._projectId = projectId;
  }

  getClient(): ApolloClient<NormalizedCacheObject> {
    return this._client as ApolloClient<NormalizedCacheObject>;
  }

  getProjectId() {
    return this._projectId;
  }
}

const projectsApi = new ProjectsAPI();

export default projectsApi;
