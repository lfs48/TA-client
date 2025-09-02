import { useSelector } from "react-redux";
import { Agent, Anomaly, Competency, Reality, RootState } from "@/types";
import { useEffect, useMemo, useState } from "react";
import Select from "@/components/UI/select";
import Button from "@/components/UI/button";
import { ButtonColors, ButtonStyles } from "@/enum";
import * as S from '../styled';
import { usePatchAgentMutation } from "@/api/agent.api";
import { selectAgentById } from "@/reducers/entities/agent.reducer";

interface AgentSheetProps {
    id: string;
};

export default function AgentBio({ id }: AgentSheetProps) {

    const agent = useSelector((state: RootState) => selectAgentById(state, id)) as Agent;
    const { name, anomalyId, realityId, competencyId, playerId } = agent;
    const anomalies = useSelector((state:RootState) => state.entities.anomalies);
    const realities = useSelector((state:RootState) => state.entities.realities);
    const competencies = useSelector((state:RootState) => state.entities.competencies);
    const { id: userId } = useSelector((state: RootState) => state.session);
    const anomalyOptions = useMemo(() => Object.values(anomalies).map(anomaly => ({
        value: anomaly.id,
        label: anomaly.name
    })), [anomalies]);
    const realityOptions = useMemo(() => Object.values(realities).map(reality => ({
        value: reality.id,
        label: reality.name
    })), [realities]);
    const competencyOptions = useMemo(() => Object.values(competencies).map(competency => ({
        value: competency.id,
        label: competency.name
    })), [competencies]);

    const [nameInput, setNameInput] = useState(name);
    const [anomalyInput, setAnomalyInput] = useState(anomalyId);
    const [realityInput, setRealityInput] = useState(realityId);
    const [competencyInput, setCompetencyInput] = useState(competencyId);
    const [editing, setEditing] = useState(false);

    const anomaly = anomalies[anomalyId || ''] as Anomaly | undefined;
    const reality = realities[realityId || ''] as Reality | undefined;
    const competency = competencies[competencyId || ''] as Competency | undefined;
    const isOwner = userId === playerId;

    const [triggerPatchAgent, { isSuccess, isLoading }] = usePatchAgentMutation();

    const handleSave = () => {
        const body = {
            agent: {
                name: nameInput,
                anomalyId: anomalyInput,
                realityId: realityInput,
                competencyId: competencyInput
            }
        }
        triggerPatchAgent({ id, data: body });
    };

    useEffect(() => {
        if (isSuccess) {
            setEditing(false);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (editing) {
            setNameInput(name);
            setAnomalyInput(anomalyId);
            setRealityInput(realityId);
            setCompetencyInput(competencyId);
        }
    }, [editing]);

    return (
        <div className="flex justify-between items-end">
            <div className="flex flex-col xl:flex-row space-x-4">
                <div className="flex flex-col space-y-0.5">
                    <S.Label>Name</S.Label>
                    {editing ? (
                        <input
                            type="text"
                            className="w-80 border-2 border-deep-purple rounded px-2 py-1"
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            disabled={!editing}
                        />
                    ) : (
                        <S.Value className="w-80 border-deep-purple">{name}</S.Value>
                    )}

                </div>
                <S.Field>
                    <S.Label className="text-anomaly-blue">Anomaly</S.Label>
                    {editing ? (
                        <Select
                            options={anomalyOptions}
                            value={anomalyInput}
                            onChange={setAnomalyInput}
                            arrow={false}
                            color="blue"
                            className="w-40"
                            disabled={!editing}
                            placeholder="Unselected"
                        />
                    ) : (
                        <S.Value className="w-40 text-anomaly-blue border-anomaly-blue">{anomaly ? anomaly.name : 'Unselected'}</S.Value>
                    )}
                </S.Field>
                <S.Field>
                    <S.Label className="text-reality-yellow">Reality</S.Label>
                    {editing ? (
                        <Select
                            options={realityOptions}
                            value={realityInput}
                            onChange={setRealityInput}
                            arrow={false}
                            color="yellow"
                            className="w-40"
                            disabled={!editing}
                            placeholder="Unselected"
                        />
                    ) : (
                        <S.Value className="w-40 border-reality-yellow text-reality-yellow">{reality ? reality.name : 'Unselected'}</S.Value>
                    )}
                </S.Field>
                <S.Field>
                    <S.Label className="text-agency-red">Competency</S.Label>
                    {editing ? (
                        <Select
                            options={competencyOptions}
                            value={competencyInput}
                            onChange={setCompetencyInput}
                            arrow={false}
                            color="red"
                            className="w-40"
                            disabled={!editing}
                            placeholder="Unselected"
                        />
                    ) : (
                        <S.Value className="w-40 border-agency-red text-agency-red">{competency ? competency.name : 'Unselected'}</S.Value>
                    )}
                </S.Field>
            </div>
            {isOwner && (
                <div className="space-x-2">
                    <Button 
                        color={ButtonColors.PURPLE}
                        style={editing ? ButtonStyles.FILL : ButtonStyles.OUTLINE}
                        buttonClasses="w-20 py-1"
                        onClick={editing ? handleSave : () => setEditing(true)}
                        disabled={isLoading}
                    >
                        {editing ? "Save" : "Edit"}
                    </Button>
                    {editing && (
                        <Button
                            color={ButtonColors.RED}
                            style={ButtonStyles.OUTLINE}
                            buttonClasses="w-20 py-1"
                            onClick={() => setEditing(false)}
                        >
                            Cancel
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}