import React from 'react'
import ExcelTable from './ExcelTable'
import { GridCollection } from './types'
import faker from 'faker'

export default {
    title: 'ExcelTable',
}

const mockData: GridCollection = {
    columns: [
        {
            key: 'id',
            name: '',
            width: 1,
        },
        {
            key: 'area',
            name: 'Лицензионный участок',
        },
        {
            key: 'deposit',
            name: 'Месторождение',
        },
        {
            key: 'layer',
            name: 'Пласт',
        },
        {
            key: 'well',
            name: 'Скважина',
        },
        {
            key: 'category',
            name: 'Категория',
        },
        {
            key: 'probability',
            name: 'Вероятность',
        },
    ],
    rows: [...Array(1000)].map((_, i) => ({
        id: i,
        area: faker.random.arrayElement(['Надежденский', 'Угловой_Сц-4_base']),
        deposit: faker.random.arrayElement(['РА-132', 'Незалёжное', 'Д122-УЩ']),
        layer: faker.random.arrayElement(['Д 5', 'P50', 'Т1 + Т2']),
        well: faker.random.number(50).toString(),
        category: faker.random.arrayElement(['Р', 'З']),
        probability: faker.random.number(100).toString(),
    })),
}

export const Default = () => (
    <div style={{ height: '100vh' }}>
        <ExcelTable data={mockData} />
    </div>
)
