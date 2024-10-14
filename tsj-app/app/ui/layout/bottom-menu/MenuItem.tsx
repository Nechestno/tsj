import { FC } from 'react'
import { Pressable,Text, View} from "react-native";
import {IMenuItem, TypeNav} from "@/ui/layout/bottom-menu/menu.interface";
import {AntDesign} from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {AppConstants} from "@/app.constants";
import {flex} from "nativewind/dist/postcss/to-react-native/properties/flex";

interface IMenuItemProps {
    item: IMenuItem
    nav: TypeNav
    currentRoute?:string
}
const MenuItem: FC<IMenuItemProps>  = ({currentRoute,nav,item}) => {
  const isActive = currentRoute === item.path

  return (
    <Pressable className='w-[30%]' onPress={() => nav(item.path)}>
        <View className = 'justify-center items-center px-0 mx-0 '>
            <MaterialCommunityIcons name={item.iconName} size={24} color={isActive ? AppConstants.primary : '#000000'} >
            </MaterialCommunityIcons>
            <Text>{item.name}</Text>
        </View>
    </Pressable>
  )
}

export default MenuItem