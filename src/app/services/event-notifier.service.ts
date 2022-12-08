import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface BroadcastEvent {
  key: any;
  data?: any;
}

@Injectable({ providedIn: 'root' })

export class EventNotifierService {
  private broadcastEvent = new Subject<BroadcastEvent>();

  /**
   * it general service to use whole system when we must broadcast something
   * @param key any
   * @param data data
   */
  public broadcast(key: any, data?: any): void {
    this.broadcastEvent.next({ key, data });
  }

  /**
   *
   * @param key any
   * we need to listen on key
   */
  public ListenOn<T>(key: any): Observable<T> {
    return this.broadcastEvent.asObservable()
      .pipe(
        filter(event => event.key === key),
        map(event => event.data as T)
      );
  }
}