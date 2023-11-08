import { ArticleSummary } from '../models/article-summary';

export default class ArticleList {
  public getSummaries(): Array<ArticleSummary> {
    return [
      {
        id: 'venn-of-angular-component-testing',
        title: 'The Venn of Angular Component Testing',
        createdDate: '2023-10-29',
        updatedDate: '2023-10-30',
        image: 'angular-venn-testing.png',
        about: 'In my experience there is confusion between what I would consider a Unit Test and an Integration Test for an Angular Component. Drawing on my OO development experience and having practised Test-driven development for a number of years in Angular & Java (plus other languages & frameworks), I think I can help reduce the \'grey\' in the landscape.',
        tags: [
          'angular',
          'testing'
        ]
      }];
  }
}
