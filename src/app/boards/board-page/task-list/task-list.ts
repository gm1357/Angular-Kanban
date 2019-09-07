export class TaskList {

    private _id: number;
    private _name: string;
    
    constructor(obj) {
        obj && Object.assign(this, obj);
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }
}