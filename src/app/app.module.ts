import { BrowserModule, enableDebugTools } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SurveyAngularComponent } from './components/surveyjs/survey-angular/survey-angular.component';
import { SurveyCreatorComponent } from './components/surveyjs/survey-creator/survey-creator.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';


import { DocumentationComponent } from './components/documentation/documentation.component';
import { FooterComponent } from './components/footer/footer.component';
import { CategoryCardComponent } from './components/home/category-card/category-card.component';
import { QuestionComponent } from './components/documentation/question/question.component';
import { SubCategoryComponent } from './components/documentation/sub-category/sub-category.component';
import { ContactComponent } from './components/contact/contact.component';
import { FormDocContributionComponent } from './components/forms/contact/form-doc-contribution/form-doc-contribution.component';
import { FormContactComponent } from './components/forms/contact/form-contact/form-contact.component';
import { FeatureCardComponent } from './components/home/feature-card/feature-card.component';
import { ContributeComponent } from './components/contribute/contribute.component';
import { FormNewsComponent } from './components/forms/contribute/news/form-news/form-news.component';
import { FormNewsSuggestComponent } from './components/forms/contribute/news/form-news/form-news-suggest/form-news-suggest.component';
import { FormNewsContentComponent } from './components/forms/contribute/news/form-news/form-news-content/form-news-content.component';
import { FormCommunitySuggestComponent } from './components/forms/contribute/community/form-community-suggest/form-community-suggest.component';
import { FormSurveysComponent } from './components/forms/contribute/surveys/form-surveys/form-surveys.component';
import { FormSurveysSuggestComponent } from './components/forms/contribute/surveys/form-surveys/form-surveys-suggest/form-surveys-suggest.component';
import { FormSurveysContentComponent } from './components/forms/contribute/surveys/form-surveys/form-surveys-content/form-surveys-content.component';
import { FormQuizComponent } from './components/forms/contribute/quiz/form-quiz/form-quiz.component';
import { FormQuizSuggestComponent } from './components/forms/contribute/quiz/form-quiz/form-quiz-suggest/form-quiz-suggest.component';
import { FormQuizContentComponent } from './components/forms/contribute/quiz/form-quiz/form-quiz-content/form-quiz-content.component';
import { FormFutilitiesSuggestComponent } from './components/forms/contribute/futilities/form-futilities-suggest/form-futilities-suggest.component';
import { FormDocsComponent } from './components/forms/contribute/docs/form-docs/form-docs.component';
import { FormDocsContentComponent } from './components/forms/contribute/docs/form-docs/form-docs-content/form-docs-content.component';
import { FormDocsSuggestComponent } from './components/forms/contribute/docs/form-docs/form-docs-suggest/form-docs-suggest.component';
import { SurveyComponent } from './components/survey/survey/survey.component';
import { SurveyListComponent } from './components/survey/survey-list/survey-list.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { FormLoginComponent } from './components/forms/authentication/form-login/form-login.component';
import { FormRegisterComponent } from './components/forms/authentication/form-register/form-register.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CategoryComponent } from './components/documentation/category/category.component';
import { QuizListComponent } from './components/quiz/quiz-list/quiz-list.component';
import { QuizComponent } from './components/quiz/quiz/quiz.component';
import { StudyComponent } from './components/study/study.component';

