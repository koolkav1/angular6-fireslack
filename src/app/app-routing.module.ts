import {Routes, RouterModule} from '@angular/router'
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RoomComponent } from './room/room.component';
import { MessageComponent } from './room/message/message.component';
import { CreateChannelComponent } from './room/create-channel/create-channel.component';
import { DirectMessageComponent } from './room/direct-message/direct-message.component';
import { NgModule } from '@angular/core';
export const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    { path: 'editProfile', component: ProfileComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'chatroom/channels', component: RoomComponent, children: [
        { path: 'message/:cid', component: MessageComponent, outlet: 'auxoutlet'},
        { path: 'create', component: CreateChannelComponent, outlet: 'auxoutlet'},
        { path: 'direct/:user1/:user2', component: DirectMessageComponent, outlet: 'auxoutlet'}
    ]}
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {
  }