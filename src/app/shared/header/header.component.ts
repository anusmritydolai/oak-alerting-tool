import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-header',
  host: { class: 'background-theme' },
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  logout() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '360px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.router.navigate(['/user/login']);
    });  
  }
}