import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { AuthGuard } from './guards/auth-guard/auth.guard';
import { EmailVerifiedGuard } from './guards/email-verified-guard/email-verified.guard';
import { EmailVerificationComponent } from './components/authentication/email-verification/email-verification.component';
import { UserComponent } from './components/user/user.component';
import { UserCardComponent } from './components/user/user-card/user-card.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { FormUserProfileComponent } from './components/forms/user/form-user-profile/form-user-profile.component';
import { FormUserSettingsComponent } from './components/forms/user/form-user-settings/form-user-settings.component';
import { FutilitiesComponent } from './components/futilities/futilities.component';
import { NewsComponent } from './components/news/news.component';
import { CommunityComponent } from './components/community/community.component';
import { AboutComponent } from './components/about/about.component';
import { FutilitiesQuotesComponent } from './components/futilities/futilities-quotes/futilities-quotes.component';
import { FutilitiesMemesComponent } from './components/futilities/futilities-memes/futilities-memes.component';
import { StudyScheduleComponent } from './components/study/study-schedule/study-schedule.component';
import { StudyAgendaComponent } from './components/study/study-agenda/study-agenda.component';
import { StudyPhotosComponent } from './components/study/study-photos/study-photos.component';
import { StudyUvComponent } from './components/study/study-uv/study-uv.component';
import { StudyMapsComponent } from './components/study/study-maps/study-maps.component';
import { StudyAssociationsComponent } from './components/study/study-associations/study-associations.component';
import { StudyJobsComponent } from './components/study/study-jobs/study-jobs.component';
import { StudyStorageComponent } from './components/study/study-storage/study-storage.component';
import { StudyRessourcesComponent } from './components/study/study-ressources/study-ressources.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { FormResetPasswordComponent } from './components/forms/authentication/form-reset-password/form-reset-password.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ResetPasswordComponent } from './components/authentication/reset-password/reset-password.component';
import { RecoverEmailComponent } from './components/authentication/recover-email/recover-email.component';
import { FormUpdatePasswordComponent } from './components/forms/user/form-user-settings/form-update-password/form-update-password.component';
import { DialogDisableUserComponent } from './components/dialog/user/dialog-disable-user/dialog-disable-user.component';

import { NgxImageCompressService } from 'ngx-image-compress';
import { DocQuestionCardComponent } from './components/documentation/question/doc-question-card/doc-question-card.component';
import { LegalTermsComponent } from './components/legal/legal-terms/legal-terms.component';
import { FormStudySuggestComponent } from './components/forms/contribute/study/form-study-suggest/form-study-suggest.component';
import { WipComponent } from './components/wip/wip.component';
import { StudyDwellingsComponent } from './components/study/study-dwellings/study-dwellings.component';
import { StudyHomeworkComponent } from './components/study/study-homework/study-homework.component';
import { StudyHarmonyComponent } from './components/study/study-harmony/study-harmony.component';

