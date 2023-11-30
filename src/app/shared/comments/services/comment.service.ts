import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { CommentData } from '@shared/comments/models';


export interface SaveCommentPayload {
  text: string;
}

export interface UpdateCommentPayload {
  id: number;
  name: string;
}

@Injectable()
export class CommentService {
  private basic = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getByReceiptId(id: number): Observable<CommentData[]> {
    return this.http.get<CommentData[]>(this.basic + `/recipes/${id}/comments`)
  }

  saveByReceiptId(id: number, value: SaveCommentPayload): Observable<CommentData> {
    return this.http.post<CommentData>(this.basic + `/recipes/${id}/comments`, value);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.basic + `/comments/${id}`);
  }
}
