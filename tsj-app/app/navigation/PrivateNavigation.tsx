import { FC } from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { TypeRootStackParamList } from "./navigation.types";

import { routes } from "./routes";
import Auth from "@/components/screens/auth/Auth";
import { useAuth } from '@/hooks/useAuth';


const Stack = createNativeStackNavigator<TypeRootStackParamList>()
const PrivateNavigation: FC  = () => {
  const {authState} = useAuth()
 

  return (
    <Stack.Navigator screenOptions={{
      headerBackButtonMenuEnabled: false,
      animation: "none",
      headerBackVisible: false
    }
    }>
        {authState?.authenticated ?
            (routes.map(route => <Stack.Screen key={route.name} {...route} options={{title:route.showName}} />)
            ) : 
            (<Stack.Screen  name='Auth'  component={Auth} options={{headerShown:false}}></Stack.Screen>)
            }
    </Stack.Navigator>
  )
}

export default PrivateNavigation