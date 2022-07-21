import {TestBed, ComponentFixture} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup} from "@angular/forms";
import {
  Question
} from "../typings/question.model";

let fixture: ComponentFixture<AppComponent>;
let component: AppComponent;

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('startupApplication_startSuccessful', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('parseQuestions_withValidInput_correctResult', () => {
    const fileContent = "?Which of these animals is a mammal\n" +
      "Ant\n" +
      "Bee\n" +
      "*Cat\n" +
      "?What is the sum of 2+3\n" +
      "2\n" +
      "*5\n" +
      "6\n";

    const questions = component.parseQuestions(fileContent);

    expect(questions.length).toBe(2);
    expect(questions[0].options.length).toBe(4); // 4 because of dont know option
  });


  it('isShowScoreButtonDisabled_notAllAnswersGiven_disabled', () => {
    const questionForm = new FormGroup({
        question1: new FormControl(), // No answers provided for this question
        question2: new FormControl(),
      }
    );
    component.questionForm = questionForm;
    const questions: Array<Question> = [
      {
        id: 1,
        options: [],
        value: "question text"
      },
      {
        id: 2,
        options: [],
        value: "question text"
      }
    ];
    component.questions = questions;

    const isDisabled = component.isShowScoreButtonDisabled();

    expect(isDisabled).toBe(true);
  })
});
