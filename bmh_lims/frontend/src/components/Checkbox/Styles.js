import styled from 'styled-components'
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill} from 'react-icons/ri'

export const CheckboxContainer = styled.div`
    width: ${props => props.width || 'unset'};
    display: flex;
    align-items: center;
    justify-content: center;
`

export const CheckedBox = styled(RiCheckboxCircleFill)`
    fill: ${props => props.theme.colour4};
`

export const UncheckedBox = styled(RiCheckboxBlankCircleLine)`
    fill: ${props => props.theme.colour4};
`
