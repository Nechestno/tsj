import {FC, useEffect, useState} from "react";
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native'
import BottomMenu from "@/ui/layout/bottom-menu/BottomMenu";
import PrivateNavigation from "@/navigation/PrivateNavigation";
import { useAuth } from "@/hooks/useAuth";

const Navigation:FC = () => {
    const {authState} = useAuth()

    const [currentRoute, setCurrentRoute] = useState<string | undefined >(
        undefined
    )
    const navRef = useNavigationContainerRef()

    useEffect(() => {
        setCurrentRoute(navRef.getCurrentRoute()?.name)

        const listener = navRef.addListener('state', () =>
            setCurrentRoute(navRef.getCurrentRoute()?.name))

        return () => {
            navRef.removeListener('state', listener)
        }
    }, [])

    console.log(currentRoute);
    return(
        <>
            <NavigationContainer ref={navRef}>
                <PrivateNavigation />
            </NavigationContainer>
            {authState?.authenticated && currentRoute && (
                <BottomMenu nav={navRef.navigate} currentRoute={currentRoute}/>
            )}
        </>
    )
}

export default Navigation