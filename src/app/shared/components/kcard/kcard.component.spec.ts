import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KcardComponent } from './kcard.component';

describe('KcardComponent', () => {
  let component: KcardComponent;
  let fixture: ComponentFixture<KcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
