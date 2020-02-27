import { Injectable } from '@angular/core';

import { DropdownQuestion } from "../models/dropdown-question";
import { QuestionBase } from "../models/question-base";
import { TextboxQuestion } from "../models/textbox-question";

@Injectable()
export class QuestionService {

  getQuestions(){
    let questions: QuestionBase<any>[] = [
      new DropdownQuestion({
        key:'brave',
        label: 'Bravery Rating',
        options: [
          {key: 'solid', value:'Solid'},
          {key: 'great', value:'Great'},
          {key: 'good', value:'Good'},
          {key: 'unproven', value:'Unprovem'}
        ],
        order:3
      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      })
    ];

    return questions.sort((a,b) => a.order - b.order);
  }
  constructor() { }

}
