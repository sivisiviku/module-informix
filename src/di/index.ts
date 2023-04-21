// tslint:disable:max-line-length
import { Validator } from "le-validator2";
import { PartialResponsify } from "partial-responsify";
import { IDI } from "../interface";
import {
    Config,
    Helper,
    Informix
} from "../lib";


export const getDiComponent = async (config: Config): Promise<IDI> => {
    const di: IDI = {
        config,
        helper: new Helper(),
        informix: new Informix(),
        partialResponsify: new PartialResponsify(),
        validator: new Validator(),
    };


    return di;
};
