import { useAppSelector } from "@/hooks/useAppSelector.hook";
import { selectAgentById } from "@/reducers/entities/agent.reducer";
import { Agent, Currency } from "@/types";
import { 
    RiAuctionFill, 
    RiAwardFill, 
    RiResetLeftLine 
} from "@remixicon/react";
import * as S from './styled';
import Button from "@/components/UI/button";
import NumberInput from "@/components/UI/number-input";
import { ButtonColors, ButtonStyles } from "@/enum";
import { 
    useEarnCurrencyMutation, 
    useResetAgentCurrencyMutation, 
    useSpendCurrencyMutation 
} from "@/api/agent.api";
import { useState } from "react";

interface AgentCurrencyProps {
    id: string;
}

export default function AgentCurrency({
    id,
}: AgentCurrencyProps) {

    const agent = useAppSelector(state => selectAgentById(state, id)) as Agent;
    const {commendations, demerits} = agent?.currency;

    const [commInput, setCommInput] = useState(0);
    const [demInput, setDemInput] = useState(0);

    const [triggerEarn, {isLoading: earnLoading}] = useEarnCurrencyMutation();
    const [triggerSpend, {isLoading: spendLoading}] = useSpendCurrencyMutation();
    const [triggerReset, {isLoading: resetLoading}] = useResetAgentCurrencyMutation();

    const loading = earnLoading || spendLoading || resetLoading;

    const handleTransaction = async (type: 'earn' | 'spend', currency: Currency, quantity: number) => {
        const data = { currency, quantity };
        if (type === 'earn') {
            await triggerEarn({ id, data });
        } else {
            await triggerSpend({ id, data });
        }
        currency === 'commendations' ? setCommInput(0) : setDemInput(0);
    };

    const handleReset = async (currency: Currency) => {
        if (!loading) {
            await triggerReset({ id, data: { currency } });
        }
    };

    return (
        <div className="flex flex-col space-y-2">
            <h2 className="text-xl">Emotional Currency</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-3">
                    <span className="text-lg font-bold">Commendations</span>
                    <div className="flex space-x-2">
                        <S.LineItem>
                            <div className="flex space-x-2">
                                <RiAwardFill className="size-5 text-agency-red"/>
                                <S.SubLabel>Earned this Mission</S.SubLabel>
                            </div>
                            <div>{commendations.current}</div>
                        </S.LineItem>
                        <RiResetLeftLine 
                            className="size-5 text-agency-red mt-1 cursor-pointer"
                            onClick={() => handleReset('commendations')}
                        />
                    </div>
                    <S.LineItem>
                        <div className="flex space-x-2">
                            <RiAwardFill className="size-5 text-agency-red"/>
                            <S.SubLabel>Total Banked</S.SubLabel>
                        </div>
                        <div>{commendations.banked}</div>
                    </S.LineItem>
                    <S.LineItem>
                        <div className="flex space-x-2">
                            <RiAwardFill className="size-5 text-agency-red"/>
                            <S.SubLabel>Cumulative Earned</S.SubLabel>
                        </div>
                        <div>{commendations.banked + commendations.spent}</div>
                    </S.LineItem>
                    <div className="flex items-end space-x-2">
                        <NumberInput
                            value={commInput}
                            onChange={(value) => setCommInput(value)}
                            min={1}
                            max={999}
                            className="w-20"
                        />
                        <Button
                            color={ButtonColors.RED}
                            style={ButtonStyles.FILL}
                            buttonClasses="w-20 py-1"
                            disabled={loading}
                            onClick={() => handleTransaction('earn', 'commendations', commInput)}
                        >Award</Button>
                        <Button
                            color={ButtonColors.PURPLE}
                            style={ButtonStyles.OUTLINE}
                            buttonClasses="w-20 py-1"
                            disabled={loading}
                            onClick={() => handleTransaction('spend', 'commendations', commInput)}
                        >Spend</Button>
                        <Button
                            color={ButtonColors.PURPLE}
                            style={ButtonStyles.FILL}
                            buttonClasses="w-20 py-1"
                            disabled={loading}
                            onClick={() => handleTransaction('earn', 'commendations', -1* commInput)}
                        >Rescind</Button>
                    </div>
                </div>
                <div className="flex flex-col space-y-3">
                    <span className="text-lg font-bold">Demerits</span>
                    <div className="flex space-x-2">
                        <S.LineItem>
                            <div className="flex space-x-2">
                                <RiAuctionFill className="size-5 text-agency-red"/>
                                <S.SubLabel>Accrued this Mission</S.SubLabel>
                            </div>
                            <div>{demerits.current}</div>
                        </S.LineItem>
                        <RiResetLeftLine 
                            className="size-5 text-agency-red mt-1 cursor-pointer"
                            onClick={() => handleReset('demerits')}
                        />
                    </div>
                    <S.LineItem>
                        <div className="flex space-x-2">
                            <RiAuctionFill className="size-5 text-agency-red"/>
                            <S.SubLabel>Total Banked</S.SubLabel>
                        </div>
                        <div>{demerits.banked}</div>
                    </S.LineItem>
                    <S.LineItem>
                        <div className="flex space-x-2">
                            <RiAuctionFill className="size-5 text-agency-red"/>
                            <S.SubLabel>Cumulative Accrued</S.SubLabel>
                        </div>
                        <div>{demerits.banked + demerits.spent}</div>
                    </S.LineItem>
                    <div className="flex items-end space-x-2">
                        <NumberInput
                            value={demInput}
                            onChange={(value) => setDemInput(value)}
                            min={1}
                            max={999}
                            className="w-20"
                        />
                        <Button
                            color={ButtonColors.RED}
                            style={ButtonStyles.FILL}
                            buttonClasses="w-20 py-1"
                            disabled={loading}
                            onClick={() => handleTransaction('earn', 'demerits', demInput)}
                        >Assign</Button>
                        <Button
                            color={ButtonColors.PURPLE}
                            style={ButtonStyles.OUTLINE}
                            buttonClasses="w-20 py-1"
                            disabled={loading}
                            onClick={() => handleTransaction('spend', 'demerits', demInput)}
                        >Spend</Button>
                        <Button
                            color={ButtonColors.PURPLE}
                            style={ButtonStyles.FILL}
                            buttonClasses="w-20 py-1"
                            disabled={loading}
                            onClick={() => handleTransaction('earn', 'demerits', -1 * demInput)}
                        >Rescind</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
