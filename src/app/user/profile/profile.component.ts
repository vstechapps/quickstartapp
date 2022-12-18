import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  editing: boolean = false;

  constructor(public firestore: FirestoreService, public toaster: ToastrService) {

  }

  ngOnInit(): void {
  }


  update() {
  }

}
