import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Receipt } from '../models';

@Injectable()
export class ReceiptService {
    // TODO: Change url after BE ready
    private basic = 'http://localhost:8080/receipt';

    private readonly mock: Receipt[] = [
      {
        "id": "1",
        "name": "Receipt 1",
        "quantity": 2,
        "duration": 600,
        "difficulty": "Easy",
        "price": 10.99,
        "photo": "base64_encoded_photo_1",
        "createdAt": 999995484800,
        "createdBy": "User A"
      },
      {
        "id": "2",
        "name": "Receipt 2",
        "quantity": 4,
        "duration": 999995484800,
        "difficulty": "Medium",
        "price": 15.49,
        "photo": "base64_encoded_photo_2",
        "createdAt": 999995484800,
        "createdBy": "User B"
      },
      {
        "id": "3",
        "name": "Receipt 3",
        "quantity": 1,
        "duration": 999995484800,
        "difficulty": "Hard",
        "price": 20.99,
        "photo": "base64_encoded_photo_3",
        "createdAt": 999995484800,
        "createdBy": "User C"
      },
      {
        "id": "4",
        "name": "Receipt 4",
        "quantity": 3,
        "duration": 999995484800,
        "difficulty": "Medium",
        "price": 12.99,
        "photo": "base64_encoded_photo_4",
        "createdAt": 999995484800,
        "createdBy": "User D"
      },
      {
        "id": "5",
        "name": "Receipt 5",
        "quantity": 2,
        "duration": 999995484800,
        "difficulty": "Easy",
        "price": 9.99,
        "photo": "base64_encoded_photo_5",
        "createdAt": 999995484800,
        "createdBy": "User E"
      },
      {
        "id": "6",
        "name": "Receipt 6",
        "quantity": 1,
        "duration": 999995484800,
        "difficulty": "Hard",
        "price": 18.99,
        "photo": "base64_encoded_photo_6",
        "createdAt": 999995484800,
        "createdBy": "User F"
      },
      {
        "id": "7",
        "name": "Receipt 7",
        "quantity": 4,
        "duration": 999995484800,
        "difficulty": "Medium",
        "price": 13.49,
        "photo": "base64_encoded_photo_7",
        "createdAt": 999995484800,
        "createdBy": "User G"
      },
      {
        "id": "8",
        "name": "Receipt 8",
        "quantity": 2,
        "duration": 999995484800,
        "difficulty": "Easy",
        "price": 11.99,
        "photo": "base64_encoded_photo_8",
        "createdAt": 999995484800,
        "createdBy": "User H"
      },
      {
        "id": "9",
        "name": "Receipt 9",
        "quantity": 3,
        "duration": 999995484800,
        "difficulty": "Hard",
        "price": 17.99,
        "photo": "base64_encoded_photo_9",
        "createdAt": 999995484800,
        "createdBy": "User I"
      },
      {
        "id": "10",
        "name": "Receipt 10",
        "quantity": 2,
        "duration": 999995484800,
        "difficulty": "Medium",
        "price": 14.49,
        "photo": "base64_encoded_photo_10",
        "createdAt": 999995484800,
        "createdBy": "User J"
      },
      {
        "id": "11",
        "name": "Receipt 11",
        "quantity": 1,
        "duration": 999995484800,
        "difficulty": "Easy",
        "price": 9.99,
        "photo": "base64_encoded_photo_11",
        "createdAt": 999995484800,
        "createdBy": "User K"
      },
      {
        "id": "12",
        "name": "Receipt 12",
        "quantity": 3,
        "duration": 999995484800,
        "difficulty": "Medium",
        "price": 15.49,
        "photo": "base64_encoded_photo_12",
        "createdAt": 999995484800,
        "createdBy": "User L"
      },
      {
        "id": "13",
        "name": "Receipt 13",
        "quantity": 1,
        "duration": 999995484800,
        "difficulty": "Hard",
        "price": 19.99,
        "photo": "base64_encoded_photo_13",
        "createdAt": 999995484800,
        "createdBy": "User M"
      },
      {
        "id": "14",
        "name": "Receipt 14",
        "quantity": 2,
        "duration": 999995484800,
        "difficulty": "Easy",
        "price": 10.99,
        "photo": "base64_encoded_photo_14",
        "createdAt": 999995484800,
        "createdBy": "User N"
      },
      {
        "id": "15",
        "name": "Receipt 15",
        "quantity": 4,
        "duration": 999995484800,
        "difficulty": "Medium",
        "price": 16.49,
        "photo": "base64_encoded_photo_15",
        "createdAt": 999995484800,
        "createdBy": "User O"
      },
      {
        "id": "16",
        "name": "Receipt 16",
        "quantity": 1,
        "duration": 999995484800,
        "difficulty": "Hard",
        "price": 21.99,
        "photo": "base64_encoded_photo_16",
        "createdAt": 999995484800,
        "createdBy": "User P"
      },
      {
        "id": "17",
        "name": "Receipt 17",
        "quantity": 3,
        "duration": 999995484800,
        "difficulty": "Easy",
        "price": 10.99,
        "photo": "base64_encoded_photo_17",
        "createdAt": 999995484800,
        "createdBy": "User Q"
      },
      {
        "id": "18",
        "name": "Receipt 18",
        "quantity": 2,
        "duration": 999995484800,
        "difficulty": "Medium",
        "price": 15.49,
        "photo": "base64_encoded_photo_18",
        "createdAt": 999995484800,
        "createdBy": "User R"
      },
      {
        "id": "19",
        "name": "Receipt 19",
        "quantity": 1,
        "duration": 999995484800,
        "difficulty": "Hard",
        "price": 20.99,
        "photo": "base64_encoded_photo_19",
        "createdAt": 999995484800,
        "createdBy": "User S"
      },
      {
        "id": "20",
        "name": "Receipt 20",
        "quantity": 4,
        "duration": 999995484800,
        "difficulty": "Medium",
        "price": 13.49,
        "photo": "base64_encoded_photo_20",
        "createdAt": 999995484800,
        "createdBy": "User T"
      },
      {
        "id": "21",
        "name": "Receipt 21",
        "quantity": 2,
        "duration": 999995484800,
        "difficulty": "Easy",
        "price": 11.99,
        "photo": "base64_encoded_photo_21",
        "createdAt": 999995484800,
        "createdBy": "User U"
      },
      {
        "id": "22",
        "name": "Receipt 22",
        "quantity": 3,
        "duration": 999995484800,
        "difficulty": "Hard",
        "price": 17.99,
        "photo": "base64_encoded_photo_22",
        "createdAt": 999995484800,
        "createdBy": "User V"
      },
    ]

    constructor(private http: HttpClient) { }

    getAll(): Observable<Receipt[]> {
        return of(this.mock)

        // return this.http.get<Receipt[]>(this.basic)
        //   .pipe(
        //     catchError((error) => {
        //         console.log(error);
        //         return of([]);
        //       },
        //     )
        //   );
    }

    getById(id: string): Observable<Receipt> {
      return of(this.mock.find(item => item.id === id)!);

    // return this.http.get<Receipt>(this.basic)
    //   .pipe(
    //     catchError((error) => {
    //         return of(null);
    //       },
    //     )
    //   );
  }

  savePhoto(file: File): Observable<unknown> {
    const formData = new FormData();
    formData.append('file', file);

    return of(null as unknown as Receipt);

    // return this.http.post(, formData)
  }

  save(value: Partial<Receipt>): Observable<Receipt> {
    return of(null as unknown as Receipt);
  }

  update(value: Receipt): Observable<Receipt> {
    return of(null as unknown as Receipt);
  }
}
