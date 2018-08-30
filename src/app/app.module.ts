import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { RoomComponent } from './room/room.component';
import { CreateChannelComponent } from './room/create-channel/create-channel.component';
import { DirectMessageComponent } from './room/direct-message/direct-message.component';
import { MessageComponent } from './room/message/message.component';
import { SidebarComponent } from './room/sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    RoomComponent,
    CreateChannelComponent,
    DirectMessageComponent,
    MessageComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
