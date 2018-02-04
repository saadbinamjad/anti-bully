import { Component, OnInit } from '@angular/core';
import { ChatbotService, Message } from './chatbot.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  public messages: any;
  formValue: string;

  constructor(public chat: ChatbotService) {}

  ngOnInit() {
    this.messages = this.chat.conversation
      .asObservable()
      .scan((acc, val) => acc.concat(val));
  }
  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
  }
}
