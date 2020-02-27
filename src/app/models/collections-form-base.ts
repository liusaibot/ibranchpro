export class CollectionsFormBase<T> {
    value: T;
    key: number;
    labelName: string;
    inputType: string;
    listItems: string[];
    required: boolean;
    visible: boolean;
    inputValue: any;
    isListData: boolean;
    isTextData: boolean;
    isTextAreaData: boolean;
    isLabelData: boolean;

    constructor(options: {
        value?: T,
        key?: number,
        labelName?: string,
        inputType?: string,
        listItems?: string[],
        required?: boolean,
        visible?: boolean,
        inputValue?: any,
        isListData?: boolean,
        isTextData?: boolean,
        isTextAreaData?: boolean,
        isLabelData?: boolean;
    }) {
        this.value = options.value;
        this.key = (options.key === undefined) ? null : options.key;
        this.labelName = options.labelName || '';
        this.inputType = options.inputType || '';
        this.listItems = options.listItems || [] ;
        this.required = !!options.required;
        this.visible = !!options.visible;
        this.inputValue = options.inputValue || '';
        this.isListData = !!options.isLabelData;
        this.isTextData = !!options.isTextData;
        this.isTextAreaData = !!options.isTextAreaData;
        this.isLabelData = !!options.isLabelData;
     }
}
