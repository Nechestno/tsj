import { BackendContext } from "@/providers/BackendProvider";
import { useContext } from "react";


export const useBackend = () => {
    return useContext(BackendContext);
};