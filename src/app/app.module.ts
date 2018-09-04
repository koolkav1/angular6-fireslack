import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
//firebase
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireModule } from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
//notfier
import { NotifierModule } from 'angular-notifier';

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
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { ChannelService } from './services/channel.service';
import { MessageService } from './services/message.service';
import { ChannelsComponent } from './room/sidebar/channels/channels.component';


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
    SidebarComponent,
    ChannelsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'middle'
        },
        vertical: {
          position: 'top'
        }
      },
      theme: 'material'
    })
  ],
  providers: [AuthService, UserService, ChannelService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
