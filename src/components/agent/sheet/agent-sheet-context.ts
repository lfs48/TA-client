import { Agent } from "@/types";
import { createContext } from "react";
import { agentSkeleton } from "@/util/agent.util";

interface AgentSheetContextState {
  agent: Agent
}

const initialAgentSheetState: AgentSheetContextState = {
  agent: agentSkeleton
};

const AgentSheetContext = createContext<AgentSheetContextState>(initialAgentSheetState);

export default AgentSheetContext;