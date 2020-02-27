import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsFormInputComponent } from './collections-form-input.component';

describe('CollectionsFormInputComponent', () => {
  let component: CollectionsFormInputComponent;
  let fixture: ComponentFixture<CollectionsFormInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionsFormInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
