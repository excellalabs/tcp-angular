import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { DialogService } from 'src/app/messaging/services/dialog/dialog.service';
import { MockDialogService } from 'src/app/messaging/services/dialog/dialog.service.fake';

import { MaterialModule } from '../../material.module'
import { MessagingModule } from '../../messaging/messaging.module'
import { SnackBarService } from '../../messaging/services/snack-bar/snack-bar.service'
import { MockSnackBarService } from '../../messaging/services/snack-bar/snack-bar.service.fake'
import { ICategory } from '../../models/skill.interface'
import { PipeModule } from '../../pipes/pipe.module'
import { SkillCategoriesService } from '../../services/skill-categories/skill-categories.service'
import { MockSkillCategoriesService } from '../../services/skill-categories/skill-categories.service.fake'
import { SkillsService } from '../../services/skills/skills.service'
import { MockSkillsService } from '../../services/skills/skills.service.fake'
import { CategoryFormComponent } from './category-form/category-form.component'
import { CategoryListComponent } from './category-list/category-list.component'
import { ManageCategoriesComponent } from './manage-categories.component'

describe('ManageCategoriesComponent', () => {
  let component: ManageCategoriesComponent
  let fixture: ComponentFixture<ManageCategoriesComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ManageCategoriesComponent,
        CategoryFormComponent,
        CategoryListComponent,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialModule,
        NoopAnimationsModule,
        PipeModule,
        MessagingModule,
      ],
      providers: [
        { provide: SkillCategoriesService, useClass: MockSkillCategoriesService },
        { provide: SkillsService, useClass: MockSkillsService },
        { provide: SnackBarService, useClass: MockSnackBarService },
        { provide: DialogService, useClass: MockDialogService }
      ],
    }).compileComponents()
  }))

  beforeEach(async () => {
    fixture = TestBed.createComponent(ManageCategoriesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('Child Event Bindings', () => {
    it('should register edit events from CategoryListComponent', () => {
      spyOn(component, 'onEditCategory').and.callThrough()
      const button = fixture.debugElement.nativeElement.querySelector(
        'button#edit-category-1'
      )
      button.click()
      expect(component.onEditCategory).toHaveBeenCalledWith(1)
    })
    it('should register delete events from CategoryListComponent', () => {
      spyOn(component, 'onDeleteCategory').and.callThrough()
      const button = fixture.debugElement.nativeElement.querySelector(
        'button#delete-category-1'
      )
      button.click()
      expect(component.onDeleteCategory).toHaveBeenCalledWith(1)
    })
    xit('should register add/update events from CategoryFormComponent', async () => {
      // Arrange
      spyOn(component, 'onSubmitCategory').and.callThrough()
      const input = fixture.debugElement.nativeElement.querySelector(
        'input#category-name'
      )
      input.value = 'Name'
      input.dispatchEvent(new Event('keyup'))
      fixture.detectChanges()
      await fixture.whenStable()
      // Act
      const button = fixture.debugElement.nativeElement.querySelector(
        'button#submit-category'
      )
      button.click()
      fixture.detectChanges()
      await fixture.whenStable()
      // Assert
      expect(component.onSubmitCategory).toHaveBeenCalledWith({
        name: 'Name',
        id: undefined,
      } as ICategory)
    })
  })
})
