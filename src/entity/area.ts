import { MaintenableDto } from "./maintenable";


export interface AreaDto extends MaintenableDto {
    id: string
    name: string
    description: string
    public: string
    floor_id: string
}