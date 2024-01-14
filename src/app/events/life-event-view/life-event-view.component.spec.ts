import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeEventViewComponent } from './life-event-view.component';

describe('LifeEventViewComponent', () => {
  let component: LifeEventViewComponent;
  let fixture: ComponentFixture<LifeEventViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LifeEventViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LifeEventViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
