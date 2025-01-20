import { ArticleSummary } from '../models/article-summary';

export default class ArticleList {
  public getSummaries(): Array<ArticleSummary> {
    return [
      {
        id: 'venn-of-angular-component-testing',
        title: 'The Venn of Angular Component Testing',
        createdDate: '2023-10-29',
        updatedDate: '2023-11-17',
        image: 'angular-venn-testing.png',
        about: 'In my experience there is confusion between what I would consider a Unit Test and an Integration Test for an Angular Component. Drawing on my OO development experience and having practised Test-driven development for a number of years in Angular & Java (plus other languages & frameworks), I think I can help reduce the \'grey\' in the landscape.',
        tags: [
          'angular',
          'testing'
        ]
      },
      {
        id: 'how-i-practice-tdd',
        title: 'How I practice TDD',
        createdDate: '2023-11-18',
        updatedDate: '2023-11-18',
        about: 'I enjoy Test Driven Development. I want more engineers to try it. This is how I do it: Test-driven development (TDD) is a software development process relying on software requirements being converted to test cases before software is fully developed, and tracking all software development by repeatedly testing the software against all test cases. This is as opposed to software being developed first and test cases created later.',
        tags: [
          'angular',
          'Java',
          'testing',
          'TDD'
        ]
      },
      {
        id: 'customers-not-users',
        title: 'I have <insert alternative noun> not Users',
        createdDate: '2024-04-21',
        updatedDate: '2024-04-21',
        about: 'Is it time to stop referring to those who engage with our software or technology as users? I think it\'s actually long over due.',
        tags: [
          'CX',
          'Personas',
          'language'
        ]
      },
      {
        id: 'no-spikes',
        title: 'No Spikes',
        createdDate: '2025-01-20',
        updatedDate: '2025-01-20',
        about: 'Why do some teams and organisations complete Spikes in teams who are meant to demonstrate agility?',
        tags: [
          'Agile',
          'Engineering'
        ]
      }
    ];
  }
}
