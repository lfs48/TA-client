import Triangle from '@/components/svg/triangle';
import parse, { domToReact } from 'html-react-parser';

const parseOptions = {
    replace: (domNode: any) => {
        if (domNode.type === 'tag') {
            switch (domNode.name) {
                case 'ul':
                    return (
                        <ul className="list-none">
                            {domToReact(domNode.children, parseOptions)}
                        </ul>
                    );
                case 'li':
                    return (
                        <li className="flex items-start mb-0.5 last:mb-0">
                            <Triangle color={"#2752a3"} className="transform rotate-90 size-2 flex-shrink-0 mr-2 mt-[0.6rem]"/>
                            <span>{domToReact(domNode.children, parseOptions)}</span>
                        </li>
                    );
                default:
                    return domNode;
            }
        }
    }
};

// Usage
export default function HTMLParser({ text }: { text: string }) {
    return <>{parse(text, parseOptions)}</>;
}