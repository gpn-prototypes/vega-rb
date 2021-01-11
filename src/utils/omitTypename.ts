import { omitAll } from 'lodash/fp';

export const omitTypename = omitAll('__typename');
