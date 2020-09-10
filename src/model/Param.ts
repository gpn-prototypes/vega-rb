/* eslint-disable */
import * as io from 'io-ts';

const OptionalParam = io.partial({
  /** Param name ? */
  title: io.union([io.string, io.null]),
});

const ParamRequired = io.interface({
  /** Identifier MongoDB */
  _id: io.string,
  /** Identifier */
  id: io.string,
  /** Value schema type */
  schema: io.unknown,
  /** Project ID */
  project_id: io.string,
  /** Param name in forms */
  fieldName: io.string,
  /** Display name in forms */
  screen_name: io.string,
});

export const ParamIntersection = io.intersection([
  OptionalParam,
  ParamRequired,
]);

export const ParamArray = io.array(ParamIntersection);

export type Param = io.TypeOf<typeof ParamIntersection>;
