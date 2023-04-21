interface IParseResponseFormatTuple {
    0: string[];
    1: string;
}
import * as _ from "lodash";
export class Helper {
    public restructureArrObject(arr: any[], theMap: Map<string, string>): any[] {
        const newArr: any[] = [];
        for (const obj of arr) {
            const newObj: any = {};
            for (const [mapkey, mapval] of theMap.entries()) {
                newObj[mapkey] = obj[mapval];
            }
            newArr.push(newObj);
        }
        return newArr;
    }
    /**
     * deprecated, use getFieldsToUseParents
     * @param fieldsToUse
     * @param relateMap Map<fieldToUseTup0, relation>
     */
    public getIncludedRelations(fieldsToUse: IParseResponseFormatTuple[], relateMap: Map<string, string>): any[] {
        const relationMap: Map<string, boolean> = new Map();
        for (const entry of relateMap.entries()) {
            // const fieldToUseTup0 = entry[0];
            const relation = entry[1];
            relationMap.set(relation, false);
        }
        for (const field of fieldsToUse) {
            const fieldToUseTup0 = field[0].join(",");
            if (relateMap.has(fieldToUseTup0)) {
                relationMap.set(fieldToUseTup0, true);
            }
        }
        const relations: any[] = [];
        for (const entry of relationMap.entries()) {
            const relation = entry[0];
            if (entry[1] === true) {
                relations.push(relation);
            }
        }
        return relations;
    }
    /**
     * @param fieldsToUse
     */
    public getFieldsToUseRelations(fieldsToUse: IParseResponseFormatTuple[]): any {
        const relations: any = {};
        const fieldToUseTup0Set: any = new Set();
        for (const field of fieldsToUse) {
            const fieldToUseTup0 = field[0];
            fieldToUseTup0Set.add(fieldToUseTup0.join("."));
        }
        for (const fieldToUseTup0Str of fieldToUseTup0Set) {
            if (fieldToUseTup0Str === "") {
                continue;
            }
            const v = _.get(relations, fieldToUseTup0Str, null);
            if (v === null) {
                _.set(relations, fieldToUseTup0Str, true);
            }
        }
        return relations;
    }
    public getFieldsToUseAsObject(fieldsToUse: IParseResponseFormatTuple[]): any {
        const obj: any = {};
        for (const field of fieldsToUse) {
            const fieldToUseTup0 = field[0];
            const fieldToUseTup1Str = field[1];
            const fieldToUseTup0Str = fieldToUseTup0.join(".");
            const str = fieldToUseTup0Str === "" ? fieldToUseTup1Str : fieldToUseTup0Str + "." + fieldToUseTup1Str;
            const v = _.get(obj, str, null);
            if (v === null) {
                _.set(obj, str, true);
            }
        }
        return obj;
    }
    public numToString(num: number): string {
        if (typeof num === "number") {
            return num.toString();
        } else {
            return num;
        }
    }
    public dateToIsoString(date: Date): string {
        return date ? date.toISOString() : null;
    }
}
