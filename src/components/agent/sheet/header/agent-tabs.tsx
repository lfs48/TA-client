import AgentSheetContext from "../agent-sheet-context";
import Button from "@/components/UI/button";
import { ButtonColors, ButtonStyles } from "@/enum";
import { useContext } from "react";

export default function AgentTabs() {

    const { tab, setTab } = useContext(AgentSheetContext);

    return (
        <div className="fles space-x-2">
            <Button 
                color={ButtonColors.PURPLE}
                style={tab === 'overview' ? ButtonStyles.FILL : ButtonStyles.OUTLINE}
                onClick={() => setTab('overview')} 
                className={tab === 'overview' ? 'active' : ''}
                buttonClasses="w-24 py-1 text-xs"
            >Overview</Button>
            <Button 
                color={ButtonColors.BLUE}
                style={tab === 'anomaly' ? ButtonStyles.FILL : ButtonStyles.OUTLINE}
                onClick={() => setTab('anomaly')} 
                className={tab === 'anomaly' ? 'active' : ''}
                buttonClasses="w-24 py-1 text-xs"
            >Anomaly</Button>
            <Button
                color={ButtonColors.RED}
                style={tab === 'competency' ? ButtonStyles.FILL : ButtonStyles.OUTLINE}
                onClick={() => setTab('competency')}
                className={tab === 'competency' ? 'active' : ''}
                buttonClasses="w-24 py-1 text-xs"
            >Competency</Button>
        </div>
    )
}