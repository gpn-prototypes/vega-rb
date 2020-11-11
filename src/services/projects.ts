import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

class ProjectsAPI {
  _client: ApolloClient<NormalizedCacheObject> | null;

  _projectId;

  constructor() {
    this._client = null;
    this._projectId = '';
  }

  getClient(): ApolloClient<NormalizedCacheObject> | null {
    return this._client;
  }

  setClient(graphQlClient: ApolloClient<NormalizedCacheObject>): void {
    this._client = graphQlClient;
  }

  setProjectId(projectId: string): void {
    this._projectId = projectId;
  }

  getProjectId(): string {
    return this._projectId;
  }
}

const projectsApi = new ProjectsAPI();

export default projectsApi;
