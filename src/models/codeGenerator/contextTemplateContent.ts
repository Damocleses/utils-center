import { InputTypeEnum } from "../enums";

export interface ContextTemplateContent {
    Id: string;
    key: string;
    type: InputTypeEnum;
    description: string;
    children: ContextTemplateContent[];
}