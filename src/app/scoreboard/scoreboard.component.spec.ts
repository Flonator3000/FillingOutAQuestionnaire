import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ScoreboardComponent} from './scoreboard.component';
import {Option} from "../../typings/option.model";
import {Question} from "../../typings/question.model";

describe('ScoreboardComponent', () => {
  let component: ScoreboardComponent;
  let fixture: ComponentFixture<ScoreboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScoreboardComponent],
      imports: [
        HttpClientTestingModule,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreboardComponent);
    component = fixture.componentInstance;

    // Set dummy data...
    const option: Option = {
      id: 1,
      questionId: 1,
      correct: true,
      value: "answer text",
    };
    const answers: Array<Option> = [option];
    component.answers = answers;
    const questions: Array<Question> = [
      {
        id: 1,
        value: 'question value',
        options: [
          option
        ],
      }
    ];
    component.questions = questions;
    fixture.detectChanges();
  });

  it('getAnswerCorrectText_validQuestionId_correctResult', () => {
    // Arrange happens already in beforeEach.

    const text = component.getAnswerCorrectText(1);

    expect(text).toBe("Your answer 'answer text' is correct");
  });

});
