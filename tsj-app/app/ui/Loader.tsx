import { FC } from 'react'
import {ActivityIndicator, Text, View} from "react-native";
import {AppConstants} from "@/app.constants";

const Loader: FC  = () => {
  return (
    <ActivityIndicator color={AppConstants.primary} size='large'></ActivityIndicator>
  )
}

export default Loader