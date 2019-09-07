export class Board {

    private _id: number;
    private _name: string;
    private _color: string;
    
    constructor(obj) {
        obj && Object.assign(this, obj);
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get color() {
        return this._color;
    }
}