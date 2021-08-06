import { CreateUserComponent } from '../create-user.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUserComponent],
      imports: [RouterTestingModule],
    });

    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
  });

  it('should create CreateUserComponent', () => {
    expect(component).toBeTruthy();
  });
});
