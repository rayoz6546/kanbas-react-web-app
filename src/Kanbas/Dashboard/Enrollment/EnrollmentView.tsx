import React, { createContext, useContext, useState } from "react";

const ViewContext = createContext<{ isEnrollmentView: boolean; toggleView: () => void } | undefined>(undefined);

export const ViewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isEnrollmentView, setIsEnrollmentView] = useState(true);

    const toggleView = () => {
        setIsEnrollmentView((prev) => !prev);
    };

    return (
        <ViewContext.Provider value={{ isEnrollmentView, toggleView }}>
            {children}
        </ViewContext.Provider>
    );
};

export const useViewContext = () => {
    const context = useContext(ViewContext);
    if (context === undefined) {
        throw new Error("useViewContext must be used within a ViewProvider");
    }
    return context;
};