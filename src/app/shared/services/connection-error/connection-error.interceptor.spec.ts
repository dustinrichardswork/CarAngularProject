import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpTestingController,
  HttpClientTestingModule,
  TestRequest,
} from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';

import { ConnectionInterceptor } from './connection-error.interceptor';
import { AuthService } from '../auth.new.service';

describe('Shared Services: ConnectionInterceptor', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let httpRequest: TestRequest;

  const mockedDialogRef = {
    close: jasmine.createSpy('close'),
  };
  const mockedDialog = {
    open: jasmine.createSpy('open').and.returnValue(mockedDialogRef),
  };
  const mockLocalStorage = {
    getItem: () => JSON.stringify({ refreshToken: 'mocked.token' }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ConnectionInterceptor,
          multi: true,
        },
        { provide: MatDialog, useValue: mockedDialog },
        { provide: 'BASE_URL', useValue: 'https://manage.addcar.stantumdemo.eu/' },
      ],
    });

    authService = TestBed.inject<AuthService>(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOnProperty(navigator, 'onLine').and.returnValue(false);
  });

  describe('ConnectionInterceptor', () => {
    const error = new ErrorEvent('Error');

    beforeEach(fakeAsync(() => {
      authService.logout().subscribe();

      httpRequest = httpMock.expectOne(
        'https://manage.addcar.stantumdemo.eu/api/auth/logout/mocked.token',
      );
      httpRequest.error(error);
      httpMock.verify();
      tick(1550);
    }));

    it('should not open or close dialog if it is already open and internet connection is inactive', fakeAsync(() => {
      authService.logout().subscribe();
      httpRequest = httpMock.match(
        'https://manage.addcar.stantumdemo.eu/api/auth/logout/mocked.token',
      )[1];
      httpRequest.error(error);
      httpMock.verify();
      tick(1550);

      expect(httpRequest.request.method).toBe('DELETE');
      expect(mockedDialogRef.close).not.toHaveBeenCalledWith();
      expect(mockedDialog.open).not.toHaveBeenCalledTimes(2);
    }));

    it('should open connection error dialog for failed request and inactive internet connection', () => {
      expect(mockedDialog.open).toHaveBeenCalledWith(jasmine.any(Function), {
        disableClose: true,
        closeOnNavigation: false,
      });
    });

    it('should close connection error dialog if internet connection is active', () => {
      const onlineEvent = new Event('online');
      window.dispatchEvent(onlineEvent);

      expect(mockedDialogRef.close).toHaveBeenCalledWith();
    });
  });
});
