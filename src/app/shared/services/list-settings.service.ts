import { Injectable } from '@angular/core';
import { ListSettings } from '../models/list-settings.model';

@Injectable({ providedIn: 'root' })
export class ListSettingsService {
  get(key: string): ListSettings {
    const settings = localStorage.getItem(key);
    if (settings) return JSON.parse(settings);
    return null;
  }

  set(key: string, value: ListSettings): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
