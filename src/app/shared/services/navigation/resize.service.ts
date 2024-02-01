import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { fromEvent, NEVER, Observable } from 'rxjs';

// @dynamic
@Injectable({
  providedIn: 'root',
})
export class ResizeService extends Observable<Event> {
  private readonly resize$: Observable<Event>;

  constructor(
    @Inject(DOCUMENT) { defaultView }: Document,
  ) {
    super(subscriber => this.resize$.subscribe(subscriber));

    this.resize$ = defaultView ? fromEvent(defaultView, 'resize') : NEVER;
  }
}
