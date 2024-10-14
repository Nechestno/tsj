import {IRoute} from "@/navigation/navigation.types";
import Auth from "@/components/screens/auth/Auth";
import Home from "@/components/screens/home/Home";
import Values from "@/components/screens/values/Values";
import Profile from "@/components/screens/profile/Profile";
import ChangeTelephoneNumber from "@/components/screens/changeInfo/ChangeTelephoneNumber";
import AddNewCounter from "@/components/screens/addNewCounter/AddNewCounter";
import ConnectFlat from "@/components/screens/conectFlat/ConnectFlat";
import DeleteCounter from "@/components/screens/deleteCounter/DeleteCounter";

export const routes:IRoute[] = [
    {
        name:'Home',
        showName:'Главная',
        component: Home
    },{
        name:'Values',
        showName:'Показания счетчика',
        component: Values
    },{
        name:'Profile',
        showName:'Профиль',
        component: Profile
    },
    {
        name:'ChangeTelephoneNumber',
        showName:'Изменить номер телефона',
        component: ChangeTelephoneNumber
    },
    {
        name:'AddNewCounter',
        showName:'Добавить cчетчик',
        component: AddNewCounter
    },
    {
        name:'ConnectFlat',
        showName:'Привязать квартиру',
        component: ConnectFlat
    },
    {
        name:'DeleteCounter',
        showName:'Удалить счетчик',
        component: DeleteCounter
    },

]