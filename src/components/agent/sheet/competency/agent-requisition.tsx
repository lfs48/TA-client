import HTMLParser from "@/components/html-parser";
import { useAppSelector } from "@/hooks/useAppSelector.hook";
import { selectRequisitionInstanceById } from "@/reducers/entities/requisition-instances.reducer";
import { selectRequisitionById } from "@/reducers/entities/requisitions.reducer";
import Checkbox from "@/components/UI/checkbox";
import { requisitionInstanceSkeleton, requisitionSkeleton } from "@/util/requisition.util";

interface AgentRequisitionProps {
    id: string;
}

export default function AgentRequisition({
    id,
}: AgentRequisitionProps) {

    const requisitionInstance = useAppSelector(state => selectRequisitionInstanceById(state, id)) || requisitionInstanceSkeleton;
    const { currentUses, maxUses } = requisitionInstance;
    const { requisitionId } = requisitionInstance || {};
    const requisition = useAppSelector(state => selectRequisitionById(state, requisitionId)) || requisitionSkeleton;

    const useControls = Array.from({ length: maxUses }, (_, index) => (
        <Checkbox
            key={index}
            color='red'
            checked={currentUses < index + 1}
            onChange={() => {}}
        />
    ));

    return (
         <div className="pb-2 bg-agency-red-100 rounded">
            <h3 className="sticky top-0 left-0 font-bold px-2 py-1 border-b border-agency-red-300 text-agency-red text-lg">{requisition?.title}</h3>
            <div className="h-80 px-2 py-1 space-y-2 overflow-y-auto scrollbar-thin">
                <HTMLParser text={requisition?.description || ''} />
            </div>
            <div className="sticky bottom-0 h-8 p-2 border-t border-agency-red-300">
                <div className="flex justify-between items-center">
                    <div className="flex space-x-1 items-center">
                        {requisition.rentalCost && (
                            <>
                            <Checkbox
                                color='red'
                                checked={requisitionInstance.rented}
                                onChange={() => {}}
                            />
                            <p>Rented?</p>
                            </>
                        )}
                    </div>
                    <div className="flex space-x-1 items-center">
                        {useControls}
                        <p className="italic text-xs">{maxUses > 1 ? 'Uses' : 'Used?'}</p>
                    </div>
                </div>
            </div>
         </div>
    );
}