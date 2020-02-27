import { TestBed, inject } from '@angular/core/testing';

import { ScriptStoreService } from './script-store.service';

describe('ScriptStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScriptStoreService]
    });
  });

  it('should be created', inject([ScriptStoreService], (service: ScriptStoreService) => {
    expect(service).toBeTruthy();
  }));
});
