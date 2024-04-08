import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'; // Chart.js modul importálása

@Component({
  selector: 'app-statisztika',
  templateUrl: './statisztika.component.html',
  styleUrls: ['./statisztika.component.sass']
})
export class StatisztikaComponent implements OnInit {
  // Adatok definiálása
  Datumlabels: string[] = ["2023-11-11", "2023-11-12", "2023-11-13","2023-11-14","2023-11-15"];
  Sziszoltes: number[] = [120, 103, 134, 155, 142];
  Diszoltes: number[] = [80, 55, 78, 90, 73];

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
            suggestedMin: 80,
            suggestedMax: 200
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
            suggestedMin: 40,
            suggestedMax: 100
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
