import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";
import {
  Question
} from "../typings/question.model";
import {Option} from "../typings/option.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  questionForm = new FormGroup({
      question1: new FormControl(),
      question2: new FormControl(),
    }
  );

  questions: Array<Question> = [];
  questionnaireFinished: boolean = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getQuestionsFromFile('assets/input.txt');
  }

  getAnswers(): Array<Option> {
    return Object.keys(this.questionForm.controls).map(key => {
      return this.questionForm.get(key)!.value;
    });
  }

  isShowScoreButtonDisabled(): boolean {
    const answers: Array<Option> = this.getAnswers().filter(answer => answer !== null);
    return answers.length !== this.questions.length;
  }

  getQuestionsFromFile(filePath: string) {
    this.http.get(filePath, {responseType: 'text'}).subscribe(fileContent => {
      this.questions = this.parseQuestions(fileContent);
    });
  }

  parseQuestions(fileContent: string): Array<Question> {
    let lines = fileContent.split("\n")
    lines = lines.filter(s => s !== "");

    let currentQuestion: Question | null = null;
    let questions: Array<Question> = [];
    let questionCounter = 0;
    let optionCounter = 0;
    lines.forEach(line => {
      if (line.startsWith("?")) {
        questionCounter++;
        if (currentQuestion !== null) {
          optionCounter++;
          const dontKnowOption: Option = {
            id: optionCounter,
            value: 'Dont know',
            questionId: questionCounter - 1,
            correct: false,
          }
          currentQuestion.options.push(dontKnowOption);
          questions.push(currentQuestion);
          optionCounter = 0;
        }
        currentQuestion = {
          value: line.replace('?', ''),
          options: [],
          id: questionCounter,
        }
      } else {
        optionCounter++;
        const option: Option = {
          value: line.replace('*', ''),
          id: optionCounter,
          correct: line.startsWith("*"),
          questionId: questionCounter,
        }
        currentQuestion!.options.push(option);
      }
    });
    const dontKnowOption: Option = {
      id: optionCounter,
      value: 'Dont know',
      questionId: questionCounter,
      correct: false,
    };
    currentQuestion!.options.push(dontKnowOption);
    questions.push(currentQuestion!);
    return questions;
  }

}
