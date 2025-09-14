import { Currency } from "@/types";
import { 
    useEarnCurrencyMutation, 
    useSpendCurrencyMutation 
} from "@/api/agent.api";
import { useState } from "react";
import * as S from './styled';
import { RiAuctionFill, RiAwardFill } from "@remixicon/react";
import { ButtonColors, ButtonStyles } from "@/enum";
import Button from "@/components/UI/button";
import NumberInput from "@/components/UI/number-input";

interface CurrencyFieldsProps {
    id: string;
    currency: Currency;
    current: number;
    banked: number;
    spent: number;
}

export default function CurrencySection({
    id,
    currency,
    current,
    banked,
    spent 
}: CurrencyFieldsProps) {

    const [input, setInput] = useState(0);

    const [triggerEarn, {isLoading: earnLoading}] = useEarnCurrencyMutation();
    const [triggerSpend, {isLoading: spendLoading}] = useSpendCurrencyMutation();

    const loading = earnLoading || spendLoading;

    const handleTransaction = async (type: 'earn' | 'spend', quantity: number) => {
        const data = { currency, quantity };
        if (type === 'earn') {
            await triggerEarn({ id, data });
        } else {
            await triggerSpend({ id, data });
        }
        setInput(0);
    };

    return (
        <div className="flex flex-col space-y-3">
            <span className="text-xl font-bold">{currency === 'commendations' ? 'Commendations' : 'Demerits'}</span>
            <S.LineItem>
                <div className="flex space-x-2">
                    <CurrencyIcon currency={currency} className="size-5 text-agency-red"/>
                    <S.SubLabel>Earned this Mission</S.SubLabel>
                </div>
                <div>{current}</div>
            </S.LineItem>
            <S.LineItem>
                <div className="flex space-x-2">
                    <CurrencyIcon currency={currency} className="size-5 text-agency-red"/>
                    <S.SubLabel>Total Banked</S.SubLabel>
                </div>
                <div>{banked}</div>
            </S.LineItem>
            <S.LineItem>
                <div className="flex space-x-2">
                    <CurrencyIcon currency={currency} className="size-5 text-agency-red"/>
                    <S.SubLabel>Cumulative Earned</S.SubLabel>
                </div>
                <div>{banked + spent}</div>
            </S.LineItem>
            <div className="flex items-end space-x-2">
                <NumberInput
                    value={input}
                    onChange={(value) => setInput(value)}
                    min={1}
                    max={999}
                    className="w-20"
                />
                <Button
                    color={ButtonColors .RED}
                    style={ButtonStyles.FILL}
                    buttonClasses="w-20 py-1"
                    disabled={loading}
                    onClick={() => handleTransaction('earn', input)}
                >Award</Button>
                <Button
                    color={ButtonColors.PURPLE}
                    style={ButtonStyles.OUTLINE}
                    buttonClasses="w-20 py-1"
                    disabled={loading}
                    onClick={() => handleTransaction('spend', input)}
                >Spend</Button>
                <Button
                    color={ButtonColors.PURPLE}
                    style={ButtonStyles.FILL}
                    buttonClasses="w-20 py-1"
                    disabled={loading}
                    onClick={() => handleTransaction('earn', -1 * input)}
                >Rescind</Button>
            </div>
        </div>
    );
}

function CurrencyIcon({currency, ...props}) {
    switch(currency) {
        case('commendations'):
            return <RiAwardFill {...props}/>;
        case('demerits'):
            return <RiAuctionFill {...props} />;
    }
}
