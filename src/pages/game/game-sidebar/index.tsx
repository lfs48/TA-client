import SettingsTab from "./settings-tab";

export default function GameSidebar() {

    return(
        <div className="w-[25rem] h-screen-minus-nav absolute top-0 right-0 bg-white">
            <SettingsTab />
        </div>
    )
}