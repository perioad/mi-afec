import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('src/app/home/pages/home-page/home-page.component').then(
        (c) => c.HomePageComponent
      ),
  },
  {
    path: 'add-video',
    loadComponent: () =>
      import(
        'src/app/video/pages/add-video-page/add-video-page.component'
      ).then((c) => c.AddVideoPageComponent),
  },
  {
    path: 'edit-video/:id',
    loadComponent: () =>
      import(
        'src/app/video/pages/edit-video-page/edit-video-page.component'
      ).then((c) => c.EditVideoPageComponent),
  },
  {
    path: 'faq',
    loadComponent: () =>
      import('src/app/faq/pages/faq-page/faq-page.component').then(
        (c) => c.FaqPageComponent
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
