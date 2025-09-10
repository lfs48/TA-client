export default function AgentHeader({name}: {name: string}) {
    return (
        <div className="sticky top-0 px-2 py-1 border-b border-b-gray-300 bg-white z-10">
            <h1 className="text-sm text-agency-red pt-2 pl-4">Agent {name}</h1>
        </div>
    );
}