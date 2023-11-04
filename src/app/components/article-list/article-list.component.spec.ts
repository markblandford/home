import { ArticleListComponent } from './article-list.component';
import { ArticlesService } from '@services/articles.service';
import { of } from 'rxjs';
import { ArticleSummary } from '../../models/article-summary';

describe('ArticleListComponent', () => {

  beforeEach(() => {

  });

  it('should create', () => {
    const mockArticleService = {} as jest.MockedObject<ArticlesService>;

    expect(new ArticleListComponent(mockArticleService)).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should get the array of article summaries', () => {
      const mockArticleSummaries: Array<ArticleSummary> = [
        {
          id: 'p',
          filename: 'example',
          title: 'An article',
          createdDate: '2023-10-23',
          updatedDate: '2023-10-24',
          about: 'the description',
          image: 'img.png',
          tags: [],
        }
      ];

      const mockArticleService = {
        getArticleSummaries: jest.fn().mockReturnValue(of(mockArticleSummaries)),
      } as jest.MockedObject<ArticlesService>;

      const component = new ArticleListComponent(mockArticleService);

      component.ngOnInit();

      let actual = null;
      component.articleSummaries$.subscribe(_ => actual = _);

      expect(actual).toEqual(mockArticleSummaries);
    });
  });
});
