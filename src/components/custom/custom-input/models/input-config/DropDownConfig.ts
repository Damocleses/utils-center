import { InputTypeEnum } from "@/models";
import { InputConfig } from "./InputConfig";

export class DropDownConfig extends InputConfig {
    dataList: any[] = [];
    constructor(dataList: any[]) {
        super();
        this.dataList = dataList;
        this.type = InputTypeEnum.dropdown;
    }
}