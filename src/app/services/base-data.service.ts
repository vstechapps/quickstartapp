import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BaseDataService {

    state_city_map: any;
    industries: any;

    constructor(public http: HttpClient) {
    }

    getStateCityMap(): Promise<any> {
        if (this.state_city_map != null) return Promise.resolve(this.state_city_map);
        else return this.http.get("/assets/collections/state-city.json").pipe(tap(res => this.state_city_map = res)).toPromise();
    }

    getIndustries(): Promise<any> {
        if (this.industries != null) return Promise.resolve(this.industries);
        else return this.http.get("/assets/collections/industries.json").pipe(tap(res => this.industries = res)).toPromise();
    }


}
