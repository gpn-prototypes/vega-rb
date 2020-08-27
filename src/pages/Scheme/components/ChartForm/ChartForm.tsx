import React, { useState } from 'react'
import DistributionChart from '../DistributionChart'
import { Form } from '@gpn-prototypes/vega-form'
import { TextField } from '@gpn-prototypes/vega-text-field'
import { Just } from 'monet'
import { gql, useQuery } from '@apollo/client'
import style from './style.module.css'
import { Dropdown, Option } from '../Dropdown'

// query normalByMinMax($borderConditionsInput: BorderConditionsInput!) {
// distribution {
//  normalByMinMax(borderConditionsInput: $borderConditionsInput) {
// __typename
// ... on Distribution {
// curve {
// x
// y
// }
// }
//  }
// }
// }
const GET_CHART_DATA = gql`
    query normalByDeviation($deviationInput: DeviationInput!) {
        distribution {
            normalByDeviation(deviationInput: $deviationInput) {
                __typename
                ... on Distribution {
                    curve {
                        x
                        y
                    }
                }
            }
        }
    }
`
const options = [{ value: 'norm', label: 'Нормальное' }]

type Value = 'lognorm' | 'norm' | 'rav' | 'const'

export default function ChartForm() {
    const [value, setValue] = useState<Value>('norm')
    const [standard, setStandard] = useState('1')
    const [loc, setLoc] = useState('0')

    const handleValueChange = (o: Option<string>) => {
        setValue(o.value as Value)
    }

    const { loading, error, data } = useQuery(GET_CHART_DATA, {
        variables: {
            deviationInput: {
                mean: parseFloat(loc),
                standardDeviation: standard,
            },
        },
    })

    const handleStandardChange = (args: any) => {
        setStandard(args.value ?? 0)
    }
    const handleLocChange = (args: any) => {
        setLoc(args.value ?? 0)
    }

    if (error) return <div>Error! {error}</div>

    return (
        <>
            <DistributionChart
                data={data?.distribution.normalByDeviation.curve || []}
            />
            <Form className={style.Form}>
                <Form.Row>
                    <Form.Field>
                        <Form.Label>Распределение</Form.Label>
                        <Dropdown
                            value={Just(
                                options.find((o) => o.value === value)!
                            )}
                            options={options}
                            onChange={handleValueChange}
                        />
                    </Form.Field>
                </Form.Row>
                <Form.Row>
                    <div className={style.Flex}>
                        <Form.Field>
                            <Form.Label>Стандартное</Form.Label>
                            <TextField
                                width="full"
                                value={standard || ''}
                                onChange={handleStandardChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Label> Среднее</Form.Label>
                            <TextField
                                width="full"
                                value={loc || ''}
                                onChange={handleLocChange}
                            />
                        </Form.Field>
                    </div>
                </Form.Row>
            </Form>
        </>
    )
}
