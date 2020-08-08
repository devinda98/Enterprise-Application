import {Injectable} from '@angular/core';
import { HttpClient,HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class GadgetTracerLogService {
  constructor(protected httpClient: HttpClient) {

  }
  getUserDetails(requestObj?: any): Observable<any> {
    let params = new HttpParams();
    params = requestObj.first ? params.append('first', requestObj.first) : params;
    params = requestObj.maxResults ? params.append('maxResults', requestObj.maxResults) : params;
    params = requestObj.name ? params.append('name', requestObj.name) : params;
    return this.httpClient.get<any>('/dms-training-service/V1/display/getUserDetails', { params: params });
    
    }
    getFilteredUserList(requestObj?: any): Observable<any> {
      let params = new HttpParams();
      
      params = requestObj.first ? params.append('first', requestObj.first) : params;
      params = requestObj.maxResults ? params.append('maxResults', requestObj.maxResults) : params;
      params = requestObj.dateTo ? params.append('dateTo', requestObj.dateTo) : params;
      params = requestObj.dateFrom ? params.append('dateFrom', requestObj.dateFrom) : params;
      params = requestObj.firstName ? params.append('firstName', requestObj.firstName) : params;
      params = requestObj.lastName ? params.append('lastName', requestObj.lastName) : params;
      params = requestObj.gender ? params.append('gender', requestObj.gender) : params;
      params = requestObj.district ? params.append('district', requestObj.district) : params;
  
      return this.httpClient.get<any>('/dms-training-service/V1/display/getFilteredUserList', { params: params });
    }
  

 getDistricts(): Observable<any> {
  return this.httpClient.get<any>('/dms-training-service/V1/district/getDistricts');
  }

  createUser(entity: any): Observable<any> {
   return this.httpClient.put<any>(`/dms-training-service/V1/display/createUser?${entity}`, entity);
  }
  getUserById(id: String): Observable<any> {
    return this.httpClient.get<any>(`/dms-training-service/V1/display/userById/${id}`);
  }
  deleteUser(id: String): Observable<void> {
    return this.httpClient.delete<void>(`/dms-training-service/V1/display/deleteUserById/${id}`);
  }


  }
 
  