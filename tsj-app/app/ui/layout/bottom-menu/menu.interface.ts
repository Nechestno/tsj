import {MaterialCommunityIcons} from '@expo/vector-icons'
import {TypeRootStackParamList} from "@/navigation/navigation.types";
export interface IMenuItem {
    iconName: keyof typeof MaterialCommunityIcons.glyphMap
    path: keyof TypeRootStackParamList
    name: String
}

export type TypeNav = (name: keyof TypeRootStackParamList) => void