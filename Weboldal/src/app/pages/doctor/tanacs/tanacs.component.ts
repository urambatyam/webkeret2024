import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Dia } from 'src/app/shared/model/diagnosztika';
import { User } from 'src/app/shared/model/user';
import { DiagnosztikaService } from 'src/app/shared/services/diagnosztika.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-tanacs',
  templateUrl: './tanacs.component.html',
  styleUrl: './tanacs.component.sass'
})
export class TanacsComponent implements OnInit, OnChanges {
  
  @Input() id: string| null = null;
  bool:boolean = this.id!==null;
  veznev: string = '';
  kernev: string = '';
  uzenetek: Dia[] = [];
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log('uzenetek '+this.uzenetek)
    this.userek.getById(this.id as string).subscribe((user: User | undefined) => {
      if (user) {
        this.veznev = user.veznev;
        this.kernev = user.kernev;
      }
    });
    
    if (changes['id'] && changes['id'].currentValue) {
      this.bool = changes['id'].currentValue!==null;
    }
    if (this.id) {
      const userData = JSON.parse(localStorage.getItem('user') as string); 
      this.uzenetek = [];
      this.diaservice.getAllpast(this.id as string, userData.uid).subscribe(data => {
        if (data) {
          this.uzenetek = data as Dia[];
        }
        console.log(this.uzenetek)
      });
      
      
    } else {
      console.error('No user data found in localStorage');
    }
    

  }
  UzenetForm = this.createForm({
    id: '',
    fogado: '',
    kuldo: '',
    text: '',
    date: new Date()
  })
  createForm(model: Dia){
    let formGroup = this.fb.group(model);
    formGroup.get('text')?.addValidators([Validators.required,Validators.maxLength(200)]);
    return formGroup;
  }


  constructor(private fb: FormBuilder, private diaservice: DiagnosztikaService, private userek: UserService) {}
  ngOnInit(): void {
    this.uzenetek = [];
    if (this.id) {
      const userData = JSON.parse(localStorage.getItem('user') as string); 
      this.diaservice.getAllpast(this.id as string, userData.uid).subscribe(data => {
        if (data) {
          this.uzenetek = data as Dia[]; 
        }
      });
    } else {
      console.error('No user data found in localStorage');
    }
  }
  

  

  onAdd(): void {
    const userData = JSON.parse(localStorage.getItem('user') as string);
    const ujuzent: Dia = {
      id: '',
      fogado: this.id?this.id:'',
      kuldo: userData.uid,
      text: this.UzenetForm.get('text')?.value as string,
      date: new Date()
    };
    if (this.UzenetForm.valid) {
      this.diaservice.create(ujuzent);
    }
    this.UzenetForm.reset({ 
      id: '',
      fogado: '',
      kuldo: '',
      text: '',
      date: new Date()});
  }
}
