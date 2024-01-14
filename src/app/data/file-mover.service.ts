import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { FileMoverEvent } from './model/file-mover-event';
import { FileRule } from './model/file-rule';
import { FileMoverProperty } from './model/file-mover-property';

@Injectable({
  providedIn: 'root',
})
export class FileMoverService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAllFileRules(): Observable<FileRule[]> {
    return this.http.get<FileRule[]>(`${this.apiUrl}/filerules`).pipe(
      catchError((err) => {
        console.error(err);
        return of([]);
      }),
    );
  }

  getAllFileMoverProperties(): Observable<FileMoverProperty[]> {
    return this.http
      .get<FileMoverProperty[]>(`${this.apiUrl}/filemoverproperties`)
      .pipe(
        catchError((err) => {
          console.error(err);
          return of([]);
        }),
      );
  }

  getAllFileMoverEvents(): Observable<FileMoverEvent[]> {
    return this.http
      .get<FileMoverEvent[]>(`${this.apiUrl}/filemoverevents`)
      .pipe(
        catchError((err) => {
          console.error(err);
          return of([]);
        }),
      );
  }
  deleteAllFileMoverEvents() {
    return this.http.delete(`${this.apiUrl}/filemoverevents`);
  }

  navigateFileMoverEvent(fileMoverEventId: number): Observable<string> {
    return this.http.get(
      `${this.apiUrl}/filemoverevents/navigations/${fileMoverEventId}`,
      { responseType: 'text' },
    );
  }

  createFileRule(fileRule: FileRule): Observable<FileRule> {
    return this.http.post<FileRule>(`${this.apiUrl}/filerule`, fileRule);
  }

  deleteFileRule(fileRuleId: number): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/filerule/${fileRuleId}`);
  }

  updateFileRule(fileRule: FileRule): Observable<FileRule> {
    return this.http.put<FileRule>(`${this.apiUrl}/filerule`, fileRule);
  }

  updateFileMoverProperty(
    fileMoverProperty: FileMoverProperty,
  ): Observable<FileMoverProperty> {
    return this.http.put<FileMoverProperty>(
      `${this.apiUrl}/filemoverproperty`,
      fileMoverProperty,
    );
  }
}
