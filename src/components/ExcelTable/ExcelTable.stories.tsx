import React, { useState } from 'react'
import ExcelTable from './ExcelTable'
import { GridCollection, TableEntities } from './types'
import faker from 'faker'
import styles from './ExcelTable.module.css'
import { SPECIAL_COLUMNS } from '../../model/Table'

export default {
    title: 'ExcelTable',
    component: ExcelTable,
}

const mockData: GridCollection = {
    columns: [
        {
            key: SPECIAL_COLUMNS.ID,
            name: '',
            cellClass: styles.CellID,
            headerCellClass: styles.CellID,
            type: TableEntities.GEO_CATEGORY,
        },
        {
            key: 'area',
            name: 'Лицензионный участок',
            hasIcon: true,
            type: TableEntities.GEO_CATEGORY,
        },
        {
            key: 'deposit',
            name: 'Месторождение',
            hasIcon: true,
            type: TableEntities.GEO_CATEGORY,
        },
        {
            key: 'layer',
            name: 'Пласт',
            hasIcon: true,
            type: TableEntities.GEO_CATEGORY,
        },
        {
            key: 'well',
            name: 'Скважина',
            hasIcon: true,
            type: TableEntities.GEO_CATEGORY,
        },
        {
            key: 'probability',
            name: 'Вероятность',
            hasIcon: true,
            type: TableEntities.GEO_CATEGORY,
        },
        {
            key: 'category',
            name: 'Кат.',
            type: TableEntities.GEO_CATEGORY,
        },
        {
            key: SPECIAL_COLUMNS.SPLITTER,
            name: '',
            maxWidth: 32,
            minWidth: 32,
            type: TableEntities.NONE,
            headerCellClass: styles.Splitter,
            cellClass: styles.Splitter,
        },
        {
            key: 'test',
            name: 'TEST',
            headerId: 'A',
            type: TableEntities.CALC_PARAM,
        },
        {
            key: 'test2',
            name: 'TEST2',
            headerId: 'B',
            type: TableEntities.CALC_PARAM,
        },
        {
            key: 'test3',
            name: 'TEST3',
            headerId: 'C',
            type: TableEntities.CALC_PARAM,
        },
        {
            key: 'square',
            name: 'Площадь',
            cellClass: styles.Cell,
            editable: true,
            resizable: true,
            sortable: true,
            headerId: 'E',
            type: TableEntities.CALC_PARAM,
            headerCellClass: styles.Header,
        },
        {
            key: 'square2',
            name: 'Площадь2',
            cellClass: styles.Cell,
            editable: true,
            resizable: true,
            sortable: true,
            headerId: 'F',
            type: TableEntities.CALC_PARAM,
            headerCellClass: styles.Header,
        },
    ],
    rows: [...Array(10000)].map((_, i) => ({
        id: i,
        area: faker.random.arrayElement(['Надежденский', 'Угловой_Сц-4_base']),
        deposit: faker.random.arrayElement(['РА-132', 'Незалёжное', 'Д122-УЩ']),
        layer: faker.random.arrayElement(['Д 5', 'P50', 'Т1 + Т2']),
        well: faker.random.number(50).toString(),
        category: faker.random.arrayElement(['Р', 'З']),
        probability: faker.random.number(100).toString(),
    })),
}

export const Default = () => {
    const [columns, setColumns] = useState(mockData.columns)
    const [rows, setRows] = useState(mockData.rows)

    return (
        <div style={{ height: '100vh' }}>
            <ExcelTable
                data={{ columns, rows }}
                setColumns={setColumns}
                setRows={setRows}
            />
        </div>
    )
}
