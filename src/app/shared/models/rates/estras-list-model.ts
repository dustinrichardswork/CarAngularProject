import { ExtraBaseEntity } from '../base-entity.model'

export class ExtrasListModel extends ExtraBaseEntity {
    uid	: string;
    entityVersion : string;
}

export class ExtrasCreateModel extends ExtraBaseEntity {

}

export class ExtrasUpdateModel extends ExtraBaseEntity {
    entityVersion	: string;
}