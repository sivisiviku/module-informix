import { MaintenableDto } from "./maintenable";

export interface DeviceDto extends MaintenableDto {
    id: string
    device_mac: string
    device_desc: string
    device_type: string
    area_id: string
}