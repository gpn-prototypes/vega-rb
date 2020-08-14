import React from 'react'
import { styled } from '@storybook/theming'
import { cnTheme } from '@gpn-design/uikit/Theme'
import '@gpn-design/uikit/__internal__/src/components/Theme/Theme.css'
import '@gpn-design/uikit/__internal__/src/components/Theme/_color/Theme_color_gpnDefault.css'
import '@gpn-design/uikit/__internal__/src/components/Theme/_color/Theme_color_gpnDark.css'
import '@gpn-design/uikit/__internal__/src/components/Theme/_color/Theme_color_gpnDisplay.css'
import '@gpn-design/uikit/__internal__/src/components/Theme/_space/Theme_space_gpnDefault.css'
import '@gpn-design/uikit/__internal__/src/components/Theme/_size/Theme_size_gpnDefault.css'
import '@gpn-design/uikit/__internal__/src/components/Theme/_control/Theme_control_gpnDefault.css'
import '@gpn-design/uikit/__internal__/src/utils/whitepaper/whitepaper.css'

const themeClassname = cnTheme({
    color: 'gpnDark',
    space: 'gpnDefault',
    size: 'gpnDefault',
    font: 'gpnDark',
    control: 'gpnDefault',
})

const Root = styled.div`
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
        'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', sans-serif;
`

export const decorators = [
    (Story) => (
        <Root className={themeClassname}>
            <Story />
        </Root>
    ),
]
