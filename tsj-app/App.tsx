import { StatusBar } from 'expo-status-bar';
import  AuthProvider from "@/providers/AuthProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "@/navigation/Navigation";
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackendProvider from '@/providers/BackendProvider';

export default function App() {
  return (
      <>
        <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={eva.light}>
              <AuthProvider>
                <SafeAreaProvider>
                  <BackendProvider>
                    <Navigation/>
                  </BackendProvider>
                </SafeAreaProvider>
              </AuthProvider>
          </ApplicationProvider>
        <StatusBar style='dark' />
      </>
  );
}


