import { MaintenableDto } from "./maintenable";


export interface FloorDto extends MaintenableDto {
    id: string
    name: string
    public: string
    qa_id: number
}