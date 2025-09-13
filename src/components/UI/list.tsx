import Triangle from "@/components/svg/triangle";
import { useMemo } from "react";

interface ListProps {
    items: any[];
    color?: 'red' | 'yellow' | 'blue';
    itemClasses?: string;
    [prop: string]: any;
}

export default function List({ 
    items, 
    color = 'red',
    itemClasses = '',
    ...props 
}: ListProps) {

    const listItems = useMemo(() => {
        return items.map((item, index) => (
            <li 
                key={index} 
                className={`flex items-start mb-0.5 last:mb-0 ${itemClasses}`}>
                <Triangle color={colorHex(color)} className="transform rotate-90 size-2 flex-shrink-0 mr-2 mt-[0.6rem]"/>
                <span>{item}</span>
            </li>
        ));
    }, [items, color]);

    return (
        <ul {...props}>
            {listItems}
        </ul>
    );
}

function colorHex(color: 'red' | 'yellow' | 'blue') {
    switch(color) {
        case 'red':
            return '#dd2a25';
        case 'yellow':
            return '#f5a623';
        case 'blue':
            return '#2752a3';
        default:
            return '';
    }
};