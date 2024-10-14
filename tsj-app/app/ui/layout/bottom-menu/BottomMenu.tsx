import { FC } from 'react'
import { Text, View } from "react-native";
import { TypeNav } from "@/ui/layout/bottom-menu/menu.interface";
import { menuData } from "@/ui/layout/bottom-menu/menu.data";
import MenuItem from "@/ui/layout/bottom-menu/MenuItem";
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {flex} from "nativewind/dist/postcss/to-react-native/properties/flex";


interface  IBottomMenu {
    nav: TypeNav
    currentRoute?:string
}
const BottomMenu: FC<IBottomMenu>  = ({currentRoute,nav}) => {
    const {bottom} = useSafeAreaInsets()

    return (
    <View className='pt-4  flex-row justify-between w-full bg-white'
    style={{
        paddingBottom: bottom + 10
    }}>
        {menuData.map(item => <MenuItem nav={nav} item={item} currentRoute={currentRoute} key={item.path}/>)}
    </View>
  )
}

export default BottomMenu