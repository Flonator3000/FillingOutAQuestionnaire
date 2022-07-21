import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Question} from "../../typings/question.model";
import {Option} from "../../typings/option.model";

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {

  @Input() questions!: Array<Question>;
  @Input() answers!: Array<Option>;

  correctAnswersCount!: number;
  totalQuestionsCount!: number;
  correctAnswersPercentage!: number;

  constructor() {
  }

  ngOnInit(): void {
    const correctAnsweredOptions = this.getCorrectAnsweredOptions();
    this.correctAnswersCount = correctAnsweredOptions.length;
    this.totalQuestionsCount = this.questions.length;
    this.correctAnswersPercentage = this.getCorrectAnswerPercentage();
  }

  startNewQuestionnaire() {
    location.reload();
  }

  getCorrectAnsweredOptions(): Array<Option> {
    return this.answers.filter(answer => answer.correct);
  }

  questionAnsweredCorrectly(questionId: number) {
    const option = this.answers.find(answer => answer.questionId === questionId);
    return option!.correct;
  }

  getAnswerCorrectText(questionId: number) {
    const option = this.answers.find(answer => answer.questionId === questionId)!;
    return `Your answer '${option.value}' is correct`;
  }

  getAnswerNotCorrectText(questionId: number) {
    const option = this.answers.find(answer => answer.questionId === questionId)!;
    return `Your answer '${option.value}' is wrong`;

  }

  getCorrectAnswerText(questionId: number) {
    const question = this.questions.find(question => question.id === questionId)!;
    const correctOption = question.options.find(option => option.correct)!;
    return `Correct answer: '${correctOption.value}'`
  }

  getCorrectAnswerPercentage(): number {
    return Math.floor((this.getCorrectAnsweredOptions().length / this.questions.length) * 100);
  }

}
