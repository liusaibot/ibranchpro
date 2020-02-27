import { TestBed, inject } from '@angular/core/testing';

import { CollectionFormService } from './collection-form.service';

describe('CollectionFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollectionFormService]
    });
  });

  it('should be created', inject([CollectionFormService], (service: CollectionFormService) => {
    expect(service).toBeTruthy();
  }));
});
