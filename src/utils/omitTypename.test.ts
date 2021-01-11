import { omitTypename } from 'utils/omitTypename';

describe('omitTypename', () => {
  test('Have to remove the __typename property', () => {
    const mock = {
      __typename: 'typename',
      property: 'nothing',
    };

    expect(omitTypename(mock)).toEqual(
      expect.not.objectContaining({ __typename: '' }),
    );
  });
});
