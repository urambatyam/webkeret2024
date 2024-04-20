import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Dia } from 'src/app/shared/model/diagnosztika';
import { DiagnosztikaService } from 'src/app/shared/services/diagnosztika.service';

@Component({
  selector: 'app-uzenet',
  templateUrl: './uzenet.component.html',
  styleUrl: './uzenet.component.sass'
})
export class UzenetComponent {
  displayedColumns: string[] = ['text', 'date'];
  uzenetek: Dia[] = [];
  constructor(private fb: FormBuilder, private diaservice: DiagnosztikaService) { console.log(!this.uzenetek.length)}
  ngOnInit(): void {
    this.uzenetek = [];
    const userData = JSON.parse(localStorage.getItem('user') as string); 
    if (userData) {
      const userData = JSON.parse(localStorage.getItem('user') as string); 
      this.diaservice.getById(userData.uid).subscribe(data => {
        if (data) {
          this.uzenetek = data as Dia[]; 
        }
      });
    } 
  }
  
}
