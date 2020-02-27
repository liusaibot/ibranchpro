import { CollectionsFormBase } from "./collections-form-base";

export class CollectionsFormTypeText extends CollectionsFormBase<string> {
    inputType = 'text';
    type: string;

    constructor(options: {} = {}){
        super(options);
        this.type = options['type'] || '';
    }
}
