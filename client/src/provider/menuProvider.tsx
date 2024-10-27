import {
    useContext,
    createContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from "react";

interface MenuContextType {
    toggleMenu: Dispatch<SetStateAction<boolean>>;
    isOpen: boolean;
}

const MenuContext = createContext<MenuContextType | null>(null);

const MenuProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, toggleMenu] = useState<boolean>(true);
    return (
        <MenuContext.Provider value={{ isOpen, toggleMenu }}>
            {children}
        </MenuContext.Provider>
    );
};
const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error("useMenu must be used inside a MenuProvider");
    }
    return context;
};
export default MenuProvider;
export { useMenu };
