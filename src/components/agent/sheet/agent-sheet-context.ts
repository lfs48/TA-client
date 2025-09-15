import { Agent, AgentSheetTab } from "@/types";
import { createContext } from "react";
import { agentSkeleton } from "@/util/agent.util";

interface AgentSheetContextState {
  agent: Agent;
  tab: AgentSheetTab;
  setTab: (tab: AgentSheetTab) => void;
}

const initialAgentSheetState: AgentSheetContextState = {
  agent: agentSkeleton,
  tab: 'overview',
  setTab: () => {},
};

const AgentSheetContext = createContext<AgentSheetContextState>(initialAgentSheetState);

export default AgentSheetContext;