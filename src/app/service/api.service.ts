import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { serviceBaseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  public getStockChartData(site_slug: any): Observable<any> {
    return this.httpClient.get(
      serviceBaseUrl + 'get-meter-list?site_name=' + site_slug,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  }

  test(data: any): Observable<any> {
    console.log(data);

    return this.httpClient.get(
      serviceBaseUrl +
        'get-alert-report?alert_analyse=' +
        data.alert_analyse +
        '&phase=' +
        data.phase +
        '&threshold=' +
        data.threshold +
        '&site_name=' +
        data.site_name +
        '&start_date=' +
        data.start_date +
        '&end_date=' +
        data.end_date,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  }

  test2(data: any): Observable<any> {
     console.log(data); 
    return this.httpClient.get(
      serviceBaseUrl +
        'get-deep-dive-report?alert_analyse=' +
        data.alert_analyse +
        '&phase=' +
        data.phase +
        '&threshold=' +
        data.threshold +
        '&site_name=' +
        data.site_name +
        '&start_date=' +
        data.start_date +
        '&end_date=' +
        data.end_date +
      '&alert_no=' + data.alert_no,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  }
}
