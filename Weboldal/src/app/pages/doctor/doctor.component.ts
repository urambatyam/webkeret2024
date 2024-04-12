import { Component, EventEmitter, Output } from '@angular/core';
import { Blood } from 'src/app/shared/model/blood';
import { BloodService } from 'src/app/shared/services/blood.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.sass'
})
export class DoctorComponent {
 meresek: Blood[] = [];
  
  selectedId: string | null = null;
  constructor(private bl: BloodService){}
  
  onIdChanged(id: string) {
    this.selectedId=id;
    this.bl.getAll(id).subscribe((data: Blood[]) => {
    
      this.meresek = data;
    });
  }
}
