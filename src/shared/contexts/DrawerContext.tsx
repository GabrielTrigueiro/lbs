import { createContext, useCallback, useContext, useState } from "react";

interface ISideBarItem{
    path: string
    icon: string
    label: string
}

interface ISideBarProps{
    isSideBarOpen: boolean
    toggleSideBar: ()=> void
    sideBarOption: ISideBarItem[]
    setSideBarOption: (newSideBarOption: ISideBarItem[]) => void
}

const SideBarContext = createContext({} as ISideBarProps);

export const useSideBarContext = () => {
    return useContext(SideBarContext);
};

export const SideBarProvider: React.FC = ({children}) => {

    const [sideOpen, setSideOpen] = useState<boolean>(false);
    const [sideItem, setSideItem] = useState<ISideBarItem[]>([]);
    const toggleSide = useCallback(()=>{
        setSideOpen((oldSideOpen) => !oldSideOpen);
    },[]);
    const handleSetSideBarItems = useCallback((newSideItem: ISideBarItem[])=>{
        setSideItem(newSideItem);
    },[]);

    return(
        <SideBarContext.Provider
            value={{
                toggleSideBar: toggleSide,
                isSideBarOpen: sideOpen,
                setSideBarOption: handleSetSideBarItems,
                sideBarOption: sideItem,
            }}>
            {children}
        </SideBarContext.Provider>
    );
};