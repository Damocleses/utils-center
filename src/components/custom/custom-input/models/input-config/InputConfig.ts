import { InputTypeEnum } from "@/models";

export class InputConfig {
    type: InputTypeEnum;

    constructor(type?: InputTypeEnum) {
        this.type = type || InputTypeEnum.text;
    }
}