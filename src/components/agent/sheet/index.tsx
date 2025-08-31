import { useSelector } from "react-redux";
import { Agent, RootState } from "@/types";
import { useState } from "react";
import Select from "@/components/UI/select";
import Button from "@/components/UI/button";
import { ButtonColors, ButtonStyles } from "@/enum";
import * as S from './styled';

interface AgentSheetProps {
    agent: Agent;
};

export default function AgentSheet({ agent }: AgentSheetProps) {

    const { id, name, anomalyId, realityId, competencyId } = agent;
    const anomalies = useSelector((state:RootState) => state.entities.anomalies);
    const realities = useSelector((state:RootState) => state.entities.realities);
    const competencies = useSelector((state:RootState) => state.entities.competencies);
    const anomaly = anomalies[anomalyId];
    const anomalyOptions = Object.values(anomalies).map(anomaly => ({
        value: anomaly.id,
        label: anomaly.name
    }));
    const reality = realities[realityId];
    const realityOptions = Object.values(realities).map(reality => ({
        value: reality.id,
        label: reality.name
    }));
    const competency = competencies[competencyId];
    const competencyOptions = Object.values(competencies).map(competency => ({
        value: competency.id,
        label: competency.name
    }));

    const [nameInput, setNameInput] = useState(name);
    const [anomalyInput, setAnomalyInput] = useState(anomaly.name);
    const [realityInput, setRealityInput] = useState(reality.name);
    const [competencyInput, setCompetencyInput] = useState(competency.name);
    const [editing, setEditing] = useState(false);

    return (
        <div className='bg-white p-4 rounded shadow-lg'>
            <div className="flex justify-between items-end">
                <div className="flex space-x-4">
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
                            <S.Value className="w-80 border-deep-purple">{nameInput}</S.Value>
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
                            />
                        ) : (
                            <S.Value className="w-40 text-anomaly-blue border-anomaly-blue">{anomalyInput}</S.Value>
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
                            />
                        ) : (
                            <S.Value className="w-40 border-reality-yellow text-reality-yellow">{realityInput}</S.Value>
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
                            />
                        ) : (
                            <S.Value className="w-40 border-agency-red text-agency-red">{competencyInput}</S.Value>
                        )}
                    </S.Field>
                </div>
                <Button 
                    color={ButtonColors.PURPLE}
                    style={editing ? ButtonStyles.FILL : ButtonStyles.OUTLINE}
                    buttonClasses="w-40 py-1"
                    onClick={() => setEditing(!editing)}
                >
                    {editing ? "Save" : "Edit"}
                </Button>
            </div>
        </div>
    );
}