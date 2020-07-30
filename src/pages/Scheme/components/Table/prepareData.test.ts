import { prepareData } from './prepareData'

const mockData = {
    templateProjectData: {
        geoObjectTypes: [
            { name: 'Лиц. Участок', __typename: 'GeoObjectType' },
            { name: 'Месторождение', __typename: 'GeoObjectType' },
            { name: 'Пласт', __typename: 'GeoObjectType' },
            { name: 'Залежь', __typename: 'GeoObjectType' },
            { name: 'Скважина', __typename: 'GeoObjectType' },
        ],
        __typename: 'ProjectData',
    },
}

test('expect GridCollection', () => {
    expect(prepareData(mockData)).toMatchObject({
        columns: [
            {
                key: 0,
                name: 'Лиц. Участок',
            },
            {
                key: 1,
                name: 'Месторождение',
            },
            {
                key: 2,
                name: 'Пласт',
            },
            {
                key: 3,
                name: 'Залежь',
            },
            {
                key: 4,
                name: 'Скважина',
            },
        ],
        rows: [],
    })
})
