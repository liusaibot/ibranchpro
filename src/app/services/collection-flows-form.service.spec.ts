import { TestBed, inject } from '@angular/core/testing';

import { CollectionFlowsFormService } from './collection-flows-form.service';

describe('CollectionFlowsFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollectionFlowsFormService]
    });
  });

  it('should be created', inject([CollectionFlowsFormService], (service: CollectionFlowsFormService) => {
    expect(service).toBeTruthy();
  }));
});
