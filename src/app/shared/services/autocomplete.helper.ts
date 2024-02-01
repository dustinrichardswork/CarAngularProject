import { BrokerShortListItem } from "@app-shared/models/broker-short-list-item.model";
import { LocationListItem } from "@app-shared/models/location-list-item.model";
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { FranchiseeShortListItem } from '../models/franchisee-short-list-item.model';
import { SubFranchiseeListItem } from '../models/sub-franchisee-list-item.model';

export class AutocompleteHelper<T> {
  debounceTime = 300;
  source: T[];
  isSearching = false;
  isSearchFailed = false;

  loader: (name: string) => Observable<Array<T>>;
  formatter: (item: T) => string;
  filter: (term: string, list: Array<T>) => Array<T>;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
      tap(() => (this.isSearching = true)),
      switchMap((term) => this.performSearch(term)),
      tap(() => (this.isSearching = false)),
    );

  performSearch(term: string): Observable<Array<T>> {
    if (!term || term === '') {
      this.isSearching = false;
      return EMPTY;
    }

    return this.loader(term).pipe(
      tap(() => {
        this.isSearchFailed = false;
      }),
      map((res) => {
        this.source = res;
        this.isSearching = false;
        return this.filter(term, this.source);
      }),
      catchError(() => {
        this.isSearchFailed = true;
        this.isSearching = false;
        return of([]);
      }),
    );
  }

  static franchiseeListFilter(
    term: string,
    list: FranchiseeShortListItem[],
  ): FranchiseeShortListItem[] {
    return list.filter((c) => c.name.toLowerCase().indexOf(term.toLowerCase()) > -1);
  }

  static subFranchiseeListFilter(
    term: string,
    list: SubFranchiseeListItem[],
  ): SubFranchiseeListItem[] {
    return list.filter((c) => c.name.toLowerCase().indexOf(term.toLowerCase()) > -1);
  }

  static profileListFilter(term: string, list: string[]): string[] {
    return list.filter((c) => c.toLowerCase().indexOf(term.toLowerCase()) > -1);
  }

  static franchiseeInvoicesListFilter(term: string, list: string[]): string[] {
    return list.filter((c) => c.toLowerCase().indexOf(term.toLowerCase()) > -1);
  }

  static brokerListFilter(
    term: string,
    list: BrokerShortListItem[],
  ): BrokerShortListItem[] {
    return list.filter((c) => c.name.toLowerCase().indexOf(term.toLowerCase()) > -1);
  }

  static brokerListFormatter(
    term: BrokerShortListItem
  ): string {
    if (!term?.name)
      return "";
    //if (term.jimpiClientId)
    //  return `${term.jimpiClientId} - ${term.name}`;
    //else
    return `${term.name}`;
  }

  static brokerListLoader(
    list: BrokerShortListItem[]
  ): BrokerShortListItem[] {
    if (!list)
      return list;

    const result: BrokerShortListItem[] = [];

    for (var i = 0; i < list.length; i++) {
      if (AutocompleteHelper.brokerListFilter(list[i].name, result).length == 0)
        result.push(list[i]);
    }
    return result;
  }

  static nameFilter(
    term: string,
    list: string[],
  ): string[] {
    return list.filter((c) => c.toLowerCase().indexOf(term.toLowerCase()) > -1);
  }

  static brokerInvoicesFilter(
    term: string,
    list: string[]
  ): string[] {
    return list.filter((c) => c.toLowerCase().indexOf(term.toLowerCase()) > -1);
  }

  static locationsListFilter(
    term: string,
    list: LocationListItem[],
  ): LocationListItem[] {
    return list.filter((c) => c.name.toLowerCase().indexOf(term.toLowerCase()) > -1);
  }

}
