import Checkbox from "@/components/UI/checkbox";
import HTMLParser from "@/components/html-parser";

interface AgentRealityTrackProps {
    id: string;
    title: string;
    description: string;
    trackFilled: number;
}

export default function AgentRealityTrack({
    id,
    title,
    description,
    trackFilled,
}: AgentRealityTrackProps) {

    const trackBoxes = Array.from({ length: 4 }, (_, i) => (
        <Checkbox
            key={i}
            color='yellow'
            checked={trackFilled < i + 1}
            size="xl"
            // onChange={() => handlePatchUses(index >= currentUses ? index + 1 : index)}
        />
    ));
    return (
        <div className="space-y-2">
            <h1 className="text-xl text-reality-yellow">{title}</h1>
            <div className="text-sm">
                <HTMLParser text={description} />
            </div>
            <div className="flex space-x-2">
                {trackBoxes}
            </div>
        </div>
    );
}