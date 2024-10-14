import {Component, ComponentType} from "react";

export type TypeRootStackParamList ={
    Auth: undefined
    Home: undefined
    Values: undefined
    Profile :undefined
    ChangeTelephoneNumber: undefined
    AddNewCounter: undefined
    ConnectFlat: undefined
    DeleteCounter: undefined
}

export interface IRoute{
    name: keyof TypeRootStackParamList
    showName: string
    component: ComponentType
}