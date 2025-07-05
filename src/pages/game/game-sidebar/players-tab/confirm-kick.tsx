import Modal from "@/components/UI/modal";
import Button from "@/components/UI/button";
import { ButtonColors, ButtonStyles } from "@/enum";
import { confirmable, ConfirmDialog, createConfirmation } from "react-confirm";
import { User } from "@/types";

interface ConfirmKickProps {
    player: User;
};

const ConfirmKick: ConfirmDialog<ConfirmKickProps, boolean> = ({player, proceed, }) => {

    return(
        <Modal>
            <div className="w-80 p-6 space-y-6 bg-white rounded shadow-lg">
                <p className="text-center">
                    Are you sure you want to kick <b>{player.username}</b> from your game?
                </p>
                <div className="flex justify-between">
                    <Button
                        style={ButtonStyles.FILL}
                        color={ButtonColors.RED}
                        buttonClasses="w-[8rem]  py-1"
                        onClick={()=>proceed(true)}
                    >OK</Button>
                    <Button
                        style={ButtonStyles.OUTLINE}
                        color={ButtonColors.RED}
                        buttonClasses="w-[8rem]  py-1"
                        onClick={()=>proceed(false)}
                    >Cancel</Button>       
                </div>     
            </div>
        </Modal>
    )
}

export default createConfirmation(confirmable(ConfirmKick), 50);