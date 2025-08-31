import { RiTriangleFill } from '@remixicon/react';
import { components } from 'react-select';

export default function DropdownIndicator(props) {
    return(
        <components.DropdownIndicator {...props}>
            <RiTriangleFill className='size-3 transform rotate-180 text-agency-red'/>
        </components.DropdownIndicator>
    )
}