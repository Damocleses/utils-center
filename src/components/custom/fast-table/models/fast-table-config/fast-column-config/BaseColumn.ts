import { ColumnOptions } from "./ColumnOptions";

export class BaseColumn {
    label: string;
    prop: string;
    options?: ColumnOptions;

    constructor(label: string, prop: string, options?: ColumnOptions) {
        this.label = label;
        this.prop = prop;
        this.options = options;
    }
}