const adminOnly = () => hasCustomClaim('admin');
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToIndex = () => redirectLoggedInTo(['/']);
const belongsToAccount = (next) => hasCustomClaim(`account-${next.params.id}`);


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToIndex } },
  { path: 'login/forgot-password', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToIndex } },
  { path: 'register', component: RegisterComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToIndex } },
  { path: 'auth', component: AuthenticationComponent },
  { path: 'auth/email-verification', component: EmailVerificationComponent },
  { path: 'auth/reset-password', component: ResetPasswordComponent },
  { path: 'auth/recover-email', component: RecoverEmailComponent },
  { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'users/:pid', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'users/:pid/:tab', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'contribute', redirectTo: 'contribute/presentation/', canActivate: [EmailVerifiedGuard] },
  { path: 'contribute/:slug', component: ContributeComponent, canActivate: [EmailVerifiedGuard] },
  { path: 'contribute/:slug/:form_category', component: ContributeComponent, canActivate: [EmailVerifiedGuard] },
  { path: 'contact', redirectTo: 'contact/us' },
  { path: 'contact/:slug', component: ContactComponent },
  { path: 'docs', component: DocumentationComponent },
  { path: 'docs/:category', component: CategoryComponent },
  { path: 'docs/:category/:subcategory', component: SubCategoryComponent },
  { path: 'docs/:category/:subcategory/:question', component: QuestionComponent },
  { path: 'surveys', component: SurveyListComponent },
  { path: 'surveys/:slug', component: SurveyComponent },
  { path: 'quiz', component: QuizListComponent },
  { path: 'quiz/:slug', component: QuizComponent },
  { path: 'study', component: StudyComponent, canActivate: [EmailVerifiedGuard] },
  { path: 'study/schedule', component: StudyScheduleComponent, canActivate: [EmailVerifiedGuard] },
  { path: 'study/agenda', component: StudyAgendaComponent, canActivate: [EmailVerifiedGuard] },
  { path: 'study/photos', component: StudyPhotosComponent, canActivate: [EmailVerifiedGuard] },
  { path: 'study/uvs', component: StudyUvComponent, canActivate: [EmailVerifiedGuard] },
  { path: 'study/maps', component: StudyMapsComponent, canActivate: [EmailVerifiedGuard] },
  { path: 'study/jobs', component: StudyJobsComponent, canActivate: [EmailVerifiedGuard] },
  { path: 'study/assos', component: StudyAssociationsComponent, canActivate: [EmailVerifiedGuard] },
  { path: 'study/ressources', component: StudyRessourcesComponent, canActivate: [EmailVerifiedGuard] },
  { path: 'study/storage', component: StudyStorageComponent, canActivate: [EmailVerifiedGuard] },
  { path: 'study/dwellings', component: StudyDwellingsComponent, canActivate: [EmailVerifiedGuard] },
  { path: 'study/homework', component: StudyHomeworkComponent, canActivate: [EmailVerifiedGuard] },
  { path: 'study/harmony', component: StudyHarmonyComponent, canActivate: [EmailVerifiedGuard] },
  { path: 'futilities', component: FutilitiesComponent },
  { path: 'futilities/quotes', component: FutilitiesQuotesComponent },
  { path: 'futilities/memes', component: FutilitiesMemesComponent },
  { path: 'news', component: NewsComponent },
  { path: 'community', component: CommunityComponent },
  { path: 'about', component: AboutComponent },
  { path: 'legal-terms', component: LegalTermsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SurveyAngularComponent,
    SurveyCreatorComponent,
    HomeComponent,
    NavbarComponent,
    DocumentationComponent,
    FooterComponent,
    CategoryCardComponent,
    QuestionComponent,
    SubCategoryComponent,
    ContactComponent,
    FormDocContributionComponent,
    FormContactComponent,
    FeatureCardComponent,
    ContributeComponent,
    FormNewsComponent,
    FormNewsSuggestComponent,
    FormNewsContentComponent,
    FormCommunitySuggestComponent,
    FormSurveysComponent,
    FormSurveysSuggestComponent,
    FormSurveysContentComponent,
    FormQuizComponent,
    FormQuizSuggestComponent,
    FormQuizContentComponent,
    FormFutilitiesSuggestComponent,
    FormDocsComponent,
    FormDocsContentComponent,
    FormDocsSuggestComponent,
    SurveyComponent,
    SurveyListComponent,
    LoginComponent,
    RegisterComponent,
    FormLoginComponent,
    FormRegisterComponent,
    CategoryComponent,
    QuizListComponent,
    QuizComponent,
    StudyComponent,
    EmailVerificationComponent,
    UserComponent,
    UserCardComponent,
    UserProfileComponent,
    FormUserProfileComponent,
    FormUserSettingsComponent,
    FutilitiesComponent,
    NewsComponent,
    CommunityComponent,
    AboutComponent,
    FutilitiesQuotesComponent,
    FutilitiesMemesComponent,
    StudyScheduleComponent,
    StudyAgendaComponent,
    StudyPhotosComponent,
    StudyUvComponent,
    StudyMapsComponent,
    StudyAssociationsComponent,
    StudyJobsComponent,
    StudyStorageComponent,
    StudyRessourcesComponent,
    FormResetPasswordComponent,
    AuthenticationComponent,
    ResetPasswordComponent,
    RecoverEmailComponent,
    FormUpdatePasswordComponent,
    DialogDisableUserComponent,
    DocQuestionCardComponent,
    LegalTermsComponent,
    FormStudySuggestComponent,
    WipComponent,
    StudyDwellingsComponent,
    StudyHomeworkComponent,
    StudyHarmonyComponent
  ],
  exports: [
    StudyAgendaComponent,
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { 
        enableTracing: false, // <-- debugging purposes only
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled'
      } 
    ),
    HttpClientModule,
    MarkdownModule.forRoot({
      loader: HttpClientModule,
      markedOptions: {
        provide: MarkedOptions,
      },
    }),
    HttpClientModule,
    MarkdownModule.forRoot({
      loader: HttpClientModule,
      markedOptions: {
        provide: MarkedOptions,
      },
    }),
    BrowserModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    LMarkdownEditorModule,
    NgbModalModule,
    CommonModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
  ],
  entryComponents: [
    DialogDisableUserComponent
  ],
  providers: [
    AngularFireAuthGuard,
    AuthGuard,
    EmailVerifiedGuard,
    NgxImageCompressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
