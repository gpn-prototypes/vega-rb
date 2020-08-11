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

export default function ChartForm(props: {}) {
    const [value, setValue] = useState<Value>('norm')
    const [standard, setStandard] = useState('1')
    const [loc, setLoc] = useState('0')
    const [min, setMin] = useState('-4')
    const [max, setMax] = useState('4')
    const [step, setStep] = useState('0.01')

    const handleValueChange = (o: Option<string>) => {
        //@ts-ignore
        setValue(o.value)
    }

    const { loading, error, data } = useQuery(GET_CHART_DATA, {
        variables: {
            deviationInput: {
                // min,
                // max,
                // step,
                mean: parseFloat(loc),
                standardDeviation: standard,
            },
        },
    })

    const handleMinChange = (args: any) => {
        setMin(args.value)
    }
    const handleMaxChange = (args: any) => {
        setMax(args.value)
    }
    const handleStepChange = (args: any) => {
        setStep(args.value)
    }
    const handleStandardChange = (args: any) => {
        setStandard(args.value)
    }
    const handleLocChange = (args: any) => {
        setLoc(args.value)
    }

    return (
        <>
            <DistributionChart
                data={data?.distribution?.normalByDeviation?.curve || []}
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
                        <Form.Field>
                            <Form.Label>Шаг</Form.Label>
                            <TextField
                                width="full"
                                value={step}
                                onChange={handleStepChange}
                            />
                        </Form.Field>
                    </div>
                </Form.Row>
                <Form.Row>
                    <div className={style.Flex}>
                        <Form.Field>
                            <Form.Label>Min</Form.Label>
                            <TextField
                                width="full"
                                value={min}
                                onChange={handleMinChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Label>Max</Form.Label>
                            <TextField
                                width="full"
                                value={max}
                                onChange={handleMaxChange}
                            />
                        </Form.Field>
                    </div>
                </Form.Row>
            </Form>
        </>
    )
}
