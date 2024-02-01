import { BaseEntity } from '../base-entity.model';

export class NotificationBarMessage extends BaseEntity {
  title: string;
  brief: string;
  content: string;
  author: string;
  publishDate: Date;
}
