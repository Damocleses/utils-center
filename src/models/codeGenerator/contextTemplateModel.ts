import { TypeEnum } from "../common";

export interface ContextTemplateModel {
    key: string;
    type: TypeEnum;
    description: string;
    children?: ContextTemplateModel[];
}