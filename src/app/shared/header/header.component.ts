import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  host: { class: 'background-theme' },
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  [x: string]: any;

  constructor() { }

  ngOnInit(): void {
  }
  logout() {    
    // this.authService.logout().subscribe((result) => {
    //   if (result.success) {
    //     localStorage.clear();
        this.router.navigate(['/login']);
    //   }
    // });
  }
}
