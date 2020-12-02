import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

class GraphQlService {
  _client: ApolloClient<NormalizedCacheObject> | undefined;

  _projectId = '';

  getClient() {
    return this._client as ApolloClient<NormalizedCacheObject>;
  }

  setClient(graphQlClient: ApolloClient<NormalizedCacheObject>) {
    this._client = graphQlClient;
  }

  getProjectId() {
    return this._projectId;
  }

  setProjectId(projectId: string) {
    this._projectId = projectId;
  }
}

const graphQlService = new GraphQlService();

export default graphQlService;
