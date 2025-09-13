import List from "@/components/UI/list";
import Modal from "@/components/UI/modal";
import Button from "@/components/UI/button";
import { confirmable, ConfirmDialog, createConfirmation } from "react-confirm";
import { ButtonColors, ButtonStyles } from "@/enum";

interface ConfirmResetProps {};

const ConfirmResetAgent: ConfirmDialog<ConfirmResetProps, boolean> = (({ proceed }) => {

    return(
        <Modal className="z-99">
            <div className="w-120 p-6 space-y-6 bg-white rounded shadow-lg">
                <h1>Are you sure you want to perform a mission reset?</h1>
                <p>This will:</p>
                <List
                    items={[
                        "Restore all spent Quality Assurances.",
                        "Reset the 'Earned this Mission' count for Commendations and Demerits.",
                        "Reset all performed Sanctioned Behaviors.",
                    ]}
                />
                <div className="flex justify-end space-x-4">
                    <Button
                        color={ButtonColors.RED}
                        style={ButtonStyles.OUTLINE}
                        buttonClasses="w-24 py-1"
                        onClick={() => proceed(true)}
                    >
                        Confirm
                    </Button>
                    <Button
                        color={ButtonColors.RED}
                        style={ButtonStyles.FILL}
                        buttonClasses="w-24  py-1"
                        onClick={() => proceed(false)}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
});

export default createConfirmation(confirmable(ConfirmResetAgent), 50);