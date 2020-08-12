// import faker from 'faker'

export const mockTableRows = [...Array(1000)].map((_, index) => ({
    id: index,
    // area: faker.random.arrayElement(['Надежденский', 'Угловой_Сц-4_base']),
    // deposit: faker.random.arrayElement(['РА-132', 'Незалёжное', 'Д122-УЩ']),
    // layer: faker.random.arrayElement(['Д 5', 'P50', 'Т1 + Т2']),
    // well: faker.random.number(20).toString(),
    // mine: faker.random.arrayElement(['FIR-2323-L', 'R-565', 'CC 89732-1']),
}))
