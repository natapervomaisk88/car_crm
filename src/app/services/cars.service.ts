import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ICar } from '../models/ICar';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  constructor(private _httpClient: HttpClient) {}

  getAllCars(): Observable<any> {
    return this._httpClient.get(environment.pathToServer);
  }

  createNewCar(data: ICar): Observable<any> {
    return this._httpClient.post(environment.pathToServer, data);
  }
}
