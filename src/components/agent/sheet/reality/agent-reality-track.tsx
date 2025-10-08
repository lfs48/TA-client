import Checkbox from "@/components/UI/checkbox";

interface AgentRealityTrackProps {
    id: string;
    title: string;
    trackFilled: number;
}

export default function AgentRealityTrack({
    id,
    title,
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
            <p className="text-sm text-gray-500">{}</p>
            <div className="flex space-x-2">
                {trackBoxes}
            </div>
        </div>
    );
}