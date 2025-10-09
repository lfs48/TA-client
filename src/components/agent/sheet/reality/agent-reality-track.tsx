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
        <div>
            <h1 className="text-xl text-reality-yellow mb-2">{title}</h1>
            <HTMLParser text={description} />
            <div className="flex space-x-2">
                {trackBoxes}
            </div>
        </div>
    );
}