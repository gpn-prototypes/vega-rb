import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

class GraphQlAPI {
  _client: ApolloClient<NormalizedCacheObject> | null;

  _projectId;

  constructor() {
    this._client = null;
    this._projectId = '';
  }

  getClient() {
    return this._client;
  }

  setClient(graphQlClient: ApolloClient<NormalizedCacheObject>) {
    this._client = graphQlClient;
  }

  setProjectId(projectId: string) {
    this._projectId = projectId;
  }

  getProjectId() {
    return this._projectId;
  }
}

const graphQlApi = new GraphQlAPI();

export default graphQlApi;
