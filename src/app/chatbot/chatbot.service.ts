import { Injectable } from '@angular/core';
import { ApiAiClient } from 'api-ai-javascript';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class Message {
  constructor(public content: string, public sentBy: string) {}
}

@Injectable()
export class ChatbotService {
  readonly token = environment.dialogflow.antibully;
  readonly client = new ApiAiClient({ accessToken: this.token });

  conversation = new BehaviorSubject<Message[]>([]);

  constructor() {}
  converse(msg: string) {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);
    return this.client.textRequest(msg).then(res => {
      const speech = res.result['fulfillment'].speech;
      const botMessage = new Message(speech, 'bot');
      this.update(botMessage);
    });
  }

  update(msg: Message) {
    this.conversation.next([msg]);
  }
}
