import React from 'react'
import ExcelTable from './ExcelTable'
import { GridCollection } from './types'
import faker from 'faker'
import styles from './ExcelTable.module.css'

export default {
    title: 'ExcelTable',
}

const baseColumnAttributes = {
    editable: true,
    resizable: true,
    sortable: true,
    cellClass: styles.Cell,
}

const mockData: GridCollection = {
    columns: [
        {
            key: 'id',
            name: '',
            width: 1,
            cellClass: styles.Cell,
        },
        {
            key: 'area',
            name: 'Лицензионный участок',
            ...baseColumnAttributes,
        },
        {
            key: 'deposit',
            name: 'Месторождение',
            ...baseColumnAttributes,
        },
        {
            key: 'layer',
            name: 'Пласт',
            ...baseColumnAttributes,
        },
        {
            key: 'well',
            name: 'Скважина',
            ...baseColumnAttributes,
        },
        {
            key: 'category',
            name: 'Категория',
            ...baseColumnAttributes,
        },
        {
            key: 'probability',
            name: 'Вероятность',
            ...baseColumnAttributes,
        },
    ],
    rows: [...Array(1000)].map((_, i) => ({
        id: i,
        area: faker.random.arrayElement(['Надежденский', 'Угловой_Сц-4_base']),
        deposit: faker.random.arrayElement(['РА-132', 'Незалёжное', 'Д122-УЩ']),
        layer: faker.random.arrayElement(['Д 5', 'P50', 'Т1 + Т2']),
        well: faker.random.number(50),
        category: faker.random.arrayElement(['Р', 'З']),
        probability: faker.random.number(100),
    })),
}

export const Default = () => (
    <div>
        <ExcelTable data={mockData} />
    </div>
)
