import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Menu } from '../models';

@Injectable()
export class MenuService {
    // TODO: Change url after BE ready
    // private basic = 'http://localhost:8080/menu';

    private readonly mock: Menu[] = [
      {
        "id": "1",
        "name": "Menu 1",
        "receipts": [],
        "createdAt": 1635484800,
        "createdBy": "User A"
      },
      {
        "id": "2",
        "name": "Menu 2",
        "receipts": [],
        "createdAt": 1635484800,
        "createdBy": "User B"
      },
      {
        "id": "3",
        "name": "Menu 3",
        "receipts": [],
        "createdAt": 1635484800,
        "createdBy": "User C"
      },
      {
        "id": "4",
        "name": "Menu 4",
        "receipts": [
          {
            "id": "2",
            "name": "Receipt 2",
            "quantity": 4,
            "duration": 1635484800,
            "difficulty": "Medium",
            ingredients: [],
            "price": 15.49,
            "photo": "base64_encoded_photo_2",
            "createdAt": 1635484800,
            "createdBy": "User B"
          },
          {
            "id": "3",
            "name": "Receipt 3",
            "quantity": 1,
            "duration": 1635484800,
            "difficulty": "Hard",
            ingredients: [],
            "price": 20.99,
            "photo": "base64_encoded_photo_3",
            "createdAt": 1635484800,
            "createdBy": "User C"
          },
        ],
        "createdAt": 1635484800,
        "createdBy": "User D"
      },
      {
        "id": "5",
        "name": "Menu 5",
        "receipts": [],
        "createdAt": 1635484800,
        "createdBy": "User E"
      },
      {
        "id": "6",
        "name": "Menu 6",
        "receipts": [],
        "createdAt": 1635484800,
        "createdBy": "User F"
      },
      {
        "id": "7",
        "name": "Menu 7",
        "receipts": [],
        "createdAt": 1635484800,
        "createdBy": "User G"
      },
      {
        "id": "8",
        "name": "Menu 8",
        "receipts": [
          {
            "id": "1",
            "name": "Receipt 1",
            "quantity": 2,
            "duration": 1635484800,
            "difficulty": "Easy",
            ingredients: [],
            "price": 10.99,
            "photo": "base64_encoded_photo_1",
            "createdAt": 1635484800,
            "createdBy": "User A"
          },
        ],
        "createdAt": 1635484800,
        "createdBy": "User H"
      },
      {
        "id": "9",
        "name": "Menu 9",
        "receipts": [],
        "createdAt": 1635484800,
        "createdBy": "User I"
      },
      {
        "id": "10",
        "name": "Menu 10",
        "receipts": [],
        "createdAt": 1635484800,
        "createdBy": "User J"
      },
      {
        "id": "11",
        "name": "Menu 11",
        "receipts": [],
        "createdAt": 1635484800,
        "createdBy": "User K"
      },
      {
        "id": "12",
        "name": "Menu 12",
        "receipts": [],
        "createdAt": 1635484800,
        "createdBy": "User L"
      },
      {
        "id": "13",
        "name": "Menu 13",
        "receipts": [],
        "createdAt": 1635484800,
        "createdBy": "User M"
      },
      {
        "id": "14",
        "name": "Menu 14",
        "receipts": [],
        "createdAt": 1635484800,
        "createdBy": "User N"
      },
      {
        "id": "15",
        "name": "Menu 15",
        "receipts": [],
        "createdAt": 1635484800,
        "createdBy": "User O"
      },
      {
        "id": "16",
        "name": "Menu 16",
        "receipts": [],
        "createdAt": 1635484800,
        "createdBy": "User P"
      },
      {
        "id": "17",
        "name": "Menu 17",
        "receipts": [],
        "createdAt": 1635484800,
        "createdBy": "User Q"
      },
      {
        "id": "18",
        "name": "Menu 18",
        "receipts": [],
        "createdAt": 1635484800,
        "createdBy": "User R"
      },
      {
        "id": "19",
        "name": "Menu 19",
        "receipts": [],
        "createdAt": 1635484800,
        "createdBy": "User S"
      },
      {
        "id": "20",
        "name": "Menu 20",
        "receipts": [],
        "createdAt": 1635484800,
        "createdBy": "User T"
      },
      {
        "id": "21",
        "name": "Menu 21",
        "receipts": [],
        "createdAt": 1635484800,
        "createdBy": "User U"
      },
      {
        "id": "22",
        "name": "Menu 22",
        "receipts": [],
        "createdAt": 1635484800,
        "createdBy": "User V"
      },
      {
        "id": "23",
        "name": "Menu 23",
        "receipts": [
          {
            "id": "1",
            "name": "Receipt 1",
            "quantity": 2,
            "duration": 1635484800,
            "difficulty": "Easy",
            ingredients: [],
            "price": 10.99,
            "photo": "base64_encoded_photo_1",
            "createdAt": 1635484800,
            "createdBy": "User A"
          },
          {
            "id": "2",
            "name": "Receipt 2",
            "quantity": 4,
            "duration": 1635484800,
            "difficulty": "Medium",
            ingredients: [],
            "price": 15.49,
            "photo": "base64_encoded_photo_2",
            "createdAt": 1635484800,
            "createdBy": "User B"
          },
          {
            "id": "3",
            "name": "Receipt 3",
            "quantity": 1,
            "duration": 1635484800,
            "difficulty": "Hard",
            ingredients: [],
            "price": 20.99,
            "photo": "base64_encoded_photo_3",
            "createdAt": 1635484800,
            "createdBy": "User C"
          },
        ],
        "createdAt": 1635484800,
        "createdBy": "User W"
      },
      {
        "id": "24",
        "name": "Menu 24",
        "receipts": [],
        "createdAt": 1635484800,
        "createdBy": "User X"
      },
      {
        "id": "25",
        "name": "Menu 25",
        "receipts": [],
        "createdAt": 1635484800,
        "createdBy": "User Y"
      },
      {
        "id": "26",
        "name": "Menu 26",
        "receipts": [],
        "createdAt": 1635484800,
        "createdBy": "User Z"
      },
      {
        "id": "27",
        "name": "Menu 27",
        "receipts": [],
        "createdAt": 1635484800,
        "createdBy": "User AA"
      },
      {
        "id": "28",
        "name": "Menu 28",
        "receipts": [],
        "createdAt": 1635484800,
        "createdBy": "User BB"
      },
      {
        "id": "29",
        "name": "Menu 29",
        "receipts": [],
        "createdAt": 1635484800,
        "createdBy": "User CC"
      },
      {
        "id": "30",
        "name": "Menu 30",
        "receipts": [],
        "createdAt": 1635484800,
        "createdBy": "User DD"
      }
    ];

    constructor(private http: HttpClient) { }

    getAll(): Observable<Menu[]> {
        return of(this.mock)

        // return this.http.get<Menu[]>(this.basic)
        //   .pipe(
        //     catchError((error) => {
        //         console.log(error);
        //         return of([]);
        //       },
        //     )
        //   );
    }

  getById(id: string): Observable<Menu> {
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

    return of(null as unknown as Menu);

    // return this.http.post(, formData)
  }

  save(value: Partial<Menu>): Observable<Menu> {
    return of(null as unknown as Menu);
  }

  update(value: Menu): Observable<Menu> {
    return of(null as unknown as Menu);
  }
}
