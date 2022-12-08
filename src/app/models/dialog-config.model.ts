import { ShareLocationModel } from "./share-location.model"

export interface DialogConfig {
    component: any,
    size: string,
    data: IncommitDialogData

}


export interface LatLng {
    lat: number,
    lng: number
}

export interface IncommitDialogData {
    title: string
    latLng: LatLng,
    currentLocation?: ShareLocationModel
}