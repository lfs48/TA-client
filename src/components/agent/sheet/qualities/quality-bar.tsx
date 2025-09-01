import Triangle from "@/components/svg/triangle";
import { RiAddFill, RiSubtractFill } from "@remixicon/react";
import {capitalize} from 'lodash';

interface QualityBarProps {
    quality: string;
    current: number;
    max: number;
    agentId: string;
}

export default function QualityBar({ 
    quality, 
    current, 
    max, 
    agentId 
}: QualityBarProps) {

    const triangles = Array.from({ length: 9 }, (_, i) => (
        <Triangle 
            key={i}
            rotate={i % 2 === 0}
            filled={i < current || i >= max}
            color={i >= max ? "#ccc" : "#dd2a25"}
            className={`i <=cursor-pointer`}
        />
    ));
    
    return (
        <div>
            <h2>{capitalize(quality)}</h2>
            <div className="flex -space-x-1">
                {triangles}
                <div className="relative cursor-pointer ml-2">
                    <Triangle
                        rotate={false}
                        filled={false}
                        color={"#008000"}
                    />
                    <RiAddFill className="absolute size-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3"/>
                </div>
                <div className="relative cursor-pointer">
                    <Triangle
                        rotate={true}
                        filled={false}
                        color={"#dd2a25"}
                    />
                    <RiSubtractFill className="absolute size-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3"/>
                </div>
            </div>
        </div>
    );
}
