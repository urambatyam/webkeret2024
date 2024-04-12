import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'; // Chart.js modul importálása

@Component({
  selector: 'app-statisztika',
  templateUrl: './statisztika.component.html',
  styleUrls: ['./statisztika.component.sass']
})
export class StatisztikaComponent implements OnInit {
  // Adatok definiálása
  bloods = JSON.parse(localStorage.getItem('user') as string);

  preDatumlabels: string[] = ["2023-11-11", "2023-11-12", "2023-11-13","2023-11-14","2023-11-15","2023-11-15","2023-11-15","2023-11-15"];
  preSziszoltes: number[] = [120, 103, 134, 155, 142,105,150,120];
  preDiszoltes: number[] = [80, 55, 78, 90, 73,67,78,82];
  //Datumlabels: string[] = ["2023-11-11", "2023-11-12", "2023-11-13","2023-11-14","2023-11-15","2023-11-15","2023-11-15","2023-11-15"];
  //Sziszoltes: number[] = [120, 103, 134, 155, 142,105,150,120];
  //Diszoltes: number[] = [80, 55, 78, 90, 73,67,78,82];
  tisztit(tomb: number[],tomb2: number[], datums: string[]){
    let r = new Map<string,number[]>();
    let r2 = new Map();
    //let temp = new Map();

    for (let i = 0; i < this.preDatumlabels.length; i++) {
      if(r.has(datums[i])){
        r.get(datums[i])?.push(tomb[i])
      } else{
        r.set(datums[i],[tomb[i]])
      }
    }





    /*for (let i = 0; i < this.preDatumlabels.length; i++) {
      if(r.has(datums[i])){
        r.set(datums[i], (r.get(datums[i])+tomb[i])/2)

      }else{
        r.set(datums[i],tomb[i])
      }
    }*/
    for (let i = 0; i < this.preDatumlabels.length; i++) {
      if(r2.has(datums[i])){
        r2.set(datums[i], (r2.get(datums[i])+tomb2[i])/2)

      }else{
        r2.set(datums[i],tomb2[i])
      }
    }
    let d:string[] = [...r.keys()];
    
    r.forEach(i => {
      if(i.length > 0){
        
      }
    });
    let dis:number[] = [...r2.values()];
    return {d,s,dis};
  }
  tomb = this.tisztit(this.preSziszoltes,this.preDiszoltes,this.preDatumlabels);

  Datumlabels: string[] = this.tomb.d;
  Sziszoltes: number[] = this.tomb.s;
  Diszoltes: number[] = this.tomb.dis;
  //let tomb = this.tisztit(this.preSziszoltes,this.preDiszoltes,this.preDatumlabels);


  // Optimális tartomány értékei
  SzoptimalMin: number = 90;
  SzoptimalMax: number = 120;
  DoptimalMin: number = 60;
  DoptimalMax: number = 80;

  // Chart.js konfiguráció
  config1: any; // Most nem használjuk a ChartConfiguration típust, mivel nem használjuk az ng2-charts modult
  config2: any;

  constructor() { }

  ngOnInit() {
    this.createChart();
    
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
          data: Array(this.Datumlabels.length).fill(this.SzoptimalMin), // Az optimális tartomány alsó határa minden pontra az optimalMin érték lesz
          fill: '-1', // Töltés az alatta lévő területre
          borderColor: 'rgba(115, 48, 213, 0.8)', // Szín
          borderWidth: 1,
          borderDash: [5, 5] // Pontozott vonal
        },
        {
          label: "Optimális felső határa",
          data: Array(this.Datumlabels.length).fill(this.SzoptimalMax), // Az optimális tartomány felső határa minden pontra az optimalMax érték lesz
          fill: false, // Nincs töltés
          borderColor: 'rgba(212, 16, 30, 0.8)', // Szín
          borderWidth: 1,
          borderDash: [5, 5] // Pontozott vonal
        }]
      },
      options: {
        scales: {
          y: {
            suggestedMin: Math.min(...this.Sziszoltes)-10<this.SzoptimalMin?Math.min(...this.Sziszoltes)-10:this.SzoptimalMin-10,
            suggestedMax: Math.max(...this.Sziszoltes)+10>this.SzoptimalMax?Math.max(...this.Sziszoltes)+10:this.SzoptimalMin+10,
          }
        }
      }

    };

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
          data: Array(this.Datumlabels.length).fill(this.DoptimalMin), // Az optimális tartomány alsó határa minden pontra az optimalMin érték lesz
          fill: '-1', // Töltés az alatta lévő területre
          borderColor: 'rgba(115, 48, 213, 0.8)', // Szín
          borderWidth: 1,
          borderDash: [5, 5] // Pontozott vonal
        },
        {
          label: "optimum alsó határa",
          data: Array(this.Datumlabels.length).fill(this.DoptimalMax), // Az optimális tartomány felső határa minden pontra az optimalMax érték lesz
          fill: false, // Nincs töltés
          borderColor: 'rgba(212, 16, 30, 0.8)', // Szín
          borderWidth: 1,
          borderDash: [5, 5] // Pontozott vonal
        }]
      },
      options: {
        scales: {
          y: {
            suggestedMin: Math.min(...this.Diszoltes)-10<this.DoptimalMin ? Math.min(...this.Diszoltes)-10:this.DoptimalMin-10,
            suggestedMax: Math.max(...this.Diszoltes)+10>this.DoptimalMax ? Math.max(...this.Diszoltes)+10:this.DoptimalMax+10,
          }
        }
      }
      
    };

    // Regisztráljuk a szükséges Chart.js kiegészítőket
    Chart.register(...registerables);

    // Chart létrehozása a canvas elemen
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
