import { TestBed } from '@angular/core/testing';

import { SkillCategoriesService } from './skill-categories.service';

describe('SkillCategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SkillCategoriesService = TestBed.get(SkillCategoriesService);
    expect(service).toBeTruthy();
  });
});
