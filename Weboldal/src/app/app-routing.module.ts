import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'main', 
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule) 
  },
  { 
    path: 'login', 
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) 
  },
  { 
    path: 'doctor', 
    loadChildren: () => import('./pages/doctor/doctor.module').then(m => m.DoctorModule) 
  },
  { 
    path: 'patient', 
    loadChildren: () => import('./pages/patient/patient.module').then(m => m.PatientModule) 
  },
  { 
    path: 'regist', 
    loadChildren: () => import('./pages/regist/regist.module').then(m => m.RegistModule) 
  },
  { 
    path: 'not-found', 
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) 
  },
  { 
    path: '',
    redirectTo: '/login',
    pathMatch: 'full' 
  },
  { 
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
