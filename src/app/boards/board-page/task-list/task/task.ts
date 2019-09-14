export class Task {

    private _id: number;
    private _title: string;
    private _details: string;
    private _color: string;
    
    constructor(obj) {
        obj && Object.assign(this, obj);
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    get details() {
        return this._details;
    }

    get color() {
        return this._color;
    }
}