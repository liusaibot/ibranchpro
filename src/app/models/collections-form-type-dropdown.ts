import { CollectionsFormBase } from "./collections-form-base";

export class CollectionsFormTypeDropdown extends CollectionsFormBase<string>{
    inputType = 'dropdown';
    options: {key: string, value: string}[] = [];

    constructor(options: {} = {}){
        super(options);
        this.options = options['options'] || [];
    }
}
