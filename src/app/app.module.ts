import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AuthGuard } from './services/auth-guard/auth-guard.service';
import { AuthService } from './services/auth/auth.service';

//Date Range Component
import { MyDateRangePickerModule } from 'mydaterangepicker';

import { AppComponent } from './app.component';
import { VoteComponent } from './components/vote/vote.component';
import { LandingComponent } from './components/landing/landing.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewElectionComponent } from './components/new-election/new-election.component';
import { ElectionDetailsComponent } from './components/election-details/election-details.component';
import { NewBallotComponent } from './components/new-ballot/new-ballot.component';
import { BallotComponent } from './components/ballot/ballot.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { BackComponent } from './components/back/back.component';
import { ChartsModule } from 'ng2-charts';
import { GraphBarComponent } from './components/graph-bar/graph-bar.component';
import { GraphLineComponent } from './components/graph-line/graph-line.component';


const appRoutes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'vote/:id', component: VoteComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
    children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'election/details/:id', component: ElectionDetailsComponent },
    { path: 'election/new', component: NewElectionComponent },
    { path: 'ballot/:id', component: NewBallotComponent }
  ]},
  { path: 'admin/login', component: LoginComponent },
  { path: 'thank-you', component: ThankYouComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '',   redirectTo: 'landing', pathMatch: 'full' },
  { path: 'login',   redirectTo: 'admin/login', pathMatch: 'full' },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    VoteComponent,
    LandingComponent,
    PageNotFoundComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    NewElectionComponent,
    ElectionDetailsComponent,
    NewBallotComponent,
    BallotComponent,
    ThankYouComponent,
    BackComponent,
    GraphBarComponent,
    GraphLineComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    MyDateRangePickerModule,
    ChartsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
