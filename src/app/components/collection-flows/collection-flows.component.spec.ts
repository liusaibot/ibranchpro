import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionFlowsComponent } from './collection-flows.component';

describe('CollectionFlowsComponent', () => {
  let component: CollectionFlowsComponent;
  let fixture: ComponentFixture<CollectionFlowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionFlowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionFlowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
