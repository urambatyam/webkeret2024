import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'; 
import { BloodService } from 'src/app/shared/services/blood.service';
import { CsoPipe } from 'src/app/shared/pipes/cso.pipe';

@Component({
  selector: 'app-statisztika',
  templateUrl: './statisztika.component.html',
  styleUrls: ['./statisztika.component.sass']
})
export class StatisztikaComponent implements OnInit {
  bloods = JSON.parse(localStorage.getItem('user') as string);
  preSziszoltes: number[] = [];
  preDiszoltes: number[] = [];
  preDatumlabels: string[] = [];
  tisztit(tomb: number[],tomb2: number[], datums: string[]){
    let prer = new Map();
    let prer2 = new Map();
    function osszeadas(tomb: number[]): number {
      let osszeg: number = 0;
      for (let elem of tomb) {
          osszeg += elem;
      }
      return osszeg;
    }
    for (let i = 0; i < this.preDatumlabels.length; i++) {
      if(prer.has(datums[i])){
        prer.get(datums[i])?.push(tomb[i])
        prer2.get(datums[i])?.push(tomb2[i])
      } else{
        prer2.set(datums[i],[tomb2[i]]);
        prer.set(datums[i],[tomb[i]]);
      }
    }
    let d:string[] = [...prer.keys()];
    for (let i = 0; i < d.length; i++){
      if(prer.get(d[i])?.length as number > 1){
        let r = osszeadas(prer.get(d[i]) as number[]);
        r = r/prer.get(d[i]).length;
        prer.set(d[i],r);
        let r2 = osszeadas(prer2.get(d[i]) as number[]);
        r2 = r2/prer2.get(d[i]).length;
        prer2.set(d[i],r2);
      }else{
        prer.set(d[i],prer.get(d[i])[0]);
        prer2.set(d[i],prer2.get(d[i])[0]);
      }
    }
    let dis:number[] = [...prer2.values()];
    let s:number[] = [...prer.values()];
    return {d,s,dis};}
  Datumlabels: string[] = [];
  Sziszoltes: number[] = [];
  Diszoltes: number[] = [];
  SzoptimalMin: number = 90;
  SzoptimalMax: number = 120;
  DoptimalMin: number = 60;
  DoptimalMax: number = 80;
  config1: any; 
  config2: any;
  constructor(private bl: BloodService, private cso: CsoPipe) {}
  userData = JSON.parse(localStorage.getItem('user') as string);
  ngOnInit() {
    const userId = this.userData.uid;
    this.bl.getAll(userId).subscribe(data => {
      data.forEach(item => {
        this.preSziszoltes.push(item.szisztoles);
        this.preDiszoltes.push(item.disztoles);
        this.preDatumlabels.push(this.cso.transform(item.date));
      });
      let tomb = this.tisztit(this.preSziszoltes,this.preDiszoltes,this.preDatumlabels);
      this.Datumlabels = tomb.d;
      this.Sziszoltes = tomb.s;
      this.Diszoltes = tomb.dis;
      this.createChart();
    });
  }
  createChart() {
    this.config1 = {
      type: 'line',
      data: {
        labels: this.Datumlabels,
        datasets: [{
          label: "Szisztoles vérnyomás változása",
          data: this.Sziszoltes,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: "Optimális alsó határa",
          data: Array(this.Datumlabels.length).fill(this.SzoptimalMin), 
          fill: '-1', 
          borderColor: 'rgba(115, 48, 213, 0.8)', 
          borderWidth: 1,
          borderDash: [5, 5] 
        },
        {
          label: "Optimális felső határa",
          data: Array(this.Datumlabels.length).fill(this.SzoptimalMax), 
          fill: false, 
          borderColor: 'rgba(212, 16, 30, 0.8)', 
          borderWidth: 1,
          borderDash: [5, 5]
        }]
      },
      options: {
        scales: {
          y: {
            suggestedMin: Math.min(...this.Sziszoltes)-10<this.SzoptimalMin?Math.min(...this.Sziszoltes)-10:this.SzoptimalMin-10,
            suggestedMax: Math.max(...this.Sziszoltes)+10>this.SzoptimalMax?Math.max(...this.Sziszoltes)+10:this.SzoptimalMin+10,
          }}}};
    this.config2 = {
      type: 'line',
      data: {
        labels: this.Datumlabels,
        datasets: [{
          label: "Disztoles vérnyomás változása",
          data: this.Diszoltes,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: "Optimális felső határa",
          data: Array(this.Datumlabels.length).fill(this.DoptimalMin), 
          fill: '-1', 
          borderColor: 'rgba(115, 48, 213, 0.8)', 
          borderWidth: 1,
          borderDash: [5, 5] 
        },
        {
          label: "optimum alsó határa",
          data: Array(this.Datumlabels.length).fill(this.DoptimalMax), 
          fill: false, 
          borderColor: 'rgba(212, 16, 30, 0.8)', 
          borderWidth: 1,
          borderDash: [5, 5]
        }]
      },
      options: {
        scales: {
          y: {
            suggestedMin: Math.min(...this.Diszoltes)-10<this.DoptimalMin ? Math.min(...this.Diszoltes)-10:this.DoptimalMin-10,
            suggestedMax: Math.max(...this.Diszoltes)+10>this.DoptimalMax ? Math.max(...this.Diszoltes)+10:this.DoptimalMax+10,
          }}}};
    Chart.register(...registerables);
    const canvas1 = document.getElementById('SziszolesDiagram') as HTMLCanvasElement;
    if (canvas1) {
      const ctx = canvas1.getContext('2d');
      if (ctx) {
        new Chart(ctx, this.config1);
      }
    }else{
      console.error("Nem sikerült létre hozni a diagramot")
    }
    const canvas2 = document.getElementById('DisztolesDiagram') as HTMLCanvasElement;
    if (canvas2) {
      const ctx = canvas2.getContext('2d');
      if (ctx) {
        new Chart(ctx, this.config2);
      }
    }else{
      console.error("Nem sikerült létre hozni a diagramot")
    }
  }
}