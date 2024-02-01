import { Injectable } from '@angular/core';
import { Message } from '@app-shared/models/system/message.model';
import { MessageDefinitionService } from './message-definition.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  constructor(private messageDefinitionService: MessageDefinitionService) {  }

  public combineMessage(message: Message): string {
    const definition = this.messageDefinitionService.getMessageDefinition(message.errorCode);

    if (definition) {

      if (message.params) {
        for (var i in message.params) {
          definition.definition = definition.definition.replace(`{${i}}`, message.params[i]);
        }
      }

      return definition.definition;
    }

    return "";
  }
}
