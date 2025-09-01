import tw from 'tailwind-styled-components';

export const Label = tw.label`
    pl-0.5 
    text-xs 
    font-bold
`;

export const Field = tw.div`
    flex
    flex-col
    space-y-0.5
`

export const Value = tw.span`
    border-2
    px-2
    rounded
    flex
    items-center
    h-[2.25rem]
    py-1
`