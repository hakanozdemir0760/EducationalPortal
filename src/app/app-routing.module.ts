import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/auth-guard'
import { PanelComponent } from './components/panel/panel.component';
import { QuestionListComponent } from './components/questionComponents/question-list/question-list.component';
import { LessonListComponent } from './components/lessonComponents/lesson-list/lesson-list.component';
import { LessonTopicListComponent } from './components/lessonTopicComponents/lesson-topic-list/lesson-topic-list.component';
import { ForwardedReplieListComponent } from './components/forwardedReplieComponents/forwarded-replie-list/forwarded-replie-list.component';
import { LessonDetailComponent } from './components/lessonComponents/lesson-detail/lesson-detail.component';
import { LessonAddComponent } from './components/lessonComponents/lesson-add/lesson-add.component';
import { LessonTopicAddComponent } from './components/lessonTopicComponents/lesson-topic-add/lesson-topic-add.component';


const redirectToLogin = () => redirectUnauthorizedTo(["account/login"]);
const redirectToPanel = () => redirectLoggedInTo(["panel"])

const routes: Routes = [
  
  {path:'',component:HomeComponent},

  {path:'account',...canActivate(redirectToPanel),children:[
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent}
  ]},

  {path:'panel',...canActivate(redirectToLogin),children:[
    {path:'',component:PanelComponent}
  ]},

  {path:'questions',...canActivate(redirectToLogin),component:QuestionListComponent},
  {path:'lessons',...canActivate(redirectToLogin),component:LessonListComponent},
  {path:'lesson-topics',...canActivate(redirectToLogin),component:LessonTopicListComponent},
  {path:'forwarded-replies',...canActivate(redirectToLogin),component:ForwardedReplieListComponent},

  {path:'lesson/detail/:lessonid',...canActivate(redirectToLogin),component:LessonDetailComponent},
  {path:'lesson/add',...canActivate(redirectToLogin),component:LessonAddComponent},

  {path:'lesson-topic/add',...canActivate(redirectToLogin),component:LessonTopicAddComponent},

  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
