import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BaseService {

    private _createDialog: boolean = false;
    private _editDialog: boolean = false;
    private _viewDialog: boolean = false;

    get createDialog(): boolean {
        return this._createDialog;
    }

    set createDialog(value: boolean) {
        this._createDialog = value;
    }

    get editDialog(): boolean {
        return this._editDialog;
    }

    set editDialog(value: boolean) {
        this._editDialog = value;
    }

    get viewDialog(): boolean {
        return this._viewDialog;
    }

    set viewDialog(value: boolean) {
        this._viewDialog = value;
    }
}
