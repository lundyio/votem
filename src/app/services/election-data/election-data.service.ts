import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import {Router} from '@angular/router';

@Injectable()
export class ElectionDataService {

  election: any;
  env: any = environment;
  urlBase: any = this.env.apiUrl;

  constructor(private http: Http, private router: Router) { }

  getElection(id) {

    let promise = new Promise((resolve, reject) => {

      this.http.get(this.urlBase + '/get/election/' + id)
        .toPromise()
        .then(
            res => { // Success
              this.election = res.json();
              resolve();
            },
            msg => { // Error
              this.router.navigate(['/404']);
              reject(msg);
            }
        );

    });
    return promise;
  }

}
