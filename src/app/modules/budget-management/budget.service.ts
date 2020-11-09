import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Budget } from '../shared/models/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  baseURL = 'http://localhost:3000/api/v1/budget';

  constructor(private http: HttpClient) { }

  updateBudget(budget: Budget): Observable<Budget> {
    return this.http.put<Budget>(this.baseURL, budget);
  }
}
