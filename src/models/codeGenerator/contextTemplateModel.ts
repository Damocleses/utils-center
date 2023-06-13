import { InputTypeEnum } from "../enums";

export interface ContextTemplateModel {
    Id: string;
    key: string;
    type: InputTypeEnum;
    description: string;
    children: ContextTemplateModel[];
}