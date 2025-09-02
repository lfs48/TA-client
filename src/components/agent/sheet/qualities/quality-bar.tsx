import Triangle from "@/components/svg/triangle";
import { RiAddFill, RiSubtractFill } from "@remixicon/react";
import { useAdjustCurrentQualityMutation, useAdjustMaxQualityMutation } from "@/api/agent.api";
import {capitalize} from 'lodash';
import { useMemo } from "react";
import { Qualities } from "enum";

interface QualityBarProps {
    quality: Qualities;
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

    const [triggerPatchCurrent, {isLoading: isLoadingCurrent}] = useAdjustCurrentQualityMutation();
    const [triggerPatchMax, {isLoading: isLoadingMax}] = useAdjustMaxQualityMutation();

    const isLoading = isLoadingCurrent || isLoadingMax;

    const triangles = Array.from({ length: 9 }, (_, i) => (
        <div
            key={i}
            className={`${i < max && !isLoading ? "cursor-pointer" : ""}`}
            onClick={() => handleAdjustCurrentQuality(i)}
        >
            <Triangle 
                rotate={i % 2 === 0}
                filled={i < current || i >= max}
                color={i >= max ? "#ccc" : "#dd2a25"}
            /> 
        </div>
    ));

    const handleAdjustCurrentQuality = (index:number) => {
        if (!isLoading) {
            const delta = index < current ? index - current : index - current + 1;
            const body = {
                id: agentId,
                data: {
                    quality: quality,
                    quantity: delta
                }
            };
            triggerPatchCurrent(body);
        }
    };

    const handleAdjustMaxQuality = (delta:number) => {
        if (!isLoading) {
            const body = {
                id: agentId,
                data: {
                    quality: quality,
                    quantity: delta
                }
            };
            triggerPatchMax(body);
        }
    };

    return (
        <div className="space-y-1">
            <div className="flex space-x-2">
                <span className="font-bold font-mono">{current}/{max}</span>
                <h2>{capitalize(quality)}</h2>
            </div>
            <div className="flex -space-x-1.5">
                {triangles}
                <div 
                    className="relative cursor-pointer ml-2"
                    onClick={() => handleAdjustMaxQuality(1)}
                >
                    <Triangle
                        rotate={false}
                        filled={false}
                        color={"#008000"}
                    />
                    <RiAddFill className="absolute size-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3"/>
                </div>
                <div 
                    className="relative cursor-pointer"
                    onClick={() => handleAdjustMaxQuality(-1)}
                >
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
