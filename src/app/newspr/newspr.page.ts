import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { Profil } from '../modules/profil';
import { first } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Url } from 'url';
import { Post } from '../modules/post';
import {DataService} from '../data.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-newspr',
  templateUrl: './newspr.page.html',
  styleUrls: ['./newspr.page.scss'],
})
export class NewsprPage implements OnInit {

  public profilee={} as Profil;
  public post:Observable<Post[]>;
  itemsRef: AngularFireList<any>;
  constructor( private db: AngularFireDatabase,public dataservice: DataService,
    public afAuth : AngularFireAuth, private service:DataService
    ,public router:Router) {}

  async ngOnInit() {
    this.itemsRef =  this.db.list('post/')
  this.post = this.itemsRef.valueChanges() ;
  this.profilee=await this.getdata();
   console.log(this.profilee.username)
  }
  
  async getdata(): Promise<any> {
    const pr = await this.db.object("profile/"+this.dataservice.getData())
      .valueChanges().pipe(first()).toPromise();
      console.log(pr);
    return pr;
  }
  async getPost(): Promise<any> {
    const pr = await this.db.object("post/")
      .valueChanges().pipe(first()).toPromise();
      console.log(pr);
    return pr;
  }
  NewsSinglePage(item) {
    this.service.post = item;
    this.router.navigate(['/sigle-newspr']);
  }
  
  

}